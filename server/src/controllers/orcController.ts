import {Request, Response} from "express";
import { OrcService } from "../services/orcService";
import { CreateOrc } from "../../../common/interfaces/orc";


//this function needs authentication for client use
const getAllOrcs = async (req: Request, res: Response): Promise<void> => {
    try {
        const orcs = await OrcService.getAllOrcsAdmin();
        res.status(200).json(orcs);
    } catch (error) {
        console.error("Error fetching orc list: ", error);
        res.status(500).json({ message: "Could not retrieve orc list."});
    }
};

const getOrcById = async (req: Request, res: Response): Promise<void> => {
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

const saveOrc = async (req: Request, res: Response): Promise<void> => {
    try {
        const newOrc: CreateOrc = req.body;
        const createdOrc = await OrcService.saveOrc(newOrc)
        res.status(200).json(createdOrc);
    } catch (error) {
        console.error("Error creating orc: ", error);
        res.status(500).json("Could not create orc.");
    }
}

//DELETE functions

const deleteOrcById = async (req: Request, res: Response): Promise<void> => {
    try {
        const orcId = Number(req.params["id"]);
        const deletedOrc = await OrcService.deleteOrcById(orcId)
        res.status(200).json(deletedOrc);
    } catch (error) {
        console.error("Error deleting orc: ", error);
        res.status(500).json("Could not delete orc.");
    }
}

const OrcController = {
    getAllOrcs,
    getOrcById,
    saveOrc,
    deleteOrcById
};

export { OrcController };