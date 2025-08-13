import { z } from "zod";


export const OrcSchema = z.object({
    id: z.number().int(),
    name: z.string().min(3),
    description: z.string().min(1),
    str: z.number().int().min(5).max(20),
    dex: z.number().int().min(5).max(20),
    con: z.number().int().min(5).max(20),
    int: z.number().int().min(5).max(20),
    wis: z.number().int().min(5).max(20),
    cha: z.number().int().min(5).max(20),
    promptsCollectionId: z.number().int(),
    orcImagesId: z.number().int(),
    userId: z.number().int()
});

export const OrcGallerySchema = z.object({
    name: z.string().min(3),
    description: z.string().min(1),
    str: z.number().int().min(5).max(20),
    dex: z.number().int().min(5).max(20),
    con: z.number().int().min(5).max(20),
    int: z.number().int().min(5).max(20),
    wis: z.number().int().min(5).max(20),
    cha: z.number().int().min(5).max(20),
    orcImagesId: z.number().int(),
    userId: z.number().int()
});

export const OrcListItemSchema = z.object ({
    name: z.string().min(3),
    description: z.string().min(1),
    orcImagesId: z.number().int()
})

export const CreateOrcSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(1),
    str: z.number().int().min(5).max(20),
    dex: z.number().int().min(5).max(20),
    con: z.number().int().min(5).max(20),
    int: z.number().int().min(5).max(20),
    wis: z.number().int().min(5).max(20),
    cha: z.number().int().min(5).max(20),
    promptsCollectionId: z.number().int(),
    orcImagesId: z.number().int(),
    userId: z.number().int()
});

export const GenerateOrcSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(1),
    str: z.number().int().min(5).max(20),
    dex: z.number().int().min(5).max(20),
    con: z.number().int().min(5).max(20),
    int: z.number().int().min(5).max(20),
    wis: z.number().int().min(5).max(20),
    cha: z.number().int().min(5).max(20)
});

export type Orc = z.infer<typeof OrcSchema>;
export type SavedOrc = z.infer<typeof OrcGallerySchema>;
export type OrcListItem = z.infer<typeof OrcListItemSchema>;
export type CreateOrc = z.infer<typeof CreateOrcSchema>;
export type GenerateOrc = z.infer<typeof GenerateOrcSchema>;