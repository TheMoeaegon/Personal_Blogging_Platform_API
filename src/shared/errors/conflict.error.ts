import { AppError } from "./index.js";

export class ConflictError extends AppError {
    constructor(message: string, statusCode: number = 409) {
        super(message, statusCode);
    }
}
