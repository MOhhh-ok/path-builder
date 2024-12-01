import { createBuilders } from './createBuilders';

describe('createBuilders', () => {
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

    const builders = createBuilders(routes);

    test('ベースパスが正しく生成される', () => {
        expect(builders.$path({ locale: 'ja' })).toBe('/ja');
        expect(builders.$path({ locale: 'en' })).toBe('/en');
    });

    test('meパスが正しく生成される', () => {
        expect(builders.me.$path({ locale: 'ja' })).toBe('/ja/me');
        expect(builders.me.$path({ locale: 'en' })).toBe('/en/me');
    });

    test('catalogsパスが正しく生成される', () => {
        expect(builders.catalogs.$path({ locale: 'ja' })).toBe('/ja/catalogs');
    });

    test('catalogs.itemパスが正しく生成される', () => {
        expect(
            builders.catalogs.item.$path({
                locale: 'ja',
                catalogId: 'cat123',
            })
        ).toBe('/ja/catalogs/cat123');
    });

    test('catalogs.item.libraryパスが正しく生成される', () => {
        expect(
            builders.catalogs.item.library.$path({
                locale: 'ja',
                catalogId: 'cat123',
                libraryId: 'lib456',
                mode: 'edit',
            })
        ).toBe('/ja/catalogs/cat123/library/lib456/edit');
    });

    test('必要なパラメータが不足している場合にエラーとなる', () => {
        // @ts-expect-error - localeは必須
        expect(() => builders.$path()).toThrow();

        // @ts-expect-error - catalogIdは必須
        expect(() => builders.catalogs.item.$path({ locale: 'ja' })).toThrow();
    });
});
