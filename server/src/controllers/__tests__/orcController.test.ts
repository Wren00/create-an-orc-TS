import request from 'supertest';
import { app } from '../../app'; // your Express app
import { OrcService } from '../../services/orcService';

jest.mock('../../services/orcService');

describe("OrcController", () => {

    describe("GET /orcs", () => {
        it("returns a list of orcs", async () => {
            const mockOrcs = [
                { id: 1, name: "Grunk", description: "A fierce orc" },
                { id: 2, name: "Throg", description: "A wise orc" }
            ];

            (OrcService.getAllOrcsAdmin as jest.Mock).mockResolvedValue(mockOrcs);

            const res = await request(app).get("/orcs");

            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockOrcs);
        });
    });

    describe("GET /orcs/:id", () => {
        it("returns an orc by id", async () => {
            const mockOrc = { id: 1, name: "Grunk", description: "A fierce orc" };

            (OrcService.getOrcById as jest.Mock).mockResolvedValue(mockOrc);

            const res = await request(app).get("/orcs/1");

            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockOrc);
        });
    });

    describe("POST /orcs", () => {
        it("creates and returns a new orc", async () => {
            const newOrc = {
                name: "Zog",
                description: "A new orc",
                str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10,
                promptsCollectionId: 1,
                orcImagesId: 1,
                userId: 1
            };

            (OrcService.saveOrc as jest.Mock).mockResolvedValue({ id: 99, ...newOrc });

            const res = await request(app)
                .post("/orcs")
                .send(newOrc)
                .set("Accept", "application/json");

            expect(res.status).toBe(201);
            expect(res.body).toEqual({ id: 99, ...newOrc });
        });
    });

    describe("DELETE /orcs/:id", () => {
        it("deletes an orc by id", async () => {
            (OrcService.deleteOrcById as jest.Mock).mockResolvedValue({ success: true });

            const res = await request(app).delete("/orcs/1");

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ success: true });
        });
    });

});