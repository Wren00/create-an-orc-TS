import { z } from "zod";
import {Role} from "@prisma/client";

export const UserListItemSchema = z.object({
    userName: z.string().min(3),
    emailAddress: z.string().email().transform(s => s.toLowerCase()),
});

export const PublicUserSchema = z.object({
    userName: z.string().min(3),
    emailAddress: z.string().min(1),
    role: z.enum(['USER', 'VALIDUSER', 'ADMIN'])
});

export const CreateUserSchema = z.object({
    userName: z.string().min(3),
    emailAddress: z.string().email().transform(s => s.toLowerCase()),
    userPassword: z.string().min(1),
});

export const UpdateUserSchema = z.object({
    id: z.number().int(),
    userName: z.string().min(3).optional(),
    emailAddress: z.string().email().transform(s => s.toLowerCase()).optional(),
    userPassword: z.string().min(1).optional(),
});

export const UpdateUserAdminSchema = UpdateUserSchema.extend({
  availableTokens: z.number().int().min(5).max(100).optional(),
  role: z.enum(['USER', 'VALIDUSER', 'ADMIN']).optional()
})

export type UserListItem = {
    userName: string;
    emailAddress: string;
};

export type PublicUser = {
    userName: string;
    emailAddress: string;
    role: Role;
};

export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type UpdateUserAdmin = z.infer<typeof UpdateUserAdminSchema>;