import { z } from "zod";
import {Role} from "@prisma/client";

export const UserListItemSchema = z.object({
    userName: z.string().min(3),
    emailAddress: z.string().min(1),
});

export const PublicUserSchema = z.object({
    userName: z.string().min(3),
    emailAddress: z.string().min(1),
    role: z.enum(['USER', 'VALIDUSER', 'ADMIN'])
});

export const CreateUserSchema = z.object({
    userName: z.string().min(3),
    emailAddress: z.string().min(1),
    userPassword: z.string().min(1),
});

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