import express from "express";
import { PromptController} from "../controllers/promptController";
import {validate} from "express-validation";
import {validationSchemas} from "../utils/validationSchemas";

const PromptRouter = express.Router();

console.log("prompt router mounted");

// these api routes should not be accessible directly from the browser

/**
 * @swagger
 * /prompts:
 *   get:
 *     tags: [
 *       prompts
 *     ]
 *     summary: Returns a JSON array of all saved prompts.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1,
 *                            "content": "happy"
 *                            },
 *                           { "id": 2,
 *                            "content": "sad"
 *                            },
 *                           { "id": 3,
 *                             "content": "old"}]'
 *       204:
 *         description: No content
 */
PromptRouter.get("/", PromptController.getAllPrompts);

/**
 * @swagger
 * /prompts/:id:
 *   get:
 *     tags: [
 *       prompts
 *     ]
 *     summary: Returns a single prompt retrieved from the id
 *         parameters:
 *       - name: promptId
 *         in: path
 *         type: integer
 *         description: The promptId used to retrieve the prompt.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1,
 *                           "content": "happy"
 *                          }'
 *       204:
 *         description: No content
 */

PromptRouter.get("/:id", PromptController.getPromptById);

/**
 * @swagger
 * /prompts:
 *   put:
 *     tags: [
 *       prompts
 *     ]
 *     summary: Updates content of a prompt
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               promptId:
 *                 type: number
 *                 required: true
 *                 description: The prompt id to be updated.
 *               content:
 *                 type: string
 *                 required: true
 *                 description: The content value for the prompt.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Prompt updated.
 */
PromptRouter.patch("/", validate(validationSchemas.updatePrompt), PromptController.updatePrompt);

/**
 * @swagger
 * /prompts:
 *   post:
 *     tags: [
 *       prompts
 *     ]
 *     summary: Creates a prompt
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 required: true
 *                 description: The content value for the prompt.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Prompt created.
 */
PromptRouter.post("/", validate(validationSchemas.createPrompt), PromptController.createPrompt);

/**
 * @swagger
 * /prompts:
 *   delete:
 *     tags: [
 *       prompts
 *     ]
 *     summary: Deletes an existing prompt by the id.
 *      requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                   type: integer
 *                   required: true
 *                   description: The id of the prompt to be deleted.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Prompt Deleted
 */
PromptRouter.delete("/", PromptController.deletePromptById);

export { PromptRouter };