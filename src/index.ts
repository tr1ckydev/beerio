import BeerioAPI from "./beerio";

export function load(content: string) {
    return new BeerioAPI(content);
}

export async function fromFile(path: string) {
    const contents = await Bun.file(path).text();
    return load(contents);
}

export async function fromURL(url: string) {
    const response = await (await fetch(url)).text();
    return load(response);
}