import {prisma} from "../utils/prisma";
import {CreatePrompt, UpdatePrompt} from "../../../common/interfaces/prompt";
import {removeUndefined} from "../utils/dataUtil";

//GET functions

async function getAllPrompts(): Promise<{ promptId: string, content: string }[]> {
    try {
        const allPrompts = await prisma.prompts.findMany({
            select: {
                id: true,
                content: true,
            },
        });
        return  allPrompts.map((prompt: { id: { toString: () => any; }; content: any; }): { promptId: string; content: string } => ({
            promptId: prompt.id.toString(),
            content: prompt.content
        }));
    } catch (error) {
        console.error("Unable to fetch prompts.", error);
        throw error;
    }
}

async function getPromptById(promptId: number) {
    try {
        const promptObject = await prisma.prompts.findUnique({
            where: { id: promptId },
        });
        if (!promptObject) {
            throw new Error(`Prompt with ID ${promptId} not found`);
        }
        return {
            promptId: promptObject.id.toString(),
            content: promptObject.content
        };
    } catch (error) {
        console.error("Failed to fetch prompt: ", error);
        throw error;
    }
}

// UPDATE function

async function updatePrompt(input: UpdatePrompt) {
    try {
        const dataToUpdate: Record<string, any> = {
            content: input.content
        };

        return await prisma.prompts.update({
            where: {id: input.promptId},
            data: removeUndefined(dataToUpdate)
        });
    } catch (error) {
        console.error("Error updating prompt:", error);
        throw error;
    }
}

//CREATE function

async function createPrompt(prompt: CreatePrompt) {

    try {
        return await prisma.prompts.create({
            data: {
                content: prompt.content
            }
        });
    } catch(error) {
        console.error("Prisma error on creating Prompt:", error);
        throw new Error("Failed to create Prompt");
    }
}

// //DELETE function

export async function deletePromptById(promptId: number) {
    try {
        return await prisma.prompts.delete({
            where: {id: promptId}
        });
    } catch (error) {
        console.error("Prisma error on deleting Prompt:", error);
        throw new Error("Failed to delete Prompt");
    }
}

const PromptService = {
    getAllPrompts,
    getPromptById,
    updatePrompt,
    createPrompt,
    deletePromptById
};

export { PromptService };
