import bcrypt from "bcryptjs";

import { createAuthor } from "./author-repository.js";
import type { Author, AuthorDto } from "./author-types.js";
import { ConflictError, ValidationError } from "../../shared/errors/index.js";

export const createAuthorService = async ({
    fullname,
    email,
    password,
    bio = "",
    avatar_url = "",
}: AuthorDto) => {
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
        const author: Author = {
            fullname,
            email,
            password_hash: hashedPassword,
            bio,
            avatar_url,
        };
        return await createAuthor(author);
    } catch (error: any) {
        if (error?.code === "23505") {
            throw new ConflictError("Email already exists", 409);
        }
        throw error;
    }
};
