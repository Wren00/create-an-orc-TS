import { z } from "zod";

export const CreatePromptSchema = z.object({
   content: z.string().min(1),
});


export type CreatePrompt = z.infer<typeof CreatePromptSchema>;