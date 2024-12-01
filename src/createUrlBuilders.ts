import { urlFor } from './urlFor';
// パラメータの型を抽出するユーティリティ型を修正
type ExtractParams<T extends string> =
    T extends `${infer Start}{${infer Param}}${infer Rest}`
        ? { [K in Param]: string } & ExtractParams<Rest>
        : {};

// クエリパラメータを解析する新しい型を追加
type ExtractQueryParams<T extends string> =
    T extends `${infer Param}={${infer Value}}&${infer Rest}`
        ? { [K in Value]: string } & ExtractQueryParams<Rest>
        : T extends `${infer Param}={${infer Value}}`
        ? { [K in Value]: string }
        : {};

// ルート定義の型を改善
interface RouteDefinition<Path extends string = string> {
    path: Path;
    children?: { [key: string]: RouteDefinition<string> };
}

// URLビルダーの戻り値の型
type UrlBuilder<T extends string> = (params: ExtractParams<T>) => string;

// URLビルダーマップの型
type UrlBuilderMap<T extends RouteDefinition> = {
    self: UrlBuilder<T['path']>;
} & (T['children'] extends infer C
    ? C extends { [K in keyof C]: RouteDefinition }
        ? {
              [K in keyof C]: UrlBuilder<`${T['path']}${C[K]['path']}`>;
          } & {
              [K in keyof C as `${K & string}${KeysWithPrefix<
                  C[K]['children']
              >}`]: UrlBuilder<`${T['path']}${C[K]['path']}${ChildPaths<
                  C[K]['children']
              >}`>;
          }
        : {}
    : {});

// 子ルートのパスを生成するヘルパー型を修正
type ChildPaths<T, Depth extends number[] = []> = Depth['length'] extends 5
    ? ''
    : T extends { [key: string]: RouteDefinition }
    ? `${T[keyof T]['path']}${ChildPaths<
          T[keyof T]['children'],
          [...Depth, 1]
      >}`
    : '';

// KeysWithPrefixも同様に制限
type KeysWithPrefix<T, Depth extends number[] = []> = Depth['length'] extends 5
    ? never
    : T extends { [key: string]: RouteDefinition }
    ? `_${keyof T & string}` | KeysWithChildren<T, [...Depth, 1]>
    : never;

// KeysWithChildrenも制限
type KeysWithChildren<
    T,
    Depth extends number[] = []
> = Depth['length'] extends 5
    ? never
    : T extends { [K in keyof T]: infer R }
    ? R extends RouteDefinition
        ? R['children'] extends { [key: string]: RouteDefinition }
            ? `_${keyof T & string}${KeysWithPrefix<
                  R['children'],
                  [...Depth, 1]
              >}`
            : never
        : never
    : never;

// URLビルダーを生成する関数
export function createUrlBuilders<T extends RouteDefinition>(
    definition: T,
    parentPath: string = ''
): UrlBuilderMap<T> {
    const builders: { [key: string]: ReturnType<typeof urlFor> } = {};
    const fullPath = parentPath + definition.path;

    // 現在のパスのビルダーを作成
    builders.self = urlFor(fullPath);

    // 子ルートのビルダーを再帰的に生成
    if (definition.children) {
        for (const [key, child] of Object.entries(definition.children)) {
            const childBuilders = createUrlBuilders(child, fullPath);
            builders[key] = childBuilders.self;

            // ネストされた子ルートも統合
            Object.entries(childBuilders)
                .filter(([k]) => k !== 'self')
                .forEach(([k, v]) => {
                    builders[`${key}_${k}`] = v;
                });
        }
    }

    return builders as unknown as UrlBuilderMap<T>;
}
