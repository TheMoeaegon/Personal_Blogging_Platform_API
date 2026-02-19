import type { Request, Response, NextFunction } from "express";

import { AppError } from "../errors/index.js";

export const errorMiddleware = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let statusCode: number;
    let message: string;
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err instanceof TypeError) {
        statusCode = 400;
        message = "Bad Request";
    } else {
        statusCode = 500;
        message = "Internal Server Error";
    }
    return res.status(statusCode).json({ error: message });
};
