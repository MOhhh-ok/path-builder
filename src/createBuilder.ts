// パスからパラメータ名を抽出する型
type ExtractParams<T extends string> =
    T extends `${infer _Start}{${infer Param}}${infer Rest}`
        ? Param | ExtractParams<Rest>
        : never;

// パラメータの型を作成
type Params<T extends string> = {
    [K in ExtractParams<T>]: string;
};

// ビルダークラス
class UrlBuilder<T extends string> {
    constructor(private template: T) {}

    // generateをbuildに変更
    build(params: Params<T>): string {
        return this.template.replace(/{([^}]+)}/g, (_, key: keyof Params<T>) =>
            encodeURIComponent(params[key])
        );
    }
}

// ビルダー作成関数
export function createBuilder<T extends string>(path: T) {
    return new UrlBuilder<T>(path);
}

// // 使用例
// const localed = '/{locale}' as const;
// const builder = createBuilder(`${localed}/aa/{id}/cc?dd={mode}`);
// const path = builder.build({
//     locale: 'ja',
//     id: '123',
//     mode: 'edit@',
// }); // 型安全: パラメータが足りない場合やパラメータ名が間違っている場合はコンパイルエラー

// console.log(path); // => '/ja/aa/123/cc?dd=edit%40'
