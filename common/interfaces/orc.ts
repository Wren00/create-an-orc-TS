export interface Orc {
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

export interface CreateOrc {
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

export interface OrcStats {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
}