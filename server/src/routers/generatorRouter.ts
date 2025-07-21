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
 *                 value: '{"name": "Huk"}'
 *       204:
 *         description: No content
 */
GeneratorRouter.route("/name").get(GeneratorController.generateName);

/**
 * @swagger
 * /gen:
 *   get:
 *     tags: [
 *       generators
 *     ]
 *     summary: Returns a description generated from OpenAI by prompts from the database
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{"description": "This testing Orc is good, friendly and fun"}'
 *       204:
 *         description: No content
 */
GeneratorRouter.route("/story").get(GeneratorController.generateDescription);


export { GeneratorRouter };