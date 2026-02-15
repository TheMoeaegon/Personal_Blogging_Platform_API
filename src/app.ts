import express from "express";

import authorRouter from "./domains/authors/author-routes.js";
import { errorMiddleware } from "./shared/middlewares/index.js";

const app = express();

app.use(express.json());

app.use("/api/v1/authors", authorRouter);

app.use(errorMiddleware);

export default app;
