import {Request, Response} from "express";
import { PromptService } from "../services/promptService";
import {CreatePrompt, UpdatePrompt} from "../interfaces/prompt";


//this admin function needs authentication for client use
const getAllPrompts = async (req: Request, res: Response): Promise<void> => {
    try {
        const orcs = await PromptService.getAllPrompts();
        res.status(200).json(orcs);
    } catch (error) {
        console.error("Error fetching prompt list: ", error);
        res.status(500).json({ message: "Could not retrieve prompts."});
    }
};

const getPromptById = async (req: Request, res: Response): Promise<void> => {
    try {
        const promptId = Number(req.params["id"]);
        const prompt = await PromptService.getPromptById(promptId)
        res.status(200).json(prompt);
    } catch (error) {
        console.error("Error fetching prompt id: ", error);
        res.status(500).json({ message: "Could not find prompt id."});
    }
}

// UPDATE function

const updatePrompt = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatePrompt: UpdatePrompt = req.body;
        const updatedPrompt = await PromptService.updatePrompt(updatePrompt);
        res.status(200).json(updatedPrompt);
    } catch (error) {
        console.error("Error updating prompt: ", error);
        res.status(500).json({ message: "Could not update prompt."});
    }
}


//CREATE functions

const createPrompt = async (req: Request, res: Response): Promise<void> => {
    try {
        const newPrompt: CreatePrompt = req.body;
        const createdPrompt = await PromptService.createPrompt(newPrompt);
        res.status(200).json(createdPrompt);
    } catch (error) {
        console.error("Error creating prompt: ", error);
        res.status(500).json("Could not create prompt.");
    }
}

//DELETE functions

const deletePromptById = async (req: Request, res: Response): Promise<void> => {
    try {
        const {promptId: promptId} = req.body;
        const deletedPrompt = await PromptService.deletePromptById(promptId)
        res.status(200).json(deletedPrompt);
    } catch (error) {
            console.error("Error deleting prompt: ", error);
            res.status(500).json({ message: "Could not delete prompt."});
        }
}

const PromptController = {
    getAllPrompts,
    getPromptById,
    updatePrompt,
    createPrompt,
    deletePromptById
};

export { PromptController };