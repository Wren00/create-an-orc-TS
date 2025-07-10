// @ts-ignore
import {Role} from "@prisma/client";


interface User {
    userId: number;
    userName: string;
    emailAddress: string;
    userPassword: string;
    availableTokens: number;
    role: Role;
    profileId: number;
    createdAt: Date;
    updatedAt: Date;
}

interface CreateUser {
    userName: string;
    emailAddress: string;
    userPassword: string;
}

interface UpdateUser {
    userId: number;
    userName?: string;
    emailAddress?: string;
    userPassword?: string;
}

interface UpdateUserAdmin extends UpdateUser {
    availableTokens?: number;
    role?: Role;
}

export { User, CreateUser, UpdateUser, UpdateUserAdmin };