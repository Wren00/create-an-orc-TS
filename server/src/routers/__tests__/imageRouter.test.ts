import request from 'supertest';
import { app } from '../../app';

describe("/images", () => {
    describe("GET /images", () => {
        it("respond with json containing an array of urls for images", async () => {
            await request(app)
                .get("/images")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
                .expect(200);
        });
    });
});

describe("/images/bg", () => {
    describe("GET /images/bg", () => {
        it("respond with json containing an array of urls for background images", async () => {
            await request(app)
                .get("/images/bg")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
                .expect(200);
        });
    });
});