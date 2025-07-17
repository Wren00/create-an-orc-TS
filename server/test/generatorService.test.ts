import { GeneratorService } from "../src/generators/generatorService";
import { prisma } from "../src/utils/prisma";

jest.mock("../src/utils/prisma");

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock("../src/utils/prisma", () => ({
    prisma: {
        catalogue: {
            count: jest.fn(),
            create: jest.fn(),
            findMany: jest.fn(),
            findFirst: jest.fn()
        },
    },
}));

describe("GeneratorService.generateOrcName", () => {

    it("should return a name with joined syllables", async () => {
        (prisma.catalogue.count as jest.Mock).mockResolvedValue(10);
        (prisma.catalogue.findFirst as jest.Mock).mockResolvedValue({ syllables: "he" });

        // Force Math.random to return 0 always → randomNum = 1
        jest.spyOn(Math, "random").mockReturnValue(0);

        const result = await GeneratorService.generateOrcName();

        expect(result).toBe("hek");
        expect(prisma.catalogue.count).toHaveBeenCalledTimes(1);
        expect(prisma.catalogue.findFirst).toHaveBeenCalledTimes(1);
    });

    it("should return at least 3 characters (adds 'k' if needed)", async () => {
        (prisma.catalogue.count as jest.Mock).mockResolvedValue(10);
        (prisma.catalogue.findFirst as jest.Mock).mockResolvedValue({ syllables: "a" });

        jest.spyOn(Math, "random").mockReturnValue(0);

        const result = await GeneratorService.generateOrcName();
        expect(result).toBe("ak");
    });

    it("should handle null results from findFirst()", async () => {
        (prisma.catalogue.count as jest.Mock).mockResolvedValue(10);
        (prisma.catalogue.findFirst as jest.Mock).mockResolvedValueOnce(null).mockResolvedValueOnce({ syllables: "mok" });

        // Force two iterations
        jest.spyOn(Math, "random").mockReturnValue(0.5); // (0.5 * 4) + 1 = 3

        const result = await GeneratorService.generateOrcName();
        expect(result.length).toBeGreaterThanOrEqual(2);
    });
});