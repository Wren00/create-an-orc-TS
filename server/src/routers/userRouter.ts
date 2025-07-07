import { Router } from "express";

import { UserController } from "../controllers/userController";

const UserRouter = Router();

console.log("user router mounted");

UserRouter.get("/", UserController.getAllUsers);
UserRouter.get("/name", UserController.getUserByName);

/**
 * @swagger
 * /users/:id:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns a single user retrieved by id.
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         description: The id of the requested user.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1,
 *                           "userName": "testUser",
 *                           "emailAddress": "email@example.com",
 *                           "role": "USER"
 *       204:
 *         description: No content
 */
UserRouter.get("/:id", UserController.getUserById);

/**
 * @swagger
 * /users/:userId/orcs
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns an array of orcs linked by a userId
 *         parameters:
 *       - name: userId
 *         in: path
 *         type: integer
 *         description: The userId that links a returned gallery of orcs.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1,
 *                            "name": "Hek",
 *                            "description": "An unfortunate Orc.",
 *                            "promptsCollectionId": "1",
 *                            "orcImagesId": "1",
 *                            "userId": "1"
 *                           {"id": 3,
 *                            "name": "Hok",
 *                            "description": "An angry Orc.",
 *                            "promptsCollectionId": "3",
 *                            "orcImagesId": "3",
 *                            "userId": "1" }]'
 *       204:
 *         description: No content
 */
UserRouter.get("/:userId/orcs", UserController.getOrcsByUserId);


UserRouter.patch("/", UserController.updateUserDetails);
UserRouter.patch("/", UserController.updateUserAsAdmin);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [
 *       users
 *     ]
 *     summary: Creates a user account.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 required: true
 *                 description: The userName for the user.
 *               emailAddress:
 *                 type: string
 *                 required: true
 *                 description: The email address of the user.
 *               userPassword:
 *                 type: string
 *                 required: true
 *                 description: The password for the user.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: User registered.
 */
UserRouter.post("/", UserController.createUser);

/**
 * @swagger
 * /users
 *   delete:
 *     tags: [
 *       users
 *     ]
 *     summary: Deletes an existing user.
 *      requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   required: true
 *                   description: The id of the user to be deleted.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: User Deleted
 */
UserRouter.delete("/", UserController.deleteUserById);


export { UserRouter };