import { AppError } from "./index.js";

export class NotFoundError extends AppError {
    constructor(message: string, statusCode = 404) {
        super(message, statusCode);
    }
}
