import { Router } from "express";
import { createAuthorController } from "./index.js";

const authorRouter = Router();

authorRouter.post("/", createAuthorController);

export default authorRouter;
