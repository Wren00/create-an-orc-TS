// @ts-ignore
import {Role} from "@prisma/client";


export interface User {
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

export interface PublicUser {
    userId: number;
    userName: string;
    emailAddress: string;
}

export interface CreateUser {
    userName: string;
    emailAddress: string;
    userPassword: string;
}

export interface UpdateUser {
    userId: number;
    userName?: string;
    emailAddress?: string;
    userPassword?: string;
}

export interface UpdateUserAdmin extends UpdateUser {
    availableTokens?: number;
    role?: Role;
}