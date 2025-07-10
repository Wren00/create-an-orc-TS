import {Request, Response} from "express";
import { UserService } from "../services/userService";
import { User } from "../../../common/interfaces/user";
import { CreateUser } from "../../../common/interfaces/user";

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching user list: ", error);
        res.status(500).json({ message: "Could not retrieve user list."});
    }
};

const getUserByName = async (req: Request, res: Response): Promise<void> => {
    try {
        const userName = req.body.userName
        const users = await UserService.getUserByName(userName);
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching user by name: ", error);
        res.status(500).json({ message: "Could not find user name."});
    }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.params["id"]);
        const user = await UserService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user id: ", error);
        res.status(500).json({ message: "Could not find user id."});
    }
}

const getOrcsByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.params["user_id"]);
        const orcs = await UserService.getOrcsByUserId(userId);
        res.status(200).json(orcs);
    } catch (error) {
        console.error("Error fetching orcs by user: ", error);
        res.status(500).json({ message: "Could not retrieve orcs by user id."});
    }
}

//UPDATE functions

const updateUserDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const updateDetails: User = req.body;
        const updatedUser = await UserService.updateUserDetails(updateDetails);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ message: "Could not update user."});
    }
}

// for updating available tokens and role

const updateUserAsAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const updateDetailsAdmin: User = req.body;
        const updatedUser = await UserService.updateUserDetails(updateDetailsAdmin);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({ message: "Could not update user."});
    }
}

//CREATE functions - createUser also creates a UserProfile

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser: CreateUser = req.body;
        const createdUser = await UserService.createUser(newUser);
        res.status(200).json(createdUser);
    } catch (error) {
        console.error("Error creating user account: ", error);
        res.status(500).json({ message: "Could not create user."});
    }
}

//DELETE functions

const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.params["id"]);
        const deletedUser = await UserService.deleteUserById(userId);
        res.status(200).json(deletedUser);
    } catch (error) {
        console.error("Error deleting user account: ");
        res.status(500).json({ message: "Could not delete user.", error});
    }
}

const UserController = {
    getAllUsers,
    getUserById,
    getUserByName,
    getOrcsByUserId,
    createUser,
    updateUserDetails,
    updateUserAsAdmin,
    deleteUserById
};

export { UserController };