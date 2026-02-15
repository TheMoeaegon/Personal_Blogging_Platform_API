import type { Request, Response, NextFunction } from "express";

import app from "../../app.js";
import { ConflictError, ValidationError } from "../errors/index.js";

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    let statusCode: number;
    let message: string;
    if (err instanceof ValidationError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err instanceof ConflictError) {
        statusCode = err.statusCode;
        message = err.message;
    } else {
        statusCode = 500;
        message = "Internal Server Error";
    }
    return res.status(statusCode).json({ message });
});
