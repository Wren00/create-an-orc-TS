import {RequestHandler} from "express";
import { UserService } from "../services/userService";
import { CreateUser } from "../../../common/interfaces/user";
import {PublicUser, UpdateUser, UpdateUserAdmin, UserListItem} from "../schemas/userSchema";
import {SavedOrc} from "../schemas/orcSchema";

export const getAllUsers: RequestHandler<
    {},
    UserListItem[] | { message: string }
> = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching user list:", error);
        res.status(500).json({message: "Could not retrieve user list."});
    }
}

export const getUserByName: RequestHandler<
    {name : string},
    PublicUser[] | { message: string }
> = async (req, res) => {
    try {
        const userName = String(req.params["name"]);
        const users = await UserService.getUserByName(userName);
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching user list:", error);
        res.status(500).json({message: "Could not retrieve user list."});
    }
}


const getUserById: RequestHandler<
    {id: string},
    PublicUser | { message: string }
> = async (req, res) => {
    try {
        const userId  = Number(req.params["id"]);
        const user = await UserService.getUserById(userId)
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user by id: ", error);
        res.status(500).json({ message: "Could not retrieve user by id."});
    }
}

const getOrcsByUserId: RequestHandler<
    {id: string},
    SavedOrc[] | { message: string }
> = async (req, res) => {
    try {
        const userId  = Number(req.params["id"]);
        const orcs = await UserService.getOrcsByUserId(userId)
        res.status(200).json(orcs);
    } catch (error) {
        console.error("Error fetching user by id: ", error);
        res.status(500).json({ message: "Could not retrieve user by id."});
    }
}

//UPDATE functions

const updateUserDetails: RequestHandler<
    {id : string},
    string,
    UpdateUser
> = async (req, res) => {
    try {
        const updateDetails: UpdateUser = req.body;
        updateDetails.id = Number(req.params["id"]);
        const updatedUser = await UserService.updateUserDetails(updateDetails);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json( "Could not update user.");
    }
}

// for updating available tokens and role

const updateUserAsAdmin: RequestHandler<
    {id : string},
    string,
    UpdateUserAdmin
> = async (req, res) => {
    try {
        const updateDetails: UpdateUserAdmin = req.body;
        updateDetails.id = Number(req.params["id"]);
        const updatedUser = await UserService.updateUserAsAdmin(updateDetails);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json( "Could not update user.");
    }
}


//CREATE functions - createUser also creates a UserProfile

const createUser : RequestHandler<
    {},
    string,
    CreateUser
> = async (req, res) => {
    try {
        const newUser: CreateUser = req.body;
        const createdUser = await UserService.createUser(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        console.error("Error creating user account: ", error);
        res.status(500).json("Could not create user.");
    }
}

//DELETE functions

export const deleteUserById : RequestHandler<
    { id: number },
    { message: string }
> = async (req, res) => {
    try {
        const userId = Number(req.params["id"]);
        const deletedUserResult = await UserService.deleteUserById(userId)
        res.status(200).json({message: deletedUserResult});
    } catch (error) {
        console.error("Error deleting user account: ", error);
        res.status(500).json({message: "Could not delete user account."});
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