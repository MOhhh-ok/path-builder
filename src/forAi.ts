// 使用例：
const routes = {
    path: '/{locale}',
    children: {
        me: { path: '/me' },
        catalogs: {
            path: '/catalogs',
            children: {
                item: {
                    path: '/{catalogId}',
                    children: {
                        library: {
                            path: '/library/{libraryId}/{mode}',
                        },
                    },
                },
            },
        },
    },
} as const;

function createBuilders(routes: any): any {}
const builders = createBuilders(routes);
const base = builders.$path({ locale: 'ja' });
const me = builders.me.$path({ locale: 'ja' });
const library = builders.catalogs.item.library.$path({
    catalogId: 'catalogId',
    libraryId: 'libraryId',
    locale: 'ja',
});
console.log({ base, me, library });
