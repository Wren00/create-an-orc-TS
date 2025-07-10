import {Request, Response} from "express";
import {GeneratorService} from "../generators/generatorService";


//pass syllables from the catalogue in the database
const generateOrcName = async (req: Request, res: Response): Promise<void> => {
    try {
        const name = await GeneratorService.generateOrcName();
        res.status(200).json(name);
    } catch (error) {
        console.error("Error creating Orc name: ", error);
        res.status(500).json({ message: "Could not generate Orc name."});
    }
}

const GeneratorController = {
    generateOrcName
};


export { GeneratorController };