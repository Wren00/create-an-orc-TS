import request from "supertest";
import { app } from "../../app";
import { GeneratorService } from "../../services/generatorService";

// Mock the service
jest.mock("../../services/generatorService");

const mockGenerateOrcData = GeneratorService.generateOrcData as jest.Mock;

describe("Generator Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should respond with 204 and Orc data", async () => {
        const fakeOrc = {
            name: "TestOrc",
            description: "A strong Orc",
            str: 10,
            dex: 10,
            con: 10,
            int: 10,
            wis: 10,
            cha: 10
        };

        mockGenerateOrcData.mockResolvedValue(fakeOrc);

        const res = await request(app).get("/gen");

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(fakeOrc);
    });
});