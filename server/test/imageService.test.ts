import { ImageService } from "../src/services/imageService";
import { prisma } from "../src/utils/prisma";

// Mock setup
jest.mock("../src/utils/prisma", () => ({
    prisma: {
        orcHead: {
            count: jest.fn(),
            findFirst: jest.fn(),
        },
        orcTorso: {
            count: jest.fn(),
            findFirst: jest.fn(),
        },
        orcLegs: {
            count: jest.fn(),
            findFirst: jest.fn(),
        },
    },
}));

describe("ImageService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getOrcImageArray", () => {
        it("should return an array of 3 image URLs", async () => {
            // Mock successful responses
            (prisma.orcHead.count as jest.Mock).mockResolvedValue(5);
            (prisma.orcHead.findFirst as jest.Mock).mockResolvedValue({ url: "head.png" });

            (prisma.orcTorso.count as jest.Mock).mockResolvedValue(5);
            (prisma.orcTorso.findFirst as jest.Mock).mockResolvedValue({ url: "torso.png" });

            (prisma.orcLegs.count as jest.Mock).mockResolvedValue(5);
            (prisma.orcLegs.findFirst as jest.Mock).mockResolvedValue({ url: "legs.png" });

            const result = await ImageService.getOrcImageArray();

            expect(result).toEqual(["head.png", "torso.png", "legs.png"]);
        });

        it("should throw an error if one model has no images", async () => {
            (prisma.orcHead.count as jest.Mock).mockResolvedValue(0);

            await expect(ImageService.getOrcImageArray()).rejects.toThrow(
                "No head images in the database."
            );
        });

        it("should throw an error if findFirst returns no result", async () => {
            (prisma.orcHead.count as jest.Mock).mockResolvedValue(3);
            (prisma.orcHead.findFirst as jest.Mock).mockResolvedValue(null);

            await expect(ImageService.getOrcImageArray()).rejects.toThrow(
                "head image URL is invalid or missing."
            );
        });

        it("should throw an error if url is not a string", async () => {
            (prisma.orcHead.count as jest.Mock).mockResolvedValue(3);
            (prisma.orcHead.findFirst as jest.Mock).mockResolvedValue({ url: 123 });

            await expect(ImageService.getOrcImageArray()).rejects.toThrow(
                "head image URL is invalid or missing."
            );
        });
    });
});
