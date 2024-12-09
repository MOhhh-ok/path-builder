# Path builder

This is a builder for url path with encode.
Type safe.

## Install

```
npm i @masa-dev/path-builder
```

## Usage

```ts
const builder = createBuilder('/{locale}/users/?name={name}');
const path = builder.build({
    locale: 'ja',
    name: '山田太郎',
}); // => '/ja/users/?name=%E5%B1%B1%E7%94%B0%E5%A4%AA%E9%83%8E'
```

## License

MIT