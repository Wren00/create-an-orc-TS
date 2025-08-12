import bcrypt from "bcrypt";
import {prisma} from "../utils/prisma";
import {UpdateUser, UpdateUserAdmin} from '../../../common/interfaces/user';
import {removeUndefined} from "../../../common/utils/dataUtil";
import {UserListItem, CreateUser, PublicUser, UserListItemSchema, CreateUserSchema, PublicUserSchema} from "../schemas/userSchema";

//GET functions

export async function getAllUsers(): Promise<UserListItem[]> {
    const rows = await prisma.user.findMany({
        select: { userName: true, emailAddress: true },
    });
    const data = rows.map((r) => ({ userName: r.userName, emailAddress: r.emailAddress }));

    const parsed = UserListItemSchema.array().parse(data);
    // casting to prevent consistent errors with Prisma/Zod validation checking
    return parsed as UserListItem[];
}

export async function getUserById(userId: number): Promise<PublicUser> {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { userName: true, emailAddress: true, role: true }
        });

        const parsedUser = PublicUserSchema.safeParse(user);
        if (!parsedUser.success) {
            console.error("Invalid user Data:", parsedUser.error.issues);
            throw new Error("Unable to parse user");
        }
        return parsedUser.data;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
    }
}

async function getUserByName(nameSearch: string): Promise<PublicUser[]> {
    let searchArray= [];

    try {
        searchArray = await prisma.user.findMany({
            where: {
                userName: {
                    contains: nameSearch,
                    mode: "insensitive",
                },
            },
            select: {
                userName: true,
                emailAddress: true,
                role: true
            },
        });

        return searchArray.map<PublicUser>(user => ({
            userName: user.userName,
            emailAddress: user.emailAddress,
            role: user.role
        }));

    } catch (error) {
        console.error("Error fetching user by name: ", error);
        throw error;
    }
}

async function getOrcsByUserId(id: number): Promise<{ name: string; str: number; dex: number; con: number; int: number; wis: number; cha: number; orcImagesId: number; userId: number;  }[]> {
    try {
        const orcsByUser = await prisma.orc.findMany({
            where: { userId: id },
        });
        return  orcsByUser.map((orc: { name: any; description: any; str: any; dex: any; con: any; int: any; wis: any; cha: any; orcImagesId: any; userId: any; }): { name: string, description: string, str: number, dex: number, con: number, int: number, wis: number, cha: number, orcImagesId: number, userId: number } => ({
            name: orc.name,
            description: orc.description,
            str: orc.str,
            dex: orc.dex,
            con: orc.con,
            int: orc.int,
            wis: orc.wis,
            cha: orc.cha,
            orcImagesId: orc.orcImagesId,
            userId: orc.userId
        }));
    } catch (error) {
        console.error("Unable to fetch orc gallery: ", error);
        throw error;
    }
}


//UPDATE function

async function updateUserDetails(input: UpdateUser) {
    try {
        const dataToUpdate: Record<string, any> = {
            userName: input.userName,
            emailAddress: input.emailAddress,
            userPassword: input.userPassword
        };
        if (input.userPassword) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(input.userPassword, salt);
            dataToUpdate.userPassword = hashedPassword;
        }
        const updatedUser = await prisma.user.update({
            where: { id: input.userId },
            data: removeUndefined(dataToUpdate),
        });
        return `User has been successfully updated: ${updatedUser.userName}`
    } catch (error) {
        console.error("Prisma error on updating user:", error);
        throw new Error("Failed to update user");
    }
}

export async function updateUserAsAdmin(input: UpdateUserAdmin) {
    try {
        const dataToUpdate: Record<string, any> = {
            userName: input.userName,
            emailAddress: input.emailAddress,
            availableTokens: input.availableTokens,
            role: input.role
        };
        if (input.userPassword) {
            const salt = await bcrypt.genSalt();
            dataToUpdate.userPassword = await bcrypt.hash(input.userPassword, salt);
        }
        const updatedUser = await prisma.user.update({
            where: { id: input.userId },
            data: removeUndefined(dataToUpdate),
        });

        return `User has been successfully updated: ${updatedUser.userName}`;

    } catch (error) {
        console.error("Prisma error on updating user:", error);
        throw new Error("Failed to update user");
    }
}

//CREATE function

async function createUser(input: CreateUser): Promise<String> {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(input.userPassword, salt);

        const profile = await prisma.userProfile.create({ data: {} });

        const newUser : CreateUser = await prisma.user.create({
            data: {
                userName: input.userName,
                emailAddress: input.emailAddress,
                userPassword: hashedPassword,
                profileId: profile.id
            }
        });
        const createdUser = {
            userName: newUser.userName,
            emailAddress: newUser.emailAddress
        };
        return `User successfully registered: ${createdUser.userName}`;
    } catch(error) {
        console.error("Prisma error on creating user:", error);
        throw new Error("Failed to create user.");
    }
}

//DELETE function

async function deleteUserById(userId: number) {

    let deletedUser;

    try {
        deletedUser = await prisma.user.delete({
            where: {
                id: userId,
            },
        });
        return `User successfully deleted: ${deletedUser.userName}`
    } catch (error) {
        console.error("Prisma error on deleting user:", error);
        throw new Error("Failed to delete user.");
    }

}


const UserService = {
    getAllUsers,
    getUserById,
    getUserByName,
    getOrcsByUserId,
    createUser,
    updateUserDetails,
    updateUserAsAdmin,
    deleteUserById
};

export { UserService };
