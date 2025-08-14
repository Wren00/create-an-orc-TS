import {prisma} from "../utils/prisma";
import {CreatePrompt, UpdatePrompt} from "../../../common/interfaces/prompt";
import {removeUndefined} from "../../../common/utils/dataUtil";

//GET functions

async function getAllPrompts(): Promise<{ promptId: string, content: string }[]> {
    try {
        const allPrompts = await prisma.prompts.findMany({
            select: {
                id : true,
                content : true,
            },
        });
        return  allPrompts.map((prompt: { id: { toString: () => any; }; content: any; }): { promptId: string; content: string } => ({
            promptId : prompt.id.toString(),
            content : prompt.content
        }));
    } catch (error) {
        console.error("Unable to fetch prompts.", error);
        throw error;
    }
}

async function getPromptById(promptId: number) {
    try {
        const promptObject = await prisma.prompts.findUnique({
            where: { id : promptId },
        });
        if (!promptObject) {
            throw new Error(`Prompt with ID ${promptId} not found`);
        }
        return {
            promptId : promptObject.id.toString(),
            content : promptObject.content
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

async function deletePromptById(promptId: number) {
    try {
        return await prisma.prompts.delete({
            where: {id: promptId}
        });
    } catch (error) {
        console.error("Prisma error on deleting Prompt:", error);
        throw new Error("Failed to delete Prompt");
    }
}


// add prompts to promptCollection

async function createNewPromptsCollection() {

    const total = await prisma.prompts.count();

    const randomIds :number[] = [];

    for(let i = 0; i < 3; i++) {

        const randomIndex = Math.floor(Math.random() * total);

        const result = await prisma.prompts.findFirst({
            skip: randomIndex,
        });

        if (result) {
            randomIds.push(result.id);
        }
    }

    try {

        const newCollection = await prisma.promptsCollection.create({
            data: {
                prompt1 : randomIds.at(0),
                prompt2 : randomIds.at(1),
                prompt3 : randomIds.at(2)
            }
        });

        return newCollection.id;
    } catch(error) {
        console.error("Prisma error on creating Prompt Collection:", error);
        throw new Error("Failed to create Prompt Collection");
    }
}

async function getSelectedPromptContent(collectionId: number): Promise<string[]> {
    const collection = await prisma.promptsCollection.findUnique({
        where: { id: collectionId },
        select: {
            prompt1: true,
            prompt2: true,
            prompt3: true,
        },
    });

    if (!collection) {
        throw new Error(`PromptsCollection with ID ${collectionId} not found.`);
    }

    const promptIds = [collection.prompt1, collection.prompt2, collection.prompt3];

    const prompts = await prisma.prompts.findMany({
        where: { id: { in: promptIds as number[] } },
        select: { content: true },
    });

    return prompts.map((p) => p.content);
}


const PromptService = {
    getAllPrompts,
    getPromptById,
    updatePrompt,
    createPrompt,
    deletePromptById,
    createNewPromptsCollection,
    getSelectedPromptContent
};

export { PromptService };
