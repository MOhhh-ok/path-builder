// type ExtractPathParams<T extends string> = string extends T
//     ? never
//     : T extends `${infer Start}/{${infer Param}}${infer Rest}`
//     ? Param | ExtractPathParams<Rest>
//     : T extends `${infer Start}{${infer Param}}${infer Rest}`
//     ? Param | ExtractPathParams<Rest>
//     : never;

// type RouteDefinition = {
//     path: string;
//     children?: { [K: string]: RouteDefinition };
// };

// type ParentParams<T extends RouteDefinition, P extends string = ''> =
//     | ExtractPathParams<P>
//     | ExtractPathParams<T['path']>;

// type PathBuilder<T extends string, P extends string = ''> = ParentParams<
//     RouteDefinition,
//     P | T
// > extends never
//     ? () => string
//     : (params: Record<ParentParams<RouteDefinition, P | T>, string>) => string;

// type BuildersType<T extends RouteDefinition, P extends string = ''> = {
//     $path: PathBuilder<T['path'], P>;
// } & (T['children'] extends infer C
//     ? { [K in keyof C]: BuildersType<C[K] & RouteDefinition, P | T['path']> }
//     : {});

// export function createBuilders<T extends RouteDefinition>(
//     routes: T
// ): BuildersType<T> {
//     function createBuilder(
//         route: RouteDefinition,
//         parentPath: string = ''
//     ): Record<string, any> {
//         const fullPath = parentPath + route.path;

//         const result: Record<string, any> = {
//             $path: ((params: Record<string, string> = {}) => {
//                 let path = fullPath;
//                 const requiredParams = Array.from(
//                     path.matchAll(/\{(\w+)\}/g)
//                 ).map((match) => match[1]);

//                 for (const param of requiredParams) {
//                     if (!(param in params)) {
//                         throw new Error(`Missing required parameter: ${param}`);
//                     }
//                 }

//                 Object.entries(params).forEach(([key, value]) => {
//                     path = path.replace(`{${key}}`, value);
//                 });
//                 return path;
//             }) as PathBuilder<typeof fullPath>,
//         };

//         if (route.children) {
//             Object.entries(route.children).forEach(([key, childRoute]) => {
//                 result[key] = createBuilder(childRoute, fullPath);
//             });
//         }

//         return result;
//     }

//     return createBuilder(routes) as BuildersType<T>;
// }
