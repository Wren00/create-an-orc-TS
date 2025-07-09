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