import {NextFunction, Request, Response} from "express";
import { OrcService } from "../services/orcService";
import { CreateOrc } from "../interfaces/orc";


//this function needs authentication for client use
const getAllOrcs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const orcs = await OrcService.getAllOrcsAdmin();
        res.status(200).json(orcs);
    } catch (error) {
        next(error); // or handle directly
    }
};

const getOrcById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { orcId } = req.body;
        const orc = await OrcService.getOrcById(orcId)
        res.status(200).json(orc);
    } catch (error) {
        res.status(401).json("Cannot find orc id");
    }
}

const getOrcsByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = BigInt(req.params["user_id"]);
        const orcs = await OrcService.getOrcsByUserId(userId);
        res.status(200).json(orcs);
    } catch (error) {
        res.status(401).json("Cannot find user id");
    }
}

//CREATE functions

const saveOrc = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newOrc: CreateOrc = req.body;
        const createdOrc = await OrcService.saveOrc(newOrc)
        res.status(200).json(createdOrc);
    } catch (error) {
        res.status(500).json("Could not save orc.");
    }
}

//DELETE functions

const deleteOrcById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { orcId: orcId } = req.body;

    const deletedOrc = await OrcService.deleteOrcById(orcId)
    if (!deletedOrc)  {
        res.status(500).json("Cannot delete id");
    }
    res.status(200).json(deletedOrc);
}

const OrcController = {
    getAllOrcs,
    getOrcById,
    getOrcsByUserId,
    saveOrc,
    deleteOrcById
};

export { OrcController };