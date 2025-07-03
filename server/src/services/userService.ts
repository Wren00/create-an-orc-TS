import bcrypt from "bcrypt";
import {prisma} from "../utils/prisma";
import {CreateUser, UpdateUserAdminInput, UpdateUserInput, User} from '../interfaces/user';
import {removeUndefined} from "../utils/dataUtil";

//GET functions

async function getAllUsers(): Promise<{ userId: string; userName: string }[]> {
    try {
        const allUsers = await prisma.user.findMany({
            select: {
                id: true,
                userName: true
            }
        });
        return  allUsers.map((user: { id: { toString: () => any; }; userName: any; }): { userId: string; userName: string } => ({
            userId: user.id.toString(),
            userName: user.userName
        }));
    } catch (error) {
        console.error("Unable to fetch users.", error);
        throw error;
    }
}

async function getUserById(userId: number) {
    try {
        const userObject = await prisma.user.findUnique({
            where: { id: userId },
        });
        // error check if id could not be found, nothing is returned
        if (!userObject) {
            throw new Error(`User with ID ${userId} not found`);
        }

        return {
            userId: userObject.id.toString(),
            userName: userObject.userName,
            emailAddress: userObject.emailAddress,
            role: userObject.role
        };
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
    }
}

async function getUserByName(nameSearch: string): Promise<User[]> {
    let userArray = [];

    try {
        userArray = await prisma.user.findMany({
            where: {
                userName: {
                    contains: nameSearch,
                    mode: "insensitive",
                },
            },
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }

    return userArray.map((x:any) => ({
        userId: x.id,
        userName: x.userName,
        emailAddress: x.emailAddress,
        userPassword: x.userPassword,
        availableTokens: x.availableTokens,
        userRole: x.role,
        profileId: x.profileId,
    }));
}


//UPDATE function

async function updateUserDetails(input: UpdateUserInput) {
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

        return updatedUser;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

export async function updateUserAsAdmin(input: UpdateUserAdminInput) {
    try {
        const dataToUpdate: Record<string, any> = {
            userName: input.userName,
            emailAddress: input.emailAddress,
            availableTokens: input.availableTokens,
            role: input.role,
        };

        if (input.userPassword) {
            const salt = await bcrypt.genSalt();
            dataToUpdate.userPassword = await bcrypt.hash(input.userPassword, salt);
        }

        const updatedUser = await prisma.user.update({
            where: { id: input.userId },
            data: removeUndefined(dataToUpdate),
        });

        return updatedUser;
    } catch (error) {
        console.error("Admin user update failed:", error);
        throw error;
    }
}

//CREATE function

async function createUser(user: CreateUser) {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.userPassword, salt);

        const profile = await prisma.userProfile.create({ data: {} });

        console.log(profile.id);
        // profile id updated correctly from already submitted data starts at 3

        const newUser = await prisma.user.create({
            data: {
                userName: user.userName,
                emailAddress: user.emailAddress,
                userPassword: hashedPassword,
                profileId: profile.id
            }
        });

        const createdUser = {
            userId: newUser.id,
            userName: newUser.userName,
            emailAddress: newUser.emailAddress
        };
        return createdUser.userName;
    } catch(error) {
        throw Error("Cannot create user");
    }
}

//DELETE function

async function deleteUserById(userId: number) {
    let deletedUser;
    try {
        deletedUser = await prisma.user.delete({
            where: {
                id: userId
            },
        });
    } catch (error) {
        console.log(error);
    }
    return deletedUser;
}

const UserService = {
    getAllUsers,
    getUserById,
    getUserByName,
    createUser,
    updateUserDetails,
    updateUserAsAdmin,
    deleteUserById
};

export { UserService };
