import { z } from "zod";

export const CreateUserSchema = z.object({
    userName: z.string().min(3),
    emailAddress: z.string().min(1),
    userPassword: z.string().min(1),
});


export type CreateUser = z.infer<typeof CreateUserSchema>;