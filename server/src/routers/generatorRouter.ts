import express from "express";
import { GeneratorController } from "../controllers/generatorController"

const GeneratorRouter = express.Router();

console.log("generator router mounted");

/**
 * @swagger
 * /gen:
 *   get:
 *     tags: [
 *       generators
 *     ]
 *     summary: Returns a name string made of randomised syllables from the database
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{"name": "gak",
 *                          "description": "Gak, a seasoned Orc warrior, earned a reputation for being cautious yet relentless in battle."
 *                          }'
 *       204:
 *         description: No content
 */
GeneratorRouter.route("/").get(GeneratorController.generateOrcData);


export { GeneratorRouter };