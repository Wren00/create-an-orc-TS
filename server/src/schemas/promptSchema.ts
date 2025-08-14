import { z } from "zod";

export const PromptSchema = z.object({
   id: z.number().int(),
   content: z.string().min(1),
});

export const PublicPromptSchema = z.object({
   content: z.string().min(1)
})

export const CreatePromptSchema = z.object({
   content: z.string().min(1)
});

export const UpdatePromptSchema = z.object({
   id: z.number().int(),
   content: z.string().min(1),
});

export type Prompt = z.infer<typeof PromptSchema>;
export type PublicPrompt = z.infer<typeof PublicPromptSchema>;
export type CreatePrompt = z.infer<typeof CreatePromptSchema>;
export type UpdatePrompt = z.infer<typeof UpdatePromptSchema>;