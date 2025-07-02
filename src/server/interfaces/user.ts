import { Role } from '@prisma/client';

interface User {
    userId: bigint;
    userName: string;
    emailAddress: string;
    userPassword: string;
    availableTokens: number;
    userRole: Role;
    profileId: bigint;
}

interface CreateUser {
    userName: string;
    emailAddress: string;
    userPassword: string;
}

interface UpdateUserInput {
    userId: bigint;
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