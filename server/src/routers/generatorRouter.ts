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
 *                 value: '{
 *                          "name": "Testing Orc",
 *                          "description": "This is an AI generated description of the Orc's backstory.",
 *                          "str": 10,
 *                          "dex": 11,
 *                          "con": 12,
 *                          "int": 13,
 *                          "wis": 14,
 *                          "cha": 15
 *                         }'
 *       204:
 *         description: No content
 */
GeneratorRouter.route("/").get(GeneratorController.generateOrcData);


export { GeneratorRouter };