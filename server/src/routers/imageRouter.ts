import express from "express";
import { ImageController } from "../controllers/imageController";

const ImageRouter = express.Router();

console.log("image router mounted");

/**
 * @swagger
 * /images:
 *   get:
 *     tags: [
 *       images
 *     ]
 *     summary: Returns 3 fetched url strings from the database
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1,
 *                            "url": "s3://s3-url/create-an-orc-head.png,
 *                            "url": "s3://s3-url/create-an-orc-torso.png,
 *                            "url": "s3://s3-url/create-an-orc-legs.png,
 *                            }]'
 *       204:
 *         description: No content
 */
ImageRouter.route("/").get(ImageController.getOrcImages);

/**
 * @swagger
 * /images/bg:
 *   get:
 *     tags: [
 *       images
 *     ]
 *     summary: Returns all urls from a table in the database
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1,
 *                            "url": "s3://s3-url/create-an-orc/background.png"},
 *                            {"id": 2,
 *                            "url": "s3://s3-url/create-an-orc/orc-shadow.png"}
 *                            }]'
 *       204:
 *         description: No content
 */
ImageRouter.route("/bg").get(ImageController.getBgImages);

export { ImageRouter};