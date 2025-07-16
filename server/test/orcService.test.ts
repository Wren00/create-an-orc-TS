import { OrcService } from "../src/services/orcService";
import { prisma } from "../src/utils/prisma";

// mocks

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock("../src/utils/prisma", () => ({
    prisma: {
        orc: {
            create: jest.fn(),
            update: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            delete: jest.fn(),
        },
    },
}));

(prisma.orc.findMany as unknown as jest.Mock).mockResolvedValue([
    { id: 1, name: "Huk", orcImagesId: 1 },
    { id: 2, name: "Hak", orcImagesId: 2 }
]);

(prisma.orc.findUnique as unknown as jest.Mock).mockResolvedValue(
    { id: 1, userName: "Huk", }
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