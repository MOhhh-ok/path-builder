// function createBuilders(routes: any): any {}

// const routes = {
//     path: '/{locale}',
//     children: {
//         me: { path: '/me' },
//         catalogs: {
//             path: '/catalogs',
//             children: {
//                 item: {
//                     path: '/{catalogId}',
//                     children: {
//                         library: {
//                             path: '/library/{libraryId}/{mode}',
//                         },
//                     },
//                 },
//             },
//         },
//     },
// } as const; // Add as const to avoid type inference error

// const builders = createBuilders(routes);
// const base = builders.$path({ locale: 'ja' }); // => '/ja'
// const library = builders.catalogs.item.library.$path({
//     catalogId: 'catalogId',
//     libraryId: 'libraryId',
//     locale: 'ja',
//     mode: 'edit',
// }); // => '/ja/catalogs/catalogId/library/libraryId/edit'

// console.log({ base, library });
