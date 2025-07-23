import { prisma } from "../utils/prisma";

// Generic function to fetch a random url from orcHead/orcTorso/orcLegs

async function getRandomImageUrlFromTable(
    model: { count: () => Promise<number>; findFirst: (opts: { skip: number }) => Promise<any> },
    label: string
): Promise<string> {
    const count = await model.count();

    if (count === 0) {
        throw new Error(`No ${label} images in the database.`);
    }

    const randomOffset = Math.floor(Math.random() * count);

    const result = await model.findFirst({ skip: randomOffset });

    if (!result || typeof result.url !== "string") {
        throw new Error(`${label} image URL is invalid or missing.`);
    }

    return result.url;
}

async function getOrcHead(): Promise<string> {
    return getRandomImageUrlFromTable(prisma.orcHead, "head");
}

async function getOrcTorso(): Promise<string> {
    return getRandomImageUrlFromTable(prisma.orcTorso, "torso");
}

async function getOrcLegs(): Promise<string> {
    return getRandomImageUrlFromTable(prisma.orcLegs, "leg");
}

// Build array of images
async function getOrcImageArray(): Promise<string[]> {
    const [headUrl, torsoUrl, legsUrl] = await Promise.all([
        getOrcHead(),
        getOrcTorso(),
        getOrcLegs(),
    ]);

    return [headUrl, torsoUrl, legsUrl];
}

// retrieve all urls from background_images table

async function getBgImagesFromTable(
    model: { findMany: (args?: { select?: { url: boolean } }) => Promise<any[]> },
    label: string
): Promise<string[]> {
    const results = await model.findMany({
        select: {
            url: true
        }
    });

    const urls = results
        .map(item => item.url)
        .filter((url: any): url is string => typeof url === "string");

    if (urls.length === 0) {
        throw new Error(`No valid ${label} image URLs found.`);
    }

    return urls;
}

const ImageService = {
    getOrcImageArray,
    getBgImagesFromTable
};

export { ImageService };