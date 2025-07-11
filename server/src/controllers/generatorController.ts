import {Request, Response} from "express";
import {GeneratorService} from "../generators/generatorService";


//return generated data for an Orc
const generateOrc = async (req: Request, res: Response): Promise<void> => {
    try {
        const orc = await GeneratorService.generateOrcName();
        res.status(200).json(orc);
    } catch (error) {
        console.error("Error creating Orc: ", error);
        res.status(500).json({ message: "Could not generate Orc."});
    }
}

const GeneratorController = {
    generateOrc
};


export { GeneratorController };