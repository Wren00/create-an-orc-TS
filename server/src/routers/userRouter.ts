import {Router} from "express";

import {UserController} from "../controllers/userController";
import {check} from "express-validator";
import {validation} from "../utils/validation";

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
 * /users/name:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns a user or array of users searched by their userName
 *         requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                  type: string
 *                  required: true
 *                  description: the users name that contain or match the request
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
UserRouter.route("/name").get(UserController.getUserByName);

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
 *                           "emailAddress": "email@example.com"
 *                          }'
 *       204:
 *         description: No content
 */
UserRouter.route("/:id").get(UserController.getUserById);

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
UserRouter.route("/:userId/orcs").get(UserController.getOrcsByUserId);

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
UserRouter.route("/")
    .patch(
        [    check("userName")
            .isLength({ min: 3 })
            .withMessage("the username must have a minimum length of 3")
            .trim(),
            check("emailAddress")
                .optional({nullable: true})
                .isLength({ min: 3 })
                .withMessage("the email address must have minimum length of 3")
                .isEmail()
                .withMessage("the email must be in a valid email format")
                .trim(),
            check("userPassword")
                .optional({nullable: true})
                .isLength({ min: 8, max: 15 })
                .withMessage("the password should have min and max length between 8-15")
                .matches(/\d/)
                .withMessage("the password should have at least one number")
                .matches(/[!@#$%^&*(),.?":{}|<>]/)
                .withMessage("the password should have at least one special character")
        ],
        validation.validate, UserController.updateUserDetails);

UserRouter.route("/")
    .patch(
        [    check("userName")
            .isLength({ min: 3 })
            .withMessage("the username must have a minimum length of 3")
            .trim(),
            check("emailAddress")
                .isLength({ min: 3 })
                .optional({nullable: true})
                .withMessage("the email address must have minimum length of 3")
                .isEmail()
                .withMessage("the email must be in a valid email format")
                .trim(),
            check("userPassword")
                .isLength({ min: 8, max: 15 })
                .optional({nullable: true})
                .withMessage("the password should have min and max length between 8-15")
                .matches(/\d/)
                .withMessage("the password should have at least one number")
                .matches(/[!@#$%^&*(),.?":{}|<>]/)
                .withMessage("the password should have at least one special character"),
            check("availableTokens")
                .optional({nullable: true})
                .isInt({min:0, max:50})
                .withMessage("Tokens must be an integer between 0-100"),
        ],
        validation.validate, UserController.updateUserAsAdmin);

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
UserRouter.route("/")
    .patch(
        [    check("userName")
                .isLength({ min: 3 })
                .withMessage("the username must have minimum length of 3")
                .trim(),
            check("emailAddress")
                .isLength({ min: 3 })
                .withMessage("the email address must have minimum length of 3")
                .isEmail()
                .withMessage("the email must be in a valid email format")
                .trim(),
            check("userPassword")
                .isLength({ min: 8, max: 15 })
                .withMessage("the password should have min and max length between 8-15")
                .matches(/\d/)
                .withMessage("the password should have at least one number")
                .matches(/[!@#$%^&*(),.?":{}|<>]/)
                .withMessage("the password should have at least one special character"),
            check("availableTokens")
                .isNumeric()
                .withMessage("the value must be a number")
        ],
        validation.validate, UserController.updateUserAsAdmin);

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
UserRouter.route("/")
    .post(
        [    check("userName")
                .isLength({ min: 3 })
                .withMessage("the username must have minimum length of 3")
                .trim(),
            check("emailAddress")
                .isLength({ min: 3 })
                .withMessage("the email address must have minimum length of 3")
                .isEmail()
                .withMessage("the email must be in a valid email format")
                .trim(),
            check("userPassword")
                .isLength({ min: 8, max: 15 })
                .withMessage("the password should have min and max length between 8-15")
                .matches(/\d/)
                .withMessage("the password should have at least one number")
                .matches(/[!@#$%^&*(),.?":{}|<>]/)
                .withMessage("the password should have at least one special character"),
        ],
        validation.validate, UserController.createUser);

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
UserRouter.route("/:id").delete(UserController.deleteUserById);


export { UserRouter };