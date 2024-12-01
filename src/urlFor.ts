export function urlFor(path: string) {
    return (params: Record<string, string>) => {
        let url = path;

        // パラメータの置換
        for (const [key, value] of Object.entries(params)) {
            url = url.replace(`{${key}}`, value);
        }

        return url;
    };
}
