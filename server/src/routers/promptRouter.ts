import express from "express";
import { PromptController} from "../controllers/promptController";

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
PromptRouter.route("/").get(PromptController.getAllPrompts);

/**
 * @swagger
 * /prompts/:id:
 *   get:
 *     tags: [
 *       prompts
 *     ]
 *     summary: Returns a single prompt retrieved from the id
 *         parameters:
 *       - name: id
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

PromptRouter.route("/:id").get(PromptController.getPromptById);

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
PromptRouter.route("/").patch(PromptController.updatePrompt);

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
PromptRouter.route("/").post(PromptController.createPrompt);

/**
 * @swagger
 * /prompts/:id:
 *   delete:
 *     tags: [
 *       prompts
 *     ]
 *     summary: Deletes a prompt by id
 *         parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         description: The id used to delete the prompt.
 *     responses:
 *       200:
 *         description: Prompt has been deleted.
 *       204:
 *         description: No content
 */
PromptRouter.route("/:id").delete(PromptController.deletePromptById);

export { PromptRouter };