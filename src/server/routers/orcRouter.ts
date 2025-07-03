import express from "express";
import { OrcController} from "../controllers/orcController";

const OrcRouter = express.Router();

//PUBLIC endpoints

OrcRouter.get("/getAllOrcs", OrcController.getAllOrcs);
OrcRouter.get("/getOrcById/:id", OrcController.getOrcById);
OrcRouter.get("/getOrcsByUserId/:user_id", OrcController.getOrcsByUserId);


//PRIVATE endpoints

OrcRouter.post("/saveOrc", OrcController.saveOrc);
OrcRouter.put("/deleteOrcById", OrcController.deleteOrcById);

export { OrcRouter };