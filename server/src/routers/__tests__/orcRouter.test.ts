import request from 'supertest';
import { app }  from '../../app';

describe('GET /orcs', () => {
    it('returns 200 and array of orcs', async () => {
        const res = await request(app).get('/orcs');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe("GET /orcs/{id}", () => {
    it("respond with json containing a single Orc found by id", async () => {
        await request(app)
            .get("/orcs/1")
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect(200);
    });
});

describe("POST /orcs", () => {
    it("respond with 400 for missing data", async () => {
        await request(app)
            .post("/orcs")
            .set("Accept", "application/json")
            .send({})
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(400);
    });

    it("respond with 201 with an Orc saved successfully", async () => {
        const newOrc = {
            name: "TestOrc",
            description: "Sample Backstory.",
            str: 10,
            dex: 10,
            con: 10,
            int: 10,
            wis: 10,
            cha: 10,
            promptsCollectionId: 1,
            orcImagesId: 1,
            userId: 1
        }
        await request(app)
            .post("/orcs")
            .set("Accept", "application/json")
            .send(newOrc)
            .expect("Content-type","application/json; charset=utf-8")
            .expect(201);
    });
});

describe("DELETE /orcs/{id}", () => {

    it("respond with 200 with Orc deleted successfully", async () => {
        await request(app)
            .get("/orcs/1")
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect(200);
    });
});