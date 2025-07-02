import express from "express";
import { UserController } from "../controllers/userController";

const UserRouter = express.Router();

//PUBLIC endpoints

UserRouter.get("/getAllUsers", UserController.getAllUsers);
UserRouter.get("/getUserById/:id", UserController.getUserById);
UserRouter.get("/getUserByName/:name", UserController.getUserByName);


//PRIVATE endpoints

UserRouter.put("/updateUserDetails", UserController.updateUserDetails);
UserRouter.put("/updateAdminUserDetails", UserController.updateUserAsAdmin);
UserRouter.post("/createUser", UserController.createUser);
UserRouter.put("/deleteUserById", UserController.deleteUserById);

export { UserRouter };