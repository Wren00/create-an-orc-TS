import {Router} from "express";

const TestRouter = Router();

TestRouter.get("/", (req, res) => {
    res.send("Test router is working!");
});

export { TestRouter };