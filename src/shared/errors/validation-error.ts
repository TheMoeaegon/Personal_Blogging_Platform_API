import { AppError } from "./app-errors.js";

export class ValidationError extends AppError {
    constructor(message: string, statusCode: number) {
        super(message, statusCode);
    }
}
