import { AppError } from "./app-errors.js";

export class NotAuthenticateError extends AppError {
    constructor(message: string, statusCode = 401) {
        super(message, statusCode);
    }
}
