import {prisma} from "../utils/prisma";

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





const GeneratorService = {
    generateOrcName
};

export { GeneratorService };
