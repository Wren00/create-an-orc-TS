import {NextFunction, Request, Response} from "express";
import { UserService } from "../services/userService";
import { User } from "../interfaces/user";
import { CreateUser } from "../interfaces/user";

const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error); // or handle directly
    }
};

const getUserByName = async (req: Request, res: Response): Promise<Response> => {
    try {
        console.log("HIT getUserByName controller");
        const userName = req.query.userName as string;

        if (!userName) {
            return res.status(400).json({ message: "Missing 'userName' query parameter" });
        }

        const users = await UserService.getUserByName(userName);
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching user by name:", error);
        return res.status(500).json({ message: "Cannot find user name" });
    }
};

const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = Number(req.params["id"]);
        const user = await UserService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json("Cannot find user id");
    }
}

//UPDATE functions

const updateUserDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("updating user");
        const updateDetails: User = req.body;
        const updatedUser = await UserService.updateUserDetails(updateDetails);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json("Could not update user.");
    }
}

// for updating available tokens and role

const updateUserAsAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const updateDetailsAdmin: User = req.body;
        const updatedUser = await UserService.updateUserDetails(updateDetailsAdmin);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json("Could not update user.");
    }
}

//CREATE functions - createUser also creates a UserProfile

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("new user");
        const newUser: CreateUser = req.body;
        const createdUser = await UserService.createUser(newUser);
        res.status(200).json(createdUser);
    } catch (error) {
        res.status(500).json("Could not create user.");
    }
}

//DELETE functions

const deleteUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { userId: userId } = req.body;
    console.log(userId);
    const deletedUser = await UserService.deleteUserById(userId);
    if (!deletedUser)  {
        res.status(500).json("Cannot delete id");
    }
    res.status(200).json(deletedUser);
}

const UserController = {
    getAllUsers,
    getUserById,
    getUserByName,
    createUser,
    updateUserDetails,
    updateUserAsAdmin,
    deleteUserById
};

export { UserController };