interface Orc {
    orcId: number;
    name: string;
    description: string;
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
    promptsCollectionId: number;
    orcImagesId: number;
    userId: number;
}

interface CreateOrc {
    name: string;
    description: string;
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
    promptsCollectionId: number;
    orcImagesId: number;
    userId: number;
}

interface OrcStats {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
}

export { Orc, CreateOrc, OrcStats};