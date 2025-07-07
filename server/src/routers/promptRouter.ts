import express from "express";
import { PromptController} from "../controllers/promptController";

const PromptRouter = express.Router();

console.log("prompt router mounted");

// these api routes should not be accessible directly from the browser

PromptRouter.get("/", PromptController.getAllPrompts);
PromptRouter.get("/:id", PromptController.getPromptById);
PromptRouter.get("/value", PromptController.getPromptByAdjective);

PromptRouter.put("/update", PromptController.updatePrompt);
PromptRouter.post("/create", PromptController.createPrompt);

export { PromptRouter };