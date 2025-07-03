import { Router } from "express";

import { UserController } from "../controllers/userController";

const UserRouter = Router();

//PUBLIC endpoints
console.log("UserRouter registered");

UserRouter.get("/getAllUsers", UserController.getAllUsers);

// @ts-ignore
UserRouter.get("/getUserByName", UserController.getUserByName)
UserRouter.get("/getUserById/:id", UserController.getUserById);

//PRIVATE endpoints

UserRouter.put("/updateUserDetails", UserController.updateUserDetails);
UserRouter.put("/updateAdminUserDetails", UserController.updateUserAsAdmin);
UserRouter.post("/createUser", UserController.createUser);
UserRouter.put("/deleteUserById", UserController.deleteUserById);


export { UserRouter };