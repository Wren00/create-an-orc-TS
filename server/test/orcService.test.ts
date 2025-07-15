jest.mock("../src/utils/prisma", () => ({
    prisma: {
        orc: {
            findMany: jest.fn().mockResolvedValue([
                { orcId: 1, name: "Huk", orcImagesId: 1 },
                { orcId: 2, name: "Hak", orcImagesId: 2 }
            ]),
        },
    },
}));

import { OrcService } from "../src/services/orcService";
import { prisma } from "../src/utils/prisma";

(prisma.orc.findMany as unknown as jest.Mock).mockResolvedValue([
    { id: 1, name: "Huk", orcImagesId: 1 },
    { id: 2, name: "Hak", orcImagesId: 2 }
]);

describe("OrcService.getAllOrcsAdmin", () => {
    it("returns mapped orcs", async () => {
        const result = await OrcService.getAllOrcsAdmin();

        expect(result).toEqual([
            { orcId: 1, name: "Huk", orcImagesId: 1 },
            { orcId: 2, name: "Hak", orcImagesId: 2 }
        ]);
    });
});