import express from "express";
import {UserRouter} from "./routers/userRouter";
import {OrcRouter} from "./routers/orcRouter";
import {PromptRouter} from "./routers/promptRouter";
import {GeneratorRouter} from "./routers/generatorRouter";
import {ImageRouter} from "./routers/imageRouter";

import cors from "cors";
import morgan from "morgan";

const app = express();

const PORT = 3001;

app.use(cors( {
    origin: "http://localhost:5173",
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
app.use("/images", ImageRouter);

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

export { app };