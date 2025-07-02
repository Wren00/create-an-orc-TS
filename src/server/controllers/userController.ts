import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { User } from "../interfaces/user";
import { CreateUser } from "../interfaces/user";

async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await UserService.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        res.status(401).json("Cannot access database");
    }
}

async function getUserByName(req: Request, res: Response) {
    try {
        const { userName } = req.body;
        const users = await UserService.getUserByName(userName);
        return res.status(200).json(users);
    } catch (error) {
        res.status(401).json("Cannot find user name");
    }
}

async function getUserById(req: Request, res: Response) {
    try {
        const userId = parseInt(req.params["id"]);
        const user = await UserService.getUserById(userId);
        return res.status(200).json(user);
    } catch (error) {
        res.status(401).json("Cannot find user id");
    }
}

async function getUserByRole(req: Request, res: Response) {
    try {
        const { role } = req.body;
        const users = await UserService.getUserByName(userRole);
        return res.status(200).json(users);
    } catch (error) {
        res.status(401).json("Cannot find user name");
    }
}

//UPDATE functions

async function updateUserDetails(req: Request, res: Response) {
    try {
        const updateDetails: User = req.body;
        const updatedUser = await UserService.updateUserDetails(updateDetails);
        return res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json("Could not update user.");
    }
}

async function updateUserPassword(req: Request, res: Response) {
    try {
        const updatePassword: User = req.body;
        const newPassword = await UserService.updateUserPassword(updatePassword);
        return res.status(200).json(newPassword);
    } catch (error) {
        res.status(500).json("Could not update password.");
    }
}

//CREATE functions - createUser also creates a UserProfile

async function createUser(req: Request, res: Response) {
    try {
        const newUser: CreateUser = req.body;
        const createdUser = await UserService.createUser(newUser);
        return res.status(200).json(createdUser);
    } catch (error) {
        res.status(500).json("Could not create user.");
    }
}

//DELETE functions

async function deleteUserById(req: Request, res: Response)    {
    const { userId: userId } = req.body;
    console.log(userId);
    const deletedUser = await UserService.deleteUserById(userId);
    if (!deletedUser)  {
        return res.status(500).json("Cannot delete id");
    }
    return res.status(200).json(deletedUser);
}

const UserController = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserDetails,
    updateUserPassword,
    deleteUserById
};

export { UserController };