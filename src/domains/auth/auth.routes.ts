import { Router } from "express";
import {
    handleAuthorLoginController,
    handleRegisterNewAuthorController,
} from "./auth.controller.js";

const router = Router();

router.post("/login", handleAuthorLoginController);
router.post("/register", handleRegisterNewAuthorController);

export default router;
