import express from "express";
import { OrcController} from "../controllers/orcController";

const OrcRouter = express.Router();

console.log("orc router mounted");

OrcRouter.get("/", OrcController.getAllOrcs);
OrcRouter.get("/:id", OrcController.getOrcById);
OrcRouter.get("/user/:user_id", OrcController.getOrcsByUserId);

OrcRouter.post("/create", OrcController.saveOrc);
OrcRouter.delete("/delete-id", OrcController.deleteOrcById);

export { OrcRouter };