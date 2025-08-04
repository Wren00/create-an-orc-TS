import request from 'supertest';
import { app } from '../../app';

describe("/prompts", () => {
    describe("GET /prompts", () => {
        it("respond with json containing an array of prompts", async () => {
            await request(app)
                .get("/prompts")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
                .expect(200);
        });
    });
});

describe("GET /prompts/{id}", () => {
    it("respond with json containing a single prompt found by id", async () => {
        await request(app)
            .get("/prompts/1")
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect(200);
    });
});

describe("POST /prompts", () => {
    it("respond with 400 for missing data", async () => {
        await request(app)
            .post("/prompts")
            .set("Accept", "application/json")
            .send({})
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(400);
    });

    it("respond with 201 with prompt created successfully", async () => {
        const newPrompt = {
            content : "new prompt"
        }
        await request(app)
            .post("/prompts")
            .set("Accept", "application/json")
            .send(newPrompt)
            .expect("Content-type","application/json; charset=utf-8")
            .expect(201);
    });
});

describe("PATCH /prompts", () => {
    it("respond with 400 if data missing", async () => {
        await request(app)
            .patch("/prompts")
            .set("Accept", "application/json")
            .send({})
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(400)
    });

    it("respond with 204 with prompt updated successfully", async () => {
        const updatedPrompt = {
            promptId: 1,
            content: "update"
        };
        await request(app)
            .patch("/prompts")
            .set("Accept", "application/json")
            .send(updatedPrompt)
            .expect(204);
    });
});