import { pool } from "../../shared/db/pool.js";

export const saveRefreshToken = async (
    hashedToken: string,
    authorId: string,
    expiresAt: Date,
) => {
    const query = `INSERT INTO refresh_tokens (token, author_id, expires_at)
        VALUES ($1, $2, $3) RETURNING *;`;
    const values = [hashedToken, authorId, expiresAt];
    const result = await pool.query(query, values);
    return result.rows[0] ?? null;
};
