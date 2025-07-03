import express from "express";
import { UserRouter } from "./server/routers/userRouter";
import { OrcRouter } from "./server/routers/orcRouter";

// initialise app
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// global BigInt serialisation for routes

// (BigInt.prototype as any).toJSON = function () {
//     return this.toString();
// };

// express routers

app.use("/users", UserRouter);
app.use("/orcs", OrcRouter);
// app.use("/prompts/", PromptsRouter

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export { app };