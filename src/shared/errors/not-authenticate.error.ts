import { AppError } from "./index.js";

export class NotAuthenticateError extends AppError {
    constructor(message: string, statusCode = 401) {
        super(message, statusCode);
    }
}
