interface User {
    userId: number;
    userName: string;
    emailAddress: string;
    userPassword: string;
    availableTokens: number;
    role: number;
}

interface CreateUser {
    userName: string;
    emailAddress: string;
    userPassword: string;
}

export type { User, CreateUser };