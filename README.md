# Path builder

This is a builder for path. Type safe.

## Install

```
npm i @masa-dev/path-builder
```

## Usage

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