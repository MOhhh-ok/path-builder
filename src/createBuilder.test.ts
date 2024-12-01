import { createBuilder } from './createBuilder';

describe('createBuilder', () => {
    test('単純なパスパラメータの置換', () => {
        const builder = createBuilder('/{param}');
        const result = builder.build({ param: 'value' });
        expect(result).toBe('/value');
    });

    test('複数のパスパラメータの置換', () => {
        const builder = createBuilder('/{first}/{second}');
        const result = builder.build({
            first: 'one',
            second: 'two',
        });
        expect(result).toBe('/one/two');
    });

    test('特殊文字のエンコード', () => {
        const builder = createBuilder('/path/{param}');
        const result = builder.build({ param: 'hello world&?' });
        expect(result).toBe('/path/hello%20world%26%3F');
    });

    test('クエリパラメータを含むURLの生成', () => {
        const builder = createBuilder('/api/{resource}?query={value}');
        const result = builder.build({
            resource: 'users',
            value: 'search term',
        });
        expect(result).toBe('/api/users?query=search%20term');
    });

    test('日本語パラメータの処理', () => {
        const builder = createBuilder('/{locale}/users/{name}');
        const result = builder.build({
            locale: 'ja',
            name: '山田太郎',
        });
        expect(result).toBe('/ja/users/%E5%B1%B1%E7%94%B0%E5%A4%AA%E9%83%8E');
    });

    test('テンプレートに定義されていない余分なパラメータは無視される', () => {
        const params = {
            name: 'John',
            age: 30, // テンプレートには定義されていないパラメータ
            country: 'Japan', // テンプレートには定義されていないパラメータ
        };
        const builder = createBuilder('/users/{name}');
        const result = builder.build(params);
        expect(result).toBe('/users/John');
    });
});
