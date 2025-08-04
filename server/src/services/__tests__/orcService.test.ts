import { OrcService } from "../orcService";
import { prisma } from "../../utils/prisma";

// mocks

const mockOrc = {
    id: 1,
    name: "Hok",
    description: "A testing orc",
    str: 1,
    dex: 1,
    con: 1,
    int: 1,
    wis: 1,
    cha: 1,
    orcImagesId: 1,
    promptsCollectionId: 1,
    userId: 1,
};

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock("../../utils/prisma", () => ({
    prisma: {
        orc: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            delete: jest.fn(),
        },
    },
}));

(prisma.orc.findMany as unknown as jest.Mock).mockResolvedValue([
    { id: 1, name: "Huk", orcImagesId: 1, userId: 1 },
    { id: 2, name: "Hak", orcImagesId: 2, userId: 1 }
]);

(prisma.orc.findUnique as unknown as jest.Mock).mockResolvedValue(
    { id: 1, name: "Huk", str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10, description: "A test Orc.", orcImagesId: 1, userId: 1 }
);

describe("OrcService.getAllOrcsAdmin", () => {
    it("returns array of all saved orcs", async () => {
        const result = await OrcService.getAllOrcsAdmin();

        expect(result).toEqual([
            { orcId: 1, name: "Huk", orcImagesId: 1 },
            { orcId: 2, name: "Hak", orcImagesId: 2 }
        ]);
    });
});

describe("OrcService.getOrcById", () => {
    it("get a single Orc by it's id", async () => {
        const result = await OrcService.getOrcById(1);

        expect(result).toEqual(
            { orcId: 1, name: "Huk", str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10, description: "A test Orc.", orcImagesId: 1, userId: 1}
        );
    });
});

describe("OrcService.saveOrc", () => {
    const mockInput = {
        name: "Hek the Test",
        description: "A mighty testing warrior",
        str: 18,
        dex: 12,
        con: 16,
        int: 8,
        wis: 10,
        cha: 6,
        orcImagesId: 3,
        promptsCollectionId: 5,
        userId: 1,
    };

    const mockCreatedOrc = {
        ...mockInput,
    };

    it("should create and return a new orc", async () => {
        (prisma.orc.create as jest.Mock).mockResolvedValue(mockCreatedOrc);

        const result = await OrcService.saveOrc(mockInput);

        expect(prisma.orc.create).toHaveBeenCalledWith({
            data: mockInput,
        });

        expect(result).toEqual(mockCreatedOrc);
    });

    it("should throw an error if Prisma fails", async () => {
        (prisma.orc.create as jest.Mock).mockRejectedValue(new Error("DB Error"));

        await expect(OrcService.saveOrc(mockInput)).rejects.toThrow("Failed to create Orc");
    });
});

describe("OrcService.deleteOrcById", () => {
        it("should delete an orc by ID and return the deleted object", async () => {

            (prisma.orc.delete as jest.Mock).mockResolvedValue(mockOrc);

            const result = await OrcService.deleteOrcById(1);

            expect(prisma.orc.delete).toHaveBeenCalledWith({
                where: { id: 1 },
            });

            expect(result).toEqual(mockOrc);
        });

        it("should throw an error if deletion fails", async () => {
            (prisma.orc.delete as jest.Mock).mockRejectedValue(new Error("DB error"));

            await expect(OrcService.deleteOrcById(999)).rejects.toThrow("Failed to delete Orc");
        });
});
