import { pool } from "../../shared/db/pool.js";
import type { Author } from "./author-types.js";

export const createAuthor = async ({
    fullname,
    email,
    password_hash,
    bio = "",
    avatar_url = "",
}: Author) => {
    const query = `INSERT INTO authors (fullname, email, password_hash, bio, avatar_url) VALUES ($1, $2, $3, $4, $5)
        RETURNING fullname, email, password_hash, bio, avatar_url;`;
    const values = [fullname, email, password_hash, bio, avatar_url];
    const result = await pool.query(query, values);
    console.log(result);
};
