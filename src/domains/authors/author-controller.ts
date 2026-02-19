import type { Request, Response, NextFunction } from "express";

import { createAuthorService } from "./author-service.js";

export const createAuthorController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { fullname, email, password, bio, avatar_url } = req.body;
        const author = await createAuthorService({
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
