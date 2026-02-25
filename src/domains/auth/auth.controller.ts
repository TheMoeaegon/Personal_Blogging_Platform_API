import type { Request, Response, NextFunction } from "express";
import {
    loginAuthorService,
    registerNewAuthorService,
} from "../auth/auth.service.js";

export const handleRegisterNewAuthorController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { fullname, email, password, bio, avatar_url } = req.body;
        const author = await registerNewAuthorService({
            fullname,
            email,
            password,
            bio,
            avatar_url,
        });
        res.status(201).json({
            message: "Author created successfully",
            author,
        });
    } catch (error: any) {
        next(error);
    }
};

export const handleAuthorLoginController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken } = await loginAuthorService({
            email,
            password,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/api/auth/refresh",
        });
        res.status(200).json({
            message: "Login successfully",
            token: accessToken,
        });
    } catch (err) {
        next(err);
    }
};
