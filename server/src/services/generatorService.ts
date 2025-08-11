import {prisma} from "../utils/prisma";
import OpenAI from "openai";
import {PromptService} from "./promptService";
import {parseJsonWithSchema} from "../utils/jsonParser";
import {GenerateOrcSchema, GenerateOrc} from "../schemas/orcSchema";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


async function generateOrcData() : Promise<GenerateOrc> {

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
        name += "k"
    }

    let formatName = name.charAt(0).toUpperCase() + name.slice(1);

    const promptCollectionId : number = await PromptService.createNewPromptsCollection();

    const promptContent : string[] = await PromptService.getSelectedPromptContent(promptCollectionId);

    const promptText = `
    You are a fantasy writer tasked with creating short backstories for Orc characters based on three personality traits.

    Here are some examples:
    
    {
        "name" : "Hek",
        "description" : "Born in the great city of Vornathor, this Orc has survived countless battles through sharp wits and brute force. Though fierce in combat, their loyalty to their clan has earned deep respect. Cunning and resourceful, they often lead raids with careful planning. Their fearlessness and willingness to take risks have led them on countless daring escapades, making them a legend among their kin.",
        "str" : 10,
        "dex" : 12,
        "con" : 11, 
        "int" : 8,
        "wis" : 13,
        "cha" : 14,
    }
    Traits: fierce, loyal, cunning  
    Traits: brave, wise, solitary  
    Backstory: Raised in the windswept highlands of Mak'Dur, this Orc has trained alone seeking enlightenment for decades. Their wisdom is sought by many, but few are brave enough to approach. With a rugged appearance and scars that tell tales of countless battles won, this Orc is constantly on guard, anticipating any potential threats. 
    Traits: chaotic, generous, beautiful
    Backstory: This Orc is a chaotic being, known for their unpredictable nature and spontaneous actions. Despite their fierce appearance, they possess a heart of generosity, always willing to help those in need, even if it goes against the typical Orc mentality. Their beauty is unconventional, with sharp features and a wild, untamed aura that sets them apart from others in their tribe.
    
    The stats (str,dex,con,int,wis,cha) must be assigned randomised values from this array: [15, 14, 13, 12, 10, 8]
    Now, write a short backstory for an Orc with the following traits: ${promptContent.join(", ")}. 
    Their name is ${formatName}.
    
    Return data in JSON format.`;

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a fantasy character description generator. Given a list of personality traits, generate a short background for an Orc character. Keep it rich and concise (4–5 sentences). If describing a place, create a thematic name. The tone is silly and comedic. Make sure the name of the Orc has a capital letter."
            },
            {
                role: "user",
                content: promptText
            }
        ],
    });

    const result = response.choices[0]?.message?.content ?? "{}";

    const parsedData = parseJsonWithSchema(result, GenerateOrcSchema);

    if (!parsedData.ok) {
        throw new Error(`Invalid output: ${parsedData.error}`);
    }

    return parsedData.value;
}

const GeneratorService = {
    generateOrcData
};

export { GeneratorService };
