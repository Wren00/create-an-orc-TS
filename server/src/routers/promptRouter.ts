import express from "express";
import { PromptController} from "../controllers/promptController";

const PromptRouter = express.Router();

console.log("prompt router mounted");

PromptRouter.get("/p-all", PromptController.getAllPrompts);
PromptRouter.get("/p:id", PromptController.getPromptById);
PromptRouter.get("/p-value", PromptController.getPromptByAdjective);

PromptRouter.put("/p-update", PromptController.updatePrompt);
PromptRouter.post("/p-create", PromptController.createPrompt);

export { PromptRouter };