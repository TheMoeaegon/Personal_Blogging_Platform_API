import { AppError } from "./index.js";

export class ValidationError extends AppError {
    constructor(message: string, statusCode: number) {
        super(message, statusCode);
    }
}
