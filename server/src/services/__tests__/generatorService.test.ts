import { GeneratorService } from "../generatorService";
import { prisma } from "../../utils/prisma";
import { PromptService } from "../promptService";
import OpenAI from "openai";

jest.mock("../../utils/prisma", () => ({
    prisma: {
        catalogue: {
            count: jest.fn(),
            findFirst: jest.fn(),
        },
    },
}));

jest.mock("../promptService", () => ({
    PromptService: {
        createNewPromptsCollection: jest.fn(),
        getSelectedPromptContent: jest.fn(),
    },
}));

jest.mock("openai", () => {
    return {
        __esModule: true, // <-- allow default import compatibility
        default: jest.fn().mockImplementation(() => ({
            chat: {
                completions: {
                    create: jest.fn().mockResolvedValue({
                        choices: [
                            {
                                message: { content: "Sample backstory.", },
                            },
                        ],
                    }),
                },
            },
        })),
    };
});

describe("generateOrcData", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("generates valid orc data", async () => {
        (prisma.catalogue.count as jest.Mock).mockResolvedValue(1);
        jest.spyOn(Math, 'random').mockReturnValue(0);
        // orc name is 1 syllable and should have "k" added to the end
        (prisma.catalogue.findFirst as jest.Mock).mockResolvedValue({ syllables: "He" });
        (PromptService.createNewPromptsCollection as jest.Mock).mockResolvedValue(1);
        (PromptService.getSelectedPromptContent as jest.Mock).mockResolvedValue(["fierce", "loyal", "cunning"]);
        (OpenAI as any).mockImplementation(() => ({
            chat: {
                completions: {
                    create: jest.fn().mockResolvedValue({
                        choices: [{ message: { content: "Sample backstory." } }],
                    }),
                },
            },
        }));

        const orc = await GeneratorService.generateOrcData();

        expect(orc.name).toMatch(/[A-Z][a-z]+/);
        expect(orc.name).toBe("Hek");
        expect(orc.description).toBe("Sample backstory.");
        expect(orc.str).toBeGreaterThanOrEqual(5);
        expect(orc.str).toBeLessThanOrEqual(20);
        expect(orc).toHaveProperty("dex");
        expect(orc).toHaveProperty("con");
        expect(orc).toHaveProperty("int");
        expect(orc).toHaveProperty("wis");
        expect(orc).toHaveProperty("cha");
    });
});