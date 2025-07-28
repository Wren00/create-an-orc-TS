import {prisma} from "../utils/prisma";
import OpenAI from "openai";
import {PromptService} from "../services/promptService";
import {GenerateOrc} from "../../../common/interfaces/orc";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


async function generateOrcData() {

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

    console.log(formatName)

    const promptCollectionId : number = await PromptService.createNewPromptsCollection();

    const promptContent : string[] = await PromptService.getSelectedPromptContent(promptCollectionId);

    const promptText = `
    You are a fantasy writer tasked with creating short backstories for Orc characters based on three personality traits.

    Here are some examples:

    Traits: fierce, loyal, cunning  
    Backstory: This Orc has survived countless battles through sharp wits and brute force. Though fierce in combat, their loyalty to their clan has earned deep respect. Cunning and resourceful, they often lead raids with careful planning. Their fearlessness and willingness to take risks have led them on countless daring escapades, making them a legend among their kin.
    Traits: brave, wise, solitary  
    Backstory: Raised in the windswept highlands of Mak'Dur, this Orc has trained alone seeking enlightenment for decades. Their wisdom is sought by many, but few are brave enough to approach. With a rugged appearance and scars that tell tales of countless battles won, this Orc is constantly on guard, anticipating any potential threats. 
    Traits: chaotic, generous, beautiful
    Backstory: This Orc is a chaotic being, known for their unpredictable nature and spontaneous actions. Despite their fierce appearance, they possess a heart of generosity, always willing to help those in need, even if it goes against the typical Orc mentality. Their beauty is unconventional, with sharp features and a wild, untamed aura that sets them apart from others in their tribe.
    
    Now, write a short backstory for an Orc with the following traits: ${promptContent.join(", ")}. 
    Their name is ${formatName}.`;

    console.log(promptContent);

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a fantasy character description generator. Given a list of personality traits, generate a short background for an Orc character. Keep it rich and concise (4–5 sentences). If describing a place, create a thematic name. Make sure the name of the Orc has a capital letter."
            },
            {
                role: "user",
                content: promptText
            }
        ],
    });

    const story = response.choices[0].message.content ?? "Unable to generate a backstory for this Orc.";

    // Generate and return 6 random stats

    const stats: number[] = [];

    for (let i = 0; i < 6; i++) {
        const randomStat = Math.floor(Math.random() * (20 - 5 + 1)) + 5; // random between 5 and 20
        stats.push(randomStat);
    }

    const orcData : GenerateOrc = {
        name : formatName,
        description : story,
        str : stats[0],
        dex : stats[1],
        con : stats[2],
        int : stats[3],
        wis : stats[4],
        cha : stats[5]
    }
    return orcData
}

const GeneratorService = {
    generateOrcData
};

export { GeneratorService };
