import { AppError } from "./app-errors.js";

export class ConflictError extends AppError {
    constructor(message: string, statusCode: number = 409) {
        super(message, statusCode);
    }
}
