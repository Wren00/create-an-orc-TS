import { Role } from '@prisma/client';

interface User {
    userId: number;
    userName: string;
    emailAddress: string;
    userPassword: string;
    availableTokens: number;
    userRole: Role;
    profileId: number;
}

interface CreateUser {
    userName: string;
    emailAddress: string;
    userPassword: string;
    availableTokens?: number;
    userRole?: Role;
}

interface UpdateUserInput {
    userId: number;
    userName?: string;
    emailAddress?: string;
    userPassword?: string;
    availableTokens?: number;
    userRole?: Role;
}

interface UpdateUserAdminInput extends UpdateUserInput {
    availableTokens?: number;
    role?: Role;
}

export { User, CreateUser, UpdateUserInput, UpdateUserAdminInput };