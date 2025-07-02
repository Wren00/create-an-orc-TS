import { Role } from '@prisma/client';

interface User {
    userId: number;
    userName: string;
    emailAddress: string;
    userPassword: string;
    availableTokens: number;
    userRole: Role;
}

interface CreateUser {
    userName: string;
    emailAddress: string;
    userPassword: string;
}

interface UpdateUser {
    userName?: string;
    emailAddress?: string;
    userPassword?: string;
    availableTokens?: number;
    userRole?: Role;
}

export { User, CreateUser };