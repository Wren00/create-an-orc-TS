import bcrypt from "bcrypt";
import {prisma} from "../utils/prisma";
import {CreateUser, PublicUser, UpdateUser, UpdateUserAdmin} from '../../../common/interfaces/user';
import {removeUndefined} from "../utils/dataUtil";
import {User} from "@prisma/client";

//GET functions

async function getAllUsers(): Promise<PublicUser[]> {
    try {
        const allUsers = await prisma.user.findMany({
            select: {
                id: true,
                userName: true,
                emailAddress: true
            },
        });
        const publicUserSearch: PublicUser[] = allUsers.map(user => ({
            userId: user.id, // 🔁 rename here
            userName: user.userName,
            emailAddress: user.emailAddress
        }));

        return publicUserSearch;
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
        if (!userObject) {
            throw new Error(`User with ID ${userId} not found`);
        }
        return mapUserToPublicUser(userObject);
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
                id: true,
                userName: true,
                emailAddress: true
            },
        });

        const publicUserSearch: PublicUser[] = searchArray.map(user => ({
            userId: user.id, // 🔁 rename here
            userName: user.userName,
            emailAddress: user.emailAddress
        }));

        return publicUserSearch;
    } catch (error) {
        console.error("Error fetching user by name: ", error);
        throw error;
    }
}

async function getOrcsByUserId(userId: number): Promise<{ orcId: number; name: string; orcImagesId: number }[]> {
    try {
        const orcsByUser = await prisma.orc.findMany({
            where: { userId: userId },
        });
        return  orcsByUser.map((orc: { id: any; name: any; description: any; orcImagesId: any; }): { orcId: number; name: string, description: string, orcImagesId: number } => ({
            orcId: orc.id,
            name: orc.name,
            description: orc.description,
            orcImagesId: orc.orcImagesId
        }));
    } catch (error) {
        console.error("Unable to fetch orcs by user id.", error);
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

        return updatedUser;
    } catch (error) {
        console.error("Error updating user: ", error);
        throw error;
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
        await prisma.user.update({
            where: {id: input.userId},
            data: removeUndefined(dataToUpdate),
        });

        return "User has been successfully updated: " + dataToUpdate.toString();

    } catch (error) {
        console.error("Error updating user: ", error);
        throw error;
    }
}

//CREATE function

async function createUser(user: CreateUser): Promise<String> {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.userPassword, salt);

        const profile = await prisma.userProfile.create({ data: {} });

        const newUser : CreateUser = await prisma.user.create({
            data: {
                userName: user.userName,
                emailAddress: user.emailAddress,
                userPassword: hashedPassword,
                profileId: profile.id
            }
        });
        const createdUser = {
            userName: newUser.userName,
            emailAddress: newUser.emailAddress
        };
        return "User successfully registered: " + createdUser.userName;
    } catch(error) {
        throw Error("Error creating user.");
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
        return deletedUser;
    } catch (error) {
        throw Error("Error deleting user account.");
    }
}

function mapUserToPublicUser (user: User) : PublicUser {
    return {
        userId: user.id,
        userName: user.userName,
        emailAddress: user.emailAddress,
    };
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
