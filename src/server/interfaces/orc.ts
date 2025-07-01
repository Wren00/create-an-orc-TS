interface Orc {
    organismId: number;
    taxonName: string;
    latinName: string;
    taxonGroupId: number;
    pictureUrl: string;
    description: string;
    isProtected: boolean;
}

interface CreateOrc {
    name: String
    description: String
    promptCollectionId: number
    orcImagesId: number
    userId: number
}
export { Orc, CreateOrc };