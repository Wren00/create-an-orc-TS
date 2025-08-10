import { z } from "zod";

export const GenerateOrcSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    str: z.number().int().min(5).max(20),
    dex: z.number().int().min(5).max(20),
    con: z.number().int().min(5).max(20),
    int: z.number().int().min(5).max(20),
    wis: z.number().int().min(5).max(20),
    cha: z.number().int().min(5).max(20),
});

export type GenerateOrc = z.infer<typeof GenerateOrcSchema>;