import { Router } from "express";

import { UserController } from "../controllers/userController";

const UserRouter = Router();

console.log("user router mounted");

UserRouter.get("/", UserController.getAllUsers);
UserRouter.get("/name", UserController.getUserByName);
UserRouter.get("/:id", UserController.getUserById);

UserRouter.patch("/update", UserController.updateUserDetails);
UserRouter.patch("/update-admin", UserController.updateUserAsAdmin);

UserRouter.post("/register", UserController.createUser);
UserRouter.delete("/delete", UserController.deleteUserById);


export { UserRouter };