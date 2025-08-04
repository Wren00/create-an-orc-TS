import request from "supertest";
import { app } from "../../app";
import { PromptService } from "../../services/promptService";

jest.mock("../../services/promptService");

describe("PromptController", () => {
    describe("GET /prompts", () => {
        it("should return a list of prompts", async () => {
            const mockPrompts = [{ id: 1, content: "Trait 1" }, { id: 2, content: "Trait 2" }];
            (PromptService.getAllPrompts as jest.Mock).mockResolvedValue(mockPrompts);

            const res = await request(app).get("/prompts");

            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockPrompts);
        });

    describe("GET /prompts/:id", () => {
        it("should return a single prompt by id", async () => {
            const mockPrompt = {id: 1, content: "Loyal"};
            (PromptService.getPromptById as jest.Mock).mockResolvedValue(mockPrompt);

            const res = await request(app).get("/prompts/1");

            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockPrompt);
        });
    });

    describe("POST /prompts", () => {
        it("should create a new prompt", async () => {
            const newPrompt = { content: "Brave" };
            const createdPrompt = { id: 5, content: "Brave" };
            (PromptService.createPrompt as jest.Mock).mockResolvedValue(createdPrompt);

            const res = await request(app)
                .post("/prompts")
                .send(newPrompt)
                .set("Accept", "application/json");

            expect(res.status).toBe(201);
            expect(res.body).toEqual(createdPrompt);
        });

        it("should return 400 on failure", async () => {
            (PromptService.createPrompt as jest.Mock).mockRejectedValue(new Error("Invalid data"));

            const res = await request(app).post("/prompts").send({}).set("Accept", "application/json");

            expect(res.status).toBe(400);
            expect(res.body).toEqual("Could not create prompt.");
        });
    });

    describe("PATCH /prompts", () => {
        it("should update a prompt", async () => {
            const updateData = { id: 1, content: "Cunning" };
            const updatedPrompt = { id: 1, content: "Cunning" };
            (PromptService.updatePrompt as jest.Mock).mockResolvedValue(updatedPrompt);

            const res = await request(app)
                .patch("/prompts")
                .send(updateData)
                .set("Accept", "application/json");

            expect(res.status).toBe(200);
            expect(res.body).toEqual(updatedPrompt);
        });

        it("should return 400 on update failure", async () => {
            (PromptService.updatePrompt as jest.Mock).mockRejectedValue(new Error("Bad input"));

            const res = await request(app)
                .patch("/prompts")
                .send({})
                .set("Accept", "application/json");

            expect(res.status).toBe(400);
            expect(res.body).toEqual({ message: "Could not update prompt." });
        });
    });

    describe("DELETE /prompts/:id", () => {
        it("should delete a prompt by id", async () => {
            const deletedPrompt = { id: 1, content: "Fierce" };
            (PromptService.deletePromptById as jest.Mock).mockResolvedValue(deletedPrompt);

            const res = await request(app).delete("/prompts/1");

            expect(res.status).toBe(200);
            expect(res.body).toEqual(deletedPrompt);
        });

        it("should return 400 on delete failure", async () => {
            (PromptService.deletePromptById as jest.Mock).mockRejectedValue(new Error("Delete fail"));

            const res = await request(app).delete("/prompts/1");

            expect(res.status).toBe(400);
            expect(res.body).toEqual({ message: "Could not delete prompt." });
        });
    })
    });
});