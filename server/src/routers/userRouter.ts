import { Router } from "express";

import { UserController } from "../controllers/userController";

const UserRouter = Router();

console.log("user router mounted");

UserRouter.get("/user-list", UserController.getAllUsers);
UserRouter.get("/fetch-userid/:id", UserController.getUserById);
// @ts-ignore
UserRouter.get("/fetch-username", UserController.getUserByName)

UserRouter.patch("/update-user", UserController.updateUserDetails);
UserRouter.patch("/update-user-admin", UserController.updateUserAsAdmin);

UserRouter.post("/register", UserController.createUser);
UserRouter.put("/delete-user", UserController.deleteUserById);


export { UserRouter };