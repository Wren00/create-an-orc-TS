import express from "express";
import { UserRouter } from "./routers/userRouter";
import { OrcRouter } from "./routers/orcRouter";
import { PromptRouter } from "./routers/promptRouter";
import cors from "cors";
import morgan from "morgan";
import {GeneratorRouter} from "./routers/generatorRouter";

// initialise app
const app = express();

const PORT = 3001;

app.use(cors( {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express routers

app.use("/users", UserRouter);
app.use("/orcs", OrcRouter);
app.use("/prompts", PromptRouter);
app.use("/gen", GeneratorRouter);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export { app };