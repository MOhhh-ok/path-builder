// export type ExtractPathParams<T extends string> =
//     T extends `${infer Start}/:${infer Param}/${infer Rest}`
//         ? Param | ExtractPathParams<`/${Rest}`>
//         : T extends `${infer Start}/:${infer Param}`
//         ? Param
//         : never;

// export type PathParams<Path extends string> = {
//     [K in ExtractPathParams<Path>]: string;
// };
