import bcrypt from "bcrypt";
import {prisma} from "../utils/prisma";
import {CreateUser, User} from '../interfaces/user';

//GET functions

async function getAllUsers(): Promise<{ userId: bigint; userName: string }[]> {
    try {
        const allUsers = await prisma.user.findMany({
            select: {
                id: true,
                userName: true
            }
        });

        return allUsers.map((user) => ({
            userId: user.id,
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
            userId: userObject.id,
            userName: userObject.userName,
            emailAddress: userObject.emailAddress,
            role: userObject.role
        };
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
    }
}

//UPDATE function

async function updateUserDetails(user: User) {
    let updateUser;
    try {
        updateUser = await prisma.users.update({
            where: {
                id: user.userId,
            },
            data: {
                user_name: user.userName,
                email_address: user.emailAddress
            },
        });
    } catch (error) {
        console.log(error);
    }
    return updateUser;
}

async function updateUserPassword(user: User) {
    let updatedPassword;
    const salt = await bcrypt.genSalt();

    updatedPassword = await bcrypt.hash(user.userPassword, salt);

    try {
        updatedPassword = await prisma.user.update({
            where: {
                id: user.userId,
            },
            data: {
                userPassword: updatedPassword,
            },
        });
    } catch (error) {
        console.log(error);
    }
    return updatedPassword;
}

async function updateUserRole(user: User) {
    let updatedRole;
    try {
        updatedRole = await prisma.user.update({
            where: {
                id: user.userId,
            },
            data: {
                role: user.userRole
            },
        });
    } catch (error) {
        console.log(error);
    }
    return updatedRole;
}

//CREATE function

async function createUser(user: CreateUser) {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.userPassword, salt);

        const newUser = await prisma.user.create({
            data: {
                userName: user.userName,
                emailAddress: user.emailAddress,
                userPassword: hashedPassword,
                profile: {
                    create: {} // create and link user profile
                }
            }
        });

        const createdUser = {
            userId: newUser.id,
            userName: newUser.userName,
            emailAddress: newUser.emailAddress,
            userRole: newUser.role
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
    createUser,
    updateUserDetails,
    deleteUserById
};

export { UserService };
