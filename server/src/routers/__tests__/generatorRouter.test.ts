import request from 'supertest';
import { app } from '../../app';

describe("/gen", () => {
    describe("GET /gen", () => {
        it("respond with json containing a list of generated data for an Orc", async () => {
            await request(app)
                .get("/gen")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
                .expect(201);
        });
    });
});
