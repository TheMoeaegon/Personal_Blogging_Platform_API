import { pool } from "../../shared/db/pool.js";

import type { Author } from "../../shared/types/index.js";
import type { CreateAuthorInput } from "./index.js";

export const createAuthor = async ({
    fullname,
    email,
    password_hash,
    bio = "",
    avatar_url = "",
}: CreateAuthorInput): Promise<Author | null> => {
    const query = `INSERT INTO authors (fullname, email, password_hash, bio, avatar_url) VALUES ($1, $2, $3, $4, $5)
        RETURNING *;`;
    const values = [fullname, email, password_hash, bio, avatar_url];
    const result = await pool.query<Author>(query, values);
    return result.rows[0] ?? null;
};

export const getAuthorByEmail = async (
    email: string,
): Promise<Author | null> => {
    const query = `SELECT * FROM authors WHERE email = $1`;
    const value = [email];
    const result = await pool.query<Author>(query, value);
    return result.rows[0] ?? null;
};
