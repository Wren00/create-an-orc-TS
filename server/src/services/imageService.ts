import {prisma} from "../utils/prisma";

// retrieve Orc Head image

async function getOrcHead(): Promise<string> {

    const count = await prisma.orcHead.count();

    if (count === 0) {
        throw new Error("No head images in database.");
    }

    const randomOffset = Math.floor(Math.random() * count);

    const headImageUrl = await prisma.orcHead.findFirst({
        skip: randomOffset,
    });

    if (!headImageUrl || typeof headImageUrl.url !== "string") {
        throw new Error("Torso image URL is invalid or missing.");
    }

    return headImageUrl.url;
}

// retrieve Orc Torso image

async function getOrcTorso(): Promise<string> {

    const count = await prisma.orcTorso.count();

    if (count === 0) {
        throw new Error("No torso images in database.");
    }

    const randomOffset = Math.floor(Math.random() * count);

    const torsoImageUrl = await prisma.orcTorso.findFirst({
        skip: randomOffset,
    });

    if (!torsoImageUrl || typeof torsoImageUrl.url !== "string") {
        throw new Error("Torso image URL is invalid or missing.");
    }

    return torsoImageUrl.url;
}

// retrieve Orc Legs image

async function getOrcLegs(): Promise<string> {

    const count = await prisma.orcLegs.count();

    if (count === 0) {
        throw new Error("No leg images in database.");
    }

    const randomOffset = Math.floor(Math.random() * count);

    const legImageUrl = await prisma.orcLegs.findFirst({
        skip: randomOffset,
    });

    if (!legImageUrl || typeof legImageUrl.url !== "string") {
        throw new Error("Leg image URL is invalid or missing.");
    }

    return legImageUrl.url;
}

async function getOrcImageArray(): Promise<string[]> {

    const headUrl = await getOrcHead();
    const torsoUrl = await getOrcTorso();
    const legsUrl = await getOrcLegs();

    const imageArray : string[] = []
    imageArray.push(headUrl, torsoUrl, legsUrl);

    return imageArray;
}


const ImageService = {
    getOrcImageArray
};

export { ImageService };
