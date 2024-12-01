# Path builder

This is a builder for url path. Type safe.

## Install

```
npm i @masa-dev/path-builder
```

## Usage

### createBuilder

```ts
const simple = createBuilder('/{param}');
const simpleResult = simple.build({ param: 'value' }) // => /value;

const encoded = createBuilder('/{locale}/users/{name}');
const encodedResult = builder.build({
    locale: 'ja',
    name: '山田太郎',
}); // => '/ja/users/%E5%B1%B1%E7%94%B0%E5%A4%AA%E9%83%8E'
```


### createBuilders

```ts
import {createBuilders} from '@masa-dev/path-builder';

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
} as const; // Add as const to avoid type inference error

const builders = createBuilders(routes);
const base = builders.$path({ locale: 'ja' }); // => '/ja'
const library = builders.catalogs.item.library.$path({
    catalogId: 'catalogId',
    libraryId: 'libraryId',
    locale: 'ja',
    mode: 'edit',
}); // => '/ja/catalogs/catalogId/library/libraryId/edit'

console.log({ base, library });
```

## License

MIT