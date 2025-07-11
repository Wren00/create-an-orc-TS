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
 *                 value: '[{ "id": 1,
 *                            "name": "Huk",
 *                           {"id": 2,
 *                            "name": "Mekor"}]'
 *       204:
 *         description: No content
 */
GeneratorRouter.route("/").get(GeneratorController.generateOrc);



export { GeneratorRouter };