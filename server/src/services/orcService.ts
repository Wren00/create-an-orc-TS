import {prisma} from "../utils/prisma";
import {CreateOrc} from "../interfaces/orc";

//GET functions

// PRIVATE admin function that retrieves library of created orcs

async function getAllOrcsAdmin(): Promise<{ orcId: number, name: string, orcImagesId: number }[]> {
    try {

        const allOrcs = await prisma.orc.findMany({
            select: {
                id: true,
                name: true,
                orcImagesId: true
            }
        });
        return  allOrcs.map((orc: { id: any; name: any; orcImagesId: any; }): { orcId: number; name: string, orcImagesId: number } => ({
            orcId: orc.id,
            name: orc.name,
            orcImagesId: orc.orcImagesId
        }));
    } catch (error) {
        console.error("Unable to fetch orcs.", error);
        throw error;
    }
}

async function getOrcById(orcId: number) {
    try {
        const orcObject = await prisma.orc.findUnique({
            where: { id: orcId },
        });
        // error check if id could not be found, nothing is returned
        if (!orcObject) {
            throw new Error(`Orc with ID ${orcId} not found`);
        }
        return {
            orcId: orcObject.id,
            name: orcObject.name,
            description: orcObject.description,
            orcImagesId: orcObject.orcImagesId,
            userId: orcObject.userId
        };
    } catch (error) {
        console.error("Failed to fetch orc:", error);
        throw error;
    }
}

//CREATE function

async function saveOrc(orc: CreateOrc) {

    try {
        const newOrc = await prisma.orc.create({
            data: {
                name: orc.name,
                description: orc.description,
                orcImagesId: orc.orcImagesId,
                promptsCollectionId: orc.promptsCollectionId,
                userId: orc.userId
            }
        });
        const createdOrc : CreateOrc = {
            name: newOrc.name,
            description: newOrc.description,
            orcImagesId: newOrc.orcImagesId,
            promptsCollectionId: newOrc.promptsCollectionId,
            userId: newOrc.userId
        };
        return createdOrc;
    } catch(error) {
        throw Error("Cannot create orc");
    }
}

//DELETE function

async function deleteOrcById(orcId: number) {
    let deletedOrc;
    try {
        deletedOrc = await prisma.orc.delete({
            where: {
                id: orcId
            },
        });
    } catch (error) {
        console.log(error);
    }
    return deletedOrc;
}

const OrcService = {
    getAllOrcsAdmin,
    getOrcById,
    saveOrc,
    deleteOrcById
};

export { OrcService };
