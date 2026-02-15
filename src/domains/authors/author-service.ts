import bcrypt from "bcryptjs";

import { createAuthor } from "./author-repository.js";
import type { Author, AuthorDto } from "./author-types.js";
import { DatabaseError } from "pg";

export const createAuthorService = async ({
    fullname,
    email,
    password,
    bio = "",
    avatar_url = "",
}: AuthorDto) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const author: Author = {
        fullname,
        email,
        password_hash: hashedPassword,
        bio,
        avatar_url,
    };
    try {
        return await createAuthor(author);
    } catch (error: any) {
        if (error?.code === "23505") {
            throw new Error();
        }
        throw new Error("Internal server error");
    }
};
