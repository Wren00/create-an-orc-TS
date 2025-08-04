import request from "supertest";
import { app } from "../../app";
import { ImageService } from "../../services/imageService";

jest.mock("../../services/imageService");

describe("ImageController", () => {

    describe("GET /images", () => {
        it("should return an array of orc image URLs", async () => {
            const mockOrcImages = ["orc1.png", "orc2.png", "orc3.png"];
            (ImageService.getOrcImageArray as jest.Mock).mockResolvedValue(mockOrcImages);

            const res = await request(app).get("/images");

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ images: mockOrcImages });
        });

        it("should return 400 if ImageService throws", async () => {
            (ImageService.getOrcImageArray as jest.Mock).mockRejectedValue(new Error("Fail"));

            const res = await request(app).get("/images");

            expect(res.status).toBe(400);
            expect(res.body).toEqual({ message: "Could not retrieve images." });
        });
    });

    describe("GET /images/bg", () => {
        it("should return an array of background image URLs", async () => {
            const mockBgImages = ["bg1.png", "bg2.png"];
            (ImageService.getBgImagesFromTable as jest.Mock).mockResolvedValue(mockBgImages);

            const res = await request(app).get("/images/bg");

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ images: mockBgImages });
        });

        it("should return 400 if ImageService throws", async () => {
            (ImageService.getBgImagesFromTable as jest.Mock).mockRejectedValue(new Error("Fail"));

            const res = await request(app).get("/images/bg");

            expect(res.status).toBe(400);
            expect(res.body).toEqual({ message: "Could not retrieve images." });
        });
    });

});