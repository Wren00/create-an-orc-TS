import express from "express";
import {UserRouter} from "./routers/userRouter";
import {OrcRouter} from "./routers/orcRouter";
import {PromptRouter} from "./routers/promptRouter";
import {GeneratorRouter} from "./routers/generatorRouter";
import {ImageRouter} from "./routers/imageRouter";
import {TestRouter} from "./routers/testRouter";

import cors from "cors";
import morgan from "morgan";

// initialise app
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
app.use("/test", TestRouter);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export { app };