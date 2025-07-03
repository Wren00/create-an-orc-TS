import express from "express";
import { UserRouter } from "./routers/userRouter";
import { OrcRouter } from "./routers/orcRouter";
import cors from "cors";
import morgan from "morgan";

// initialise app
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan("tiny"));

// express routers

app.use("/users", UserRouter);
app.use("/orcs", OrcRouter);
// app.use("/prompts/", PromptsRouter

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export { app };