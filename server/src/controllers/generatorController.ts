import {Request, Response} from "express";
import {GeneratorService} from "../generators/generatorService";


//return generated name for an Orc
const generateName = async (req: Request, res: Response): Promise<void> => {
    try {
        const orc = await GeneratorService.generateOrcName();
        res.status(200).json(orc);
    } catch (error) {
        console.error("Error creating Orc: ", error);
        res.status(500).json({ message: "Could not generate Orc."});
    }
}

const generateDescription = async (req: Request, res: Response): Promise<void> => {
    try {
        const description = await GeneratorService.generateOrcDescription();
        res.status(200).json(description);
    } catch (error) {
        console.error("Error creating Orc: ", error);
        res.status(500).json({ message: "Could not generate Orc."});
    }
}

const GeneratorController = {
    generateName,
    generateDescription
};


export { GeneratorController };