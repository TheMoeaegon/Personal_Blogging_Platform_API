import { AppError } from "./app-errors.js";

export class NotFoundError extends AppError {
    constructor(message: string, statusCode = 404) {
        super(message, statusCode);
    }
}
