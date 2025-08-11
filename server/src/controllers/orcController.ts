import { RequestHandler } from "express";
import { OrcService } from "../services/orcService";
import { Orc, OrcListItem, CreateOrc } from "../schemas/orcSchema";


//this function needs authentication for client use

export const getAllOrcs: RequestHandler<
    {},
    OrcListItem[] | { message: string },
    undefined,
    undefined
> = async (req, res) => {
    try {
        const orcs = await OrcService.getAllOrcs();
        res.status(200).json(orcs);
    } catch (error) {
        console.error("Error fetching orc list:", error);
        res.status(500).json({ message: "Could not retrieve orc list." });
    }
};

const getOrcById: RequestHandler<
    {id: number},
    Orc | { message: string },
    undefined,
    undefined
> = async (req, res) => {
    try {
        const orcId  = Number(req.params["id"]);
        const orc = await OrcService.getOrcById(orcId)
        res.status(200).json(orc);
    } catch (error) {
        console.error("Error fetching orc by id: ", error);
        res.status(500).json({ message: "Could not retrieve orc by id."});
    }
}

//CREATE functions
export const saveOrc: RequestHandler<
    {},
    CreateOrc | { message: string },
    CreateOrc,
    undefined
> = async (req, res) => {
    try {
        const newOrc: CreateOrc = req.body;
        const createdOrc = await OrcService.saveOrc(newOrc)
        res.status(201).json(createdOrc);
    } catch (error) {
        console.error("Error creating orc: ", error);
        res.status(500).json({message: "Could not create orc."});
    }
}

//DELETE functions

export const deleteOrcById : RequestHandler<
    { id: number },
    { message: string },
    undefined,
    {}
> = async (req, res) => {
    try {
        const orcId = Number(req.params["id"]);
        const deletedOrcResult = await OrcService.deleteOrcById(orcId)
        res.status(200).json({message: deletedOrcResult});
    } catch (error) {
        console.error("Error deleting orc: ", error);
        res.status(500).json({message: "Could not delete orc."});
    }
}

const OrcController = {
    getAllOrcs,
    getOrcById,
    saveOrc,
    deleteOrcById
};

export { OrcController };