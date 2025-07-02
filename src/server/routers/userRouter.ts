import express from "express";
import { UserController } from "../controllers/userController";

const UserRouter = express.Router();

//PUBLIC endpoints

UserRouter.get("/getAllUsers", UserController.getAllUsers);
UserRouter.get("/getUserById/:id", UserController.getUserById);

//PRIVATE endpoints

UserRouter.get("/getUserByName", UserController.getUserByName);
UserRouter.get("/getProfileByUserId/:id", UserController.getProfileByUserId);
UserRouter.get("/getUserByEmail", UserController.getUserByEmail);
UserRouter.get("/getUserByLevel", UserController.getUserByLevel);
UserRouter.get("/getTrustedUsers", UserController.getTrustedUsers);
UserRouter.put("/updateUserDetails", UserController.updateUserDetails);
UserRouter.put("/updateUserPassword", UserController.updateUserPassword);
UserRouter.put("/updateUserProfile", UserController.updateUserProfile);
UserRouter.post("/createUser", UserController.createUser);
UserRouter.put("/deleteUserById", UserController.deleteUserById);

export { UserRouter };