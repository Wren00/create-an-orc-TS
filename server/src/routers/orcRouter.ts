import express from "express";
import { OrcController} from "../controllers/orcController";
import { validate} from "express-validation";
import {validationSchemas} from "../utils/validationSchemas";

const OrcRouter = express.Router();

console.log("orc router mounted");

/**
 * @swagger
 * /orcs:
 *   get:
 *     tags: [
 *       orcs
 *     ]
 *     summary: Returns a JSON array of all saved orcs
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
 *                           {"id": 2,
 *                            "name": "Hak",
 *                            "description": "A happy Orc.",
 *                            "promptsCollectionId": "2",
 *                            "orcImagesId": "2",
 *                            "userId": "2" }]'
 *       204:
 *         description: No content
 */
OrcRouter.get("/", OrcController.getAllOrcs);

/**
 * @swagger
 * /orcs/:id:
 *   get:
 *     tags: [
 *       orcs
 *     ]
 *     summary: Returns a single orc retrieved by id.
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         description: The id of the requested orc.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1,
 *                           "name": "Hek",
 *                           "description": "An unfortunate Orc.",
 *                           "promptsCollectionId": "1",
 *                           "orcImagesId": "1",
 *                           "userId": "1" }'
 *       204:
 *         description: No content
 */
OrcRouter.get("/:id", OrcController.getOrcById);

/**
 * @swagger
 * /orcs:
 *   post:
 *     tags: [
 *       orcs
 *     ]
 *     summary: Saves a generated Orc
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: The name for the Orc.
 *               description:
 *                 type: string
 *                 required: true
 *                 description: The AI generated description for the Orc.
 *               promptsCollectionId:
 *                 type: integer
 *                 required: true
 *                 description: The randomised prompts that were used to create the description.
 *               orcImagesId:
 *                 type: integer
 *                 required: true
 *                 description: The randomised image created from a selection of randomised orc part images.
 *               userId:
 *                 type: int
 *                 required: true
 *                 description: The id for the user that saved the Orc.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Orc Created
 */
OrcRouter.post("/", validate(validationSchemas.createOrc), OrcController.saveOrc);

/**
 * @swagger
 * /orcs/:id:
 *   delete:
 *     tags: [
 *       orcs
 *     ]
 *     summary: Deletes an existing Orc
 *     parameters:
 *       - name: orcId
 *         in: path
 *         type: integer
 *         description: The ID of the requested orc.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Orc Deleted
 */
OrcRouter.delete("/:id", OrcController.deleteOrcById);

export { OrcRouter };