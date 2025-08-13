import { z } from "zod";

export const PublicPromptSchema = z.object({
   content: z.string().min(1)
})
export const CreatePromptSchema = z.object({
   content: z.string().min(1)
});

export type Prompt = z.infer<typeof PublicPromptSchema>;
export type CreatePrompt = z.infer<typeof CreatePromptSchema>;