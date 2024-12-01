import { createUrlBuilders } from './createUrlBuilders';

describe('createUrlBuilders', () => {
    it('シンプルなルート定義からURLビルダーを生成できる', () => {
        const routes = {
            path: '/users/{userId}',
            children: {
                profile: {
                    path: '/profile',
                },
            },
        };

        const builders = createUrlBuilders(routes);

        expect(builders.self({ userId: '123' })).toBe('/users/123');
        expect(builders.profile({ userId: '123' })).toBe('/users/123/profile');
    });

    it('ネストされたルート定義を処理できる', () => {
        const routes = {
            path: '/users/{userId}',
            children: {
                posts: {
                    path: '/posts',
                    children: {
                        single: {
                            path: '/{postId}',
                        },
                    },
                },
            },
        };

        const builders = createUrlBuilders(routes);

        expect(builders.self({ userId: '123' })).toBe('/users/123');
        expect(builders.posts({ userId: '123' })).toBe('/users/123/posts');
        expect(builders.posts_single({ userId: '123', postId: '456' })).toBe(
            '/users/123/posts/456'
        );
    });

    it('パラメータのない静的なパスを処理できる', () => {
        const routes = {
            path: '/about',
            children: {
                team: {
                    path: '/team',
                },
            },
        };

        const builders = createUrlBuilders(routes);

        expect(builders.self({})).toBe('/about');
        expect(builders.team({})).toBe('/about/team');
    });

    it('複数のパラメータを持つパスを処理できる', () => {
        const routes = {
            path: '/org/{orgId}/users/{userId}',
            children: {
                settings: {
                    path: '/settings',
                },
            },
        };

        const builders = createUrlBuilders(routes);

        expect(builders.self({ orgId: 'org1', userId: 'user1' })).toBe(
            '/org/org1/users/user1'
        );
        expect(builders.settings({ orgId: 'org1', userId: 'user1' })).toBe(
            '/org/org1/users/user1/settings'
        );
    });

    // it('URLSearchParamsを含むURLを生成できる', () => {
    //     const routes = {
    //         path: '/search',
    //         children: {
    //             results: {
    //                 path: '/results',
    //             },
    //         },
    //     };

    //     const builders = createUrlBuilders(routes);

    //     expect(
    //         builders.self({
    //             $query: {
    //                 q: 'テスト',
    //                 page: '1',
    //                 sort: 'desc',
    //             },
    //         })
    //     ).toBe('/search?q=%E3%83%86%E3%82%B9%E3%83%88&page=1&sort=desc');

    //     expect(
    //         builders.results({
    //             $query: {
    //                 category: 'books',
    //                 tag: ['fiction', 'mystery'],
    //             },
    //         })
    //     ).toBe('/search/results?category=books&tag=fiction&tag=mystery');
    // });

    // it('パスパラメータとクエリパラメータを組み合わせて処理できる', () => {
    //     const routes = {
    //         path: '/users/{userId}/posts',
    //         children: {
    //             search: {
    //                 path: '/search',
    //             },
    //         },
    //     };

    //     const builders = createUrlBuilders(routes);

    //     expect(
    //         builders.self({
    //             userId: '123',
    //             $query: {
    //                 from: '2024-01-01',
    //                 to: '2024-03-31',
    //             },
    //         })
    //     ).toBe('/users/123/posts?from=2024-01-01&to=2024-03-31');

    //     expect(
    //         builders.search({
    //             userId: '123',
    //             $query: {
    //                 keyword: 'テスト投稿',
    //                 status: ['draft', 'published'],
    //             },
    //         })
    //     ).toBe(
    //         '/users/123/posts/search?keyword=%E3%83%86%E3%82%B9%E3%83%88%E6%8A%95%E7%A8%BF&status=draft&status=published'
    //     );
    // });
});
