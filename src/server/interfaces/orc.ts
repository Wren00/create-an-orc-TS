interface Orc {
    orcId: bigint;
    name: string;
    description: string;
    promptsCollectionId: bigint;
    orcImagesId: bigint;
    userId: bigint;
}

interface CreateOrc {
    name: String
    description: String
    promptCollectionId: bigint
    orcImagesId: bigint
    userId: bigint
}
export { Orc, CreateOrc };