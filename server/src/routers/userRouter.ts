import { Router } from "express";

import { UserController } from "../controllers/userController";
import {validate} from "express-validation";
import {validationSchemas} from "../utils/validationSchemas";

const UserRouter = Router();

console.log("user router mounted");

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns an array of userIds and userNames for registered users
 *         parameters:
 *       - name: userId
 *         in: path
 *         type: integer
 *         description: An array of users with userId/userName
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1,
 *                            "userName": "testadmin"
 *                           {"id": 3,
 *                            "userName": "newUser"}]'
 *       204:
 *         description: No content
 */
UserRouter.route("/").get(UserController.getAllUsers);

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns a user searched by their userName
 *         parameters:
 *       - name: userName
 *         in: path
 *         type: string
 *         description: All users with userNames matching the requested value
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1,
 *                            "userName": "testadmin"
 *                           {"id": 3,
 *                            "userName": "testuser"}]'
 *       204:
 *         description: No content
 */
UserRouter.route("/").get(UserController.getUserByName);

/**
 * @swagger
 * /users/{id}
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
 *                          }'
 *       204:
 *         description: No content
 */
UserRouter.get("/:id", UserController.getUserById);

/**
 * @swagger
 * /users/{id}/orcs:
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

/**
 * @swagger
 * /users:
 *   patch:
 *     tags: [
 *       users
 *     ]
 *     summary: Updates an existing user with optional fields.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                  type: integer
 *                  required: true
 *                  description: the users id
 *               emailAddress:
 *                 type: string
 *                 required: false
 *                 description: The email for the user
 *               userName:
 *                 type: string
 *                 required: false
 *                 description: The username for the user
 *               userPassword:
 *                 type: string
 *                 required: false
 *                 description: The password for the user
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       204:
 *         description: User Updated
 */
UserRouter.patch("/", validate(validationSchemas.updateUser), UserController.updateUserDetails);

/**
 * @swagger
 * /users:
 *   patch:
 *     tags: [
 *       users
 *     ]
 *     summary: Updates an existing user including admin restricted fields.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                  type: integer
 *                  required: true
 *                  description: the users id
 *               emailAddress:
 *                 type: string
 *                 required: false
 *                 description: The email for the user
 *               userName:
 *                 type: string
 *                 required: false
 *                 description: The username for the user
 *               userPassword:
 *                 type: string
 *                 required: false
 *                 description: The password for the user
 *               availableTokens:
 *                  type: integer
 *                  required: false
 *                  description: The number of tokens for AI generation requests
 *               role:
 *                  type: Role
 *                  required: false
 *                  description: The status of the user in the app
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       204:
 *         description: User Updated
 */
UserRouter.patch("/", validate(validationSchemas.updateUserAsAdmin), UserController.updateUserAsAdmin);

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
UserRouter.post("/", validate(validationSchemas.createUser), UserController.createUser);

/**
 * @swagger
 * /users/{id}
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Deletes a user by their id.
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         description: The id of the user to be deleted.
 * *     responses:
 *  *       400:
 *  *         description: Bad Request
 *  *       201:
 *  *         description: Character Deleted
 */
UserRouter.delete("/:id", UserController.deleteUserById);


export { UserRouter };