import express from "express";
import { PromptsController} from "../controllers/orcController";

const OrcRouter = express.Router();

console.log("orc router mounted");

OrcRouter.get("/getAllOrcs", PromptsController.getAllOrcs);
OrcRouter.get("/:id", PromptsController.getOrcById);
OrcRouter.get("/user/:user_id", PromptsController.getOrcsByUserId);

OrcRouter.post("/create-orc", PromptsController.saveOrc);
OrcRouter.put("/deleteOrcById", PromptsController.deleteOrcById);

export { OrcRouter };