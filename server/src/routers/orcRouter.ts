import express from "express";
import { OrcController} from "../controllers/orcController";

const OrcRouter = express.Router();

OrcRouter.get("/", OrcController.getAllOrcs);
OrcRouter.get("/:id", OrcController.getOrcById);
OrcRouter.get("/user/:user_id", OrcController.getOrcsByUserId);

OrcRouter.post("/new-orc", OrcController.saveOrc);
OrcRouter.put("/del-orc", OrcController.deleteOrcById);

export { OrcRouter };