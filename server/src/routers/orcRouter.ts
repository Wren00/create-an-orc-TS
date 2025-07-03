import express from "express";
import { OrcController} from "../controllers/orcController";

const OrcRouter = express.Router();

console.log("orc router mounted");

OrcRouter.get("/getAllOrcs", OrcController.getAllOrcs);
OrcRouter.get("/:id", OrcController.getOrcById);
OrcRouter.get("/user/:user_id", OrcController.getOrcsByUserId);

OrcRouter.post("/create-orc", OrcController.saveOrc);
OrcRouter.put("/deleteOrcById", OrcController.deleteOrcById);

export { OrcRouter };