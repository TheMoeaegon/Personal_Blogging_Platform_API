import bcrypt from "bcryptjs";
import { DatabaseError } from "pg";

import {
    ConflictError,
    ValidationError,
    NotFoundError,
    NotAuthenticateError,
} from "../../shared/errors/index.js";
import { createAuthor, getAuthorByEmail } from "../../domains/authors/index.js";

import type { AuthorLoginDto, RegisterAuthorDto } from "./index.js";

export const registerNewAuthorService = async ({
    fullname,
    email,
    password,
    bio = "",
    avatar_url = "",
}: RegisterAuthorDto) => {
    try {
        if (
            fullname === undefined ||
            email === undefined ||
            password === undefined
        ) {
            throw new ValidationError(
                "Bad Request: Missing required fields",
                400,
            );
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const author = {
            fullname,
            email,
            password_hash: hashedPassword,
            bio,
            avatar_url,
        };
        return await createAuthor(author);
    } catch (error: unknown) {
        if (error instanceof DatabaseError) {
            if (error?.code === "23505") {
                throw new ConflictError("Email already exists", 409);
            } else if (error?.code === "23502") {
                throw new ValidationError(
                    "Bad Request: Field cannot be empty",
                    400,
                );
            } else {
                throw new Error("Internal Server Error");
            }
        }
        throw error;
    }
};

export const loginAuthorService = async ({
    email,
    password,
}: AuthorLoginDto) => {
    try {
        if (!email || !password)
            throw new ValidationError(
                "Bad Request: Required field cannot be empty",
                400,
            );
        const author = await getAuthorByEmail(email);
        if (!author)
            throw new NotFoundError("Author with this email doesn't exit");
        const isMatch = await bcrypt.compare(password, author.password_hash);
        if (!isMatch)
            throw new NotAuthenticateError("email or password is invalid", 401);
        return { message: "Login Successfully" };
    } catch (err: unknown) {
        throw err;
    }
};
