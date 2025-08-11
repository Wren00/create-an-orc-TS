import {prisma} from "../utils/prisma";
import { z } from "zod";
import {
    Orc, OrcListItem, CreateOrc,
    OrcListItemSchema, OrcSchema, CreateOrcSchema
} from "../schemas/orcSchema";

//GET functions

async function getAllOrcs(): Promise<OrcListItem[]> {
    try {
        const allOrcs = await prisma.orc.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                orcImagesId: true
            }
        });
        const data = allOrcs.map((row): OrcListItem => ({
            id: row.id,
            name: row.name,
            description: row.description,
            orcImagesId: row.orcImagesId,
        }));

        //validate data with type schema
        const parsedOrcList = z.array(OrcListItemSchema).safeParse(data);
        if (!parsedOrcList.success) {
            console.error("Invalid Orc list:", parsedOrcList.error.issues);
            throw new Error("Unable to fetch Orcs");
        }
        return parsedOrcList.data;
    } catch(error) {
        console.error("Failed to fetch orc list:", error);
        throw error;
    }
}

export async function getOrcById(orcId: number): Promise<Orc> {
    try {
        const orc = await prisma.orc.findUnique({
            where: { id: orcId },
        });

        const parsedOrc = OrcSchema.safeParse(orc);
        if (!parsedOrc.success) {
            console.error("Invalid Orc Data:", parsedOrc.error.issues);
            throw new Error("Unable to parse Orc");
        }
        return parsedOrc.data;
    } catch (error) {
        console.error("Failed to fetch orc:", error);
        throw error;
    }
}

//CREATE function

async function saveOrc(orc: CreateOrc) {
    try {
        const newOrc : CreateOrc = await prisma.orc.create({
            data: {
                name: orc.name,
                description: orc.description,
                str: orc.str,
                dex: orc.dex,
                con: orc.con,
                int: orc.int,
                wis: orc.wis,
                cha: orc.cha,
                orcImagesId: orc.orcImagesId,
                promptsCollectionId: orc.promptsCollectionId,
                userId: orc.userId
            }
        });
        const parsedOrc = CreateOrcSchema.safeParse(newOrc);
        if (!parsedOrc.success) {
            console.error("Invalid Orc Data:", parsedOrc.error.issues);
            throw new Error("Unable to parse new Orc");
        }
        return parsedOrc.data;
    } catch (error: any) {
        console.error("Prisma error on creating Orc:", error);
        throw new Error("Failed to create Orc");
    }
}

//DELETE function

async function deleteOrcById(orcId: number) : Promise<string> {
    let deletedOrc;
    try {
        deletedOrc = await prisma.orc.delete({
            where: {
                id: orcId
            },
        });
    } catch (error) {
        console.error("Prisma error on deleting Orc:", error);
        throw new Error("Failed to delete Orc");
    }
    return "Orc has been successfully deleted: " + deletedOrc.name;
}

const OrcService = {
    getAllOrcs,
    getOrcById,
    saveOrc,
    deleteOrcById
};

export { OrcService };
