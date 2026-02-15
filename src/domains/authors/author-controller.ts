import type { Request, Response, NextFunction } from "express";

import { createAuthorService } from "./author-service.js";

export const createAuthorController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { fullname, email, password, bio, avatar_url } = req.body;
    try {
        await createAuthorService({
            fullname,
            email,
            password,
            bio,
            avatar_url,
        });
    } catch (error: any) {
        next(error);
    }
};
