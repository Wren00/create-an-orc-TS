import {prisma} from "../utils/prisma";

async function generateOrcName() {
    const randomNum : number = Math.floor(Math.random() * 4) + 1;


    const syllables: string[] = [];

    for (let i = 0; i < randomNum; i++) {
            const total = await prisma.catalogue.count();
            const randomOffset = Math.floor(Math.random() * total);

            const result = await prisma.catalogue.findFirst({
                skip: randomOffset,
            });

            if (result) {
                syllables.push(result.syllables);
            }
        }

    console.log(syllables);
    return syllables.join('');
}




const GeneratorService = {
    generateOrcName
};

export { GeneratorService };
