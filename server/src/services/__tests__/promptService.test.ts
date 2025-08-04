import { PromptService } from "../promptService";
import { prisma } from "../../utils/prisma";

jest.mock("../../utils/prisma");


const mockPrompt = { id: 1, content: "prompt for testing"};

beforeEach(() => {
        jest.clearAllMocks();
    });

jest.mock("../../utils/prisma", () => ({
    prisma: {
        prompts: {
            create: jest.fn(),
            update: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            delete: jest.fn(),
        },
    },
}));

(prisma.prompts.findMany as unknown as jest.Mock).mockResolvedValue([
    { id: 1, content: "prompt1" },
    { id: 2, content: "prompt2" }
]);

(prisma.prompts.findUnique as unknown as jest.Mock).mockResolvedValue(
    { id: 3, content: "prompt3"}
);


describe("getAllPrompts", () => {
    it("should return all prompts with string promptId", async () => {

        const result = await PromptService.getAllPrompts();

        expect(result).toEqual([
            { promptId: "1", content: "prompt1" },
            { promptId: "2", content: "prompt2" },
        ]);
    });

    it("should throw if prisma fails", async () => {
        (prisma.prompts.findMany as jest.Mock).mockRejectedValue(new Error("DB error"));
        await expect(PromptService.getAllPrompts()).rejects.toThrow();
    });
});


describe("getPromptById", () => {
    it("should return a single prompt", async () => {

        const result = await PromptService.getPromptById(1);

        expect(result).toEqual({
            promptId: "3",
            content: "prompt3",
        });
    });

    it("should throw if prompt not found", async () => {
        (prisma.prompts.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(PromptService.getPromptById(3)).rejects.toThrow("Prompt with ID 3 not found");
    });

    it("should throw if prisma throws", async () => {
        (prisma.prompts.findUnique as jest.Mock).mockRejectedValue(new Error("fail"));

        await expect(PromptService.getPromptById(1)).rejects.toThrow();
    });
});

describe("updatePrompt", () => {
    it("should update a prompt with new content", async () => {
        (prisma.prompts.update as jest.Mock).mockResolvedValue({ id: 1, content: "Updated content" });

        const result = await PromptService.updatePrompt({ promptId: 1, content: "Updated content" });

        expect(prisma.prompts.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: { content: "Updated content" },
        });

        expect(result).toEqual({ id: 1, content: "Updated content" });
    });

    it("should throw if prisma fails", async () => {
        (prisma.prompts.update as jest.Mock).mockRejectedValue(new Error("fail"));

        await expect(
            PromptService.updatePrompt({ promptId: 1, content: "Updated content" })
        ).rejects.toThrow();
    });
});

describe("createPrompt", () => {
    it("should create a new prompt", async () => {
        (prisma.prompts.create as jest.Mock).mockResolvedValue(mockPrompt);

        const result = await PromptService.createPrompt({ content: "New prompt" });

        expect(prisma.prompts.create).toHaveBeenCalledWith({
            data: { content: "New prompt" },
        });

        expect(result).toEqual(mockPrompt);
    });

    it("should throw if creation fails", async () => {
        (prisma.prompts.create as jest.Mock).mockRejectedValue(new Error("Failed to create Prompt"));

        await expect(PromptService.createPrompt({ content: "Oops" })).rejects.toThrow("Failed to create Prompt");
    });
});

describe("deletePromptById", () => {
    it("should delete a prompt", async () => {
        (prisma.prompts.delete as jest.Mock).mockResolvedValue(mockPrompt);

        const result = await PromptService.deletePromptById(1);

        expect(prisma.prompts.delete).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(result).toEqual(mockPrompt);
    });

    it("should throw if deletion fails", async () => {
        (prisma.prompts.delete as jest.Mock).mockRejectedValue(new Error("Failed to delete Prompt"));

        await expect(PromptService.deletePromptById(1)).rejects.toThrow("Failed to delete Prompt");
    });
})