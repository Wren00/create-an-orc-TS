import {prisma} from "../utils/prisma";
import {CreatePrompt, IPrompt, UpdatePrompt} from "../interfaces/prompt";
import {removeUndefined} from "../utils/dataUtil";

//GET functions

async function getAllPrompts(): Promise<{ promptId: string, content: string }[]> {
    try {
        const allPrompts = await prisma.prompts.findMany({
            select: {
                id: true,
                content: true
            }
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
        // error check if id could not be found, nothing is returned
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


async function getPromptByContent(promptSearch: string): Promise<IPrompt[]> {
    let promptArray = [];

    try {
        promptArray = await prisma.prompts.findMany({
            where: {
                content: {
                    contains: promptSearch,
                    mode: "insensitive",
                },
            },
        });
    } catch (error) {
        console.error("Error fetching prompts:", error);
        throw error;
    }

    return promptArray.map((x:any) => ({
        promptId: x.promptId,
        content: x.content,
        createdAt: x.createdAt,
        updatedAt: x.updatedAt,
        isDeleted: x.isDeleted
    }));
}


// UPDATE function

async function updatePrompt(promptToUpdate: UpdatePrompt) {
    try {

        return await prisma.prompts.update({
            where: {id: promptToUpdate.promptId},
            data: removeUndefined(promptToUpdate)
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
        throw Error("Cannot create prompt.");
    }
}

// //DELETE function

async function deletePromptById(promptId: number) {

    let deletedPrompt;

    try {
        deletedPrompt = await prisma.prompts.delete({
            where: {
                id: promptId,
            },
        });
    } catch (error) {
        console.error("Error deleting this prompt:", error);
    }

    return deletedPrompt;
}

const PromptService = {
    getAllPrompts,
    getPromptById,
    getPromptByAdjective: getPromptByContent,
    updatePrompt,
    createPrompt,
    deletePromptById
};

export { PromptService };
