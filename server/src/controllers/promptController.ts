import {NextFunction, Request, Response} from "express";
import { PromptService } from "../services/promptService";
import {Prompts} from "../interfaces/prompts";


//this admin function needs authentication for client use
const getAllPrompts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const orcs = await PromptService.getAllPrompts();
        res.status(200).json(orcs);
    } catch (error) {
        next(error); // or handle directly
    }
};

const getPromptById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { promptId } = req.body;
        const prompt = await PromptService.getPromptById(promptId)
        res.status(200).json(prompt);
    } catch (error) {
        res.status(401).json("Cannot find prompt id");
    }
}

const getPromptByAdjective = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { promptAdjective } = req.body;
        const prompt = await PromptService.getPromptByAdjective(promptAdjective)
        res.status(200).json(prompt);
    } catch (error) {
        res.status(401).json("Cannot find searched prompt");
    }
}

// UPDATE function

const updatePrompt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {;
    try {
        const updatePrompt : Prompts = req.body;
        const updatedPrompt = await PromptService.updatePrompt(updatePrompt);
        res.status(200).json(updatedPrompt);
    } catch (error) {
        console.error("Error in prompt controller:", error);
        res.status(500).json("Could not update the prompt.");
    }
}


//CREATE functions

const createPrompt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {;
    try {
        const newPrompt : Prompts = req.body;
        const createdPrompt = await PromptService.createPrompt(newPrompt);
        res.status(200).json(createdPrompt);
    } catch (error) {
        console.error("Error in prompt controller:", error);
        res.status(500).json("Could not create a new prompt.");
    }
}

//DELETE functions

const deletePromptById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { promptId: promptId } = req.body;

    const deletedPrompt = await PromptService.deletePromptById(promptId)
    if (!deletedPrompt)  {
        res.status(500).json("Cannot delete id");
    }
    res.status(200).json(deletedPrompt);
}

const PromptController = {
    getAllPrompts,
    getPromptById,
    getPromptByAdjective,
    updatePrompt,
    createPrompt,
    deletePromptById
};

export { PromptController };