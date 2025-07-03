interface Orc {
    orcId: bigint;
    name: string;
    description: string;
    promptsCollectionId: bigint;
    orcImagesId: bigint;
    userId: bigint;
}

interface CreateOrc {
    name: string
    description: string
    promptCollectionId: bigint
    orcImagesId: bigint
    userId: bigint
}
export { Orc, CreateOrc };