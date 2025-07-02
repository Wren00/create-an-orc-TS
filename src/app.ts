import express from "express";
import cors from "cors";
import { UserRouter } from "./src/routers/userRouter";

/* initialise Express app */
const app = express();

/* setup middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api/*', Authenticate);

/* setup Express Routers */

app.use("/users/", UserRouter);
// app.use("/orcs/", OrcRouter);
// app.use("/prompts/", PromptsRouter



export { app };