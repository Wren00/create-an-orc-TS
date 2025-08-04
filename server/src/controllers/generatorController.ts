import {Request, Response} from "express";
import {GeneratorService} from "../services/generatorService";

const generateOrcData = async (req: Request, res: Response): Promise<void> => {
    try {
        const orc = await GeneratorService.generateOrcData();
        console.log(orc);
        res.status(201).json(orc);
    } catch (error) {
        console.error("Error creating Orc: ", error);
        res.status(400).json({ message: "Could not generate Orc."});
    }
}

const GeneratorController = {
    generateOrcData
};


export { GeneratorController };