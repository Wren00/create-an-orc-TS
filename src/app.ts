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

app.use("/api/users/", UserRouter);
// app.use("/api/orcs/", OrcRouter);
app.use("/api/interestgroups/", UserGroupRouter);
app.use("/api/unverifiedsightings/", UnverifiedSightingRouter);
app.use("/api/confirmedsightings/", ConfirmedSightingRouter);
app.use("/api/taxongroups/", TaxonGroupRouter);
app.use("/api/reactions/", UserReactionRouter);
app.use("/api/auth/", AuthenticationRouter);
app.use("/api/images/", ImageRouter);



export { app };