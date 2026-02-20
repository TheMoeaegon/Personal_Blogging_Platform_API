import express from "express";

import { errorMiddleware } from "./shared/middlewares/index.js";
import authorRouter from "./domains/authors/index.js";

const app = express();

app.use(express.json());

app.use("/api/v1/authors", authorRouter);

app.use(errorMiddleware);

export default app;
