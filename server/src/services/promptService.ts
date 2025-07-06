import {prisma} from "../utils/prisma";
import {Prompts} from "../interfaces/prompts";

//GET functions

async function getAllPrompts(): Promise<{ adjectives: string }[]> {
    try {
        const allPrompts = await prisma.prompt.findMany({
            select: {
                id: true,
                adjectives: true
            }
        });
        return  allPrompts.map((prompt: { id: { toString: () => any; }; adjectives: any; }): { id: string; adjectives: string } => ({
            id: "",
            adjectives: ""
        }));
    } catch (error) {
        console.error("Unable to fetch prompts.", error);
        throw error;
    }
}

async function getPromptById(promptId: number) {
    try {
        const promptObject = await prisma.prompt.findUnique({
            where: { id: promptId },
        });
        // error check if id could not be found, nothing is returned
        if (!promptObject) {
            throw new Error(`Prompt with ID ${promptId} not found`);
        }

        return {
            promptId: promptObject.id.toString(),
            adjective: promptObject.adjectives
        };
    } catch (error) {
        console.error("Failed to fetch prompt:", error);
        throw error;
    }
}


async function getPromptByAdjective(promptSearch: string): Promise<Prompts[]> {
    let promptArray = [];

    try {
        promptArray = await prisma.prompt.findMany({
            where: {
                adjectives: {
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
        promptId: x.id,
        adjective: x.adjective
    }));
}


// UPDATE function

async function updatePrompt(promptToUpdate: Prompts) {
    try {

        return await prisma.prompt.update({
            where: {id: promptToUpdate.promptId},
            data: {
                adjectives: promptToUpdate.adjective
            }
        });
    } catch (error) {
        console.error("Error updating prompt:", error);
        throw error;
    }
}

//CREATE function

async function createPrompt(prompt : Prompts) {
    try {

        const newPrompt = await prisma.prompt.create({
            data: {
                id: prompt.promptId,
                adjectives: prompt.adjective
            }
        });

        return {
            id: newPrompt.id,
            adjective: newPrompt.adjectives
        }
    } catch(error) {
        throw Error("Cannot create user");
    }
}

// //DELETE function

async function deletePromptById(promptId: number) {

    let deletedPrompt;

    try {
        deletedPrompt = await prisma.prompt.delete({
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
    getPromptByAdjective,
    updatePrompt,
    createPrompt,
    deletePromptById
};

export { PromptService };
