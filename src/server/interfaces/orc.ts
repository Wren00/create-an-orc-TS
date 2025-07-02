interface Orc {
    orcId: number;
    name: string;
    description: string;
    promptsCollectionId: number;
    orcImagesId: number;
    userId: number;
}

interface CreateOrc {
    name: String
    description: String
    promptCollectionId: number
    orcImagesId: number
    userId: number
}
export { Orc, CreateOrc };