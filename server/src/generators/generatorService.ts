import {prisma} from "../utils/prisma";
import OpenAI from "openai";
import {PromptService} from "../services/promptService";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


async function generateOrcName() {

    //random number for number of syllables in name between 1 - 3
    const randomNum: number = Math.floor(Math.random() * 3) + 1;

    //count number of available rows in catalogue
    const total = await prisma.catalogue.count();

    const syllables: string[] = [];

    for (let i = 0; i < randomNum; i++) {

        const randomIndex = Math.floor(Math.random() * total);

        const result = await prisma.catalogue.findFirst({
            // I need to use skip here instead of findUnique as Prisma doesn't support accessing rows directly through index
            skip: randomIndex,
        });

        if (result) {
            syllables.push(result.syllables);
        }
    }

    let name = syllables.join('');

    //if name length is less than 3 chars add "k" to the end, this is for aesthetic
    if (name.length < 3) {
        return (`${name}k`);
    } else {
        return name;
    }

}

// generating Orc description with OpenAI

// new collection of 3 prompts needs to be generated
// prompt collection id needs to be used to access prompt1, prompt2, prompt 3

async function generateOrcDescription() {

    const promptCollectionId : number = await PromptService.createNewPromptsCollection();

    const promptContent : string[] = await PromptService.getSelectedPromptContent(promptCollectionId);

    const promptText = `Can you generate a short background for an fantasy orc character: they are- ${promptContent.join(`,`)} their name is not important.`;

    console.log(promptText);

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a fantasy character description generator." },
            { role: "user", content: promptText }
        ],
    });

    const result = response.choices[0].message.content;
    console.log(result);
    return result;
}



const GeneratorService = {
    generateOrcName,
    generateOrcDescription
};

export { GeneratorService };
