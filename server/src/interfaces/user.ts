// @ts-ignore
import {Role} from "@prisma/client";


interface User {
    userId: number;
    userName: string;
    emailAddress: string;
    userPassword: string;
    availableTokens: number;
    userRole: Role;
    profileId: number;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}

interface CreateUser {
    userName: string;
    emailAddress: string;
    userPassword: string;
}

interface UpdateUserInput {
    userId: number;
    userName?: string;
    emailAddress?: string;
    userPassword?: string;
}

interface UpdateUserAdminInput extends UpdateUserInput {
    availableTokens?: number;
    role?: Role;
}

export { User, CreateUser, UpdateUserInput, UpdateUserAdminInput };