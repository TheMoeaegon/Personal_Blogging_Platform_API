import { Router } from "express";
import { createAuthorController } from "./author-controller.js";

const router = Router();

router.post("/", createAuthorController);

export default router;
