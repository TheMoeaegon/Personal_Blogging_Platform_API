import { pool } from '../../shared/db/pool.js';

import type { Author } from '../../shared/types/index.js';
import type { AuthorResponseDto } from '../auth/index.js';
import type { CreateAuthorInput, UpdateAuthorInput } from './author.types.js';

export const createAuthor = async ({
  fullname,
  email,
  password_hash,
  bio = '',
  avatar_url = '',
}: CreateAuthorInput): Promise<AuthorResponseDto | null> => {
  const query = `INSERT INTO authors (fullname, email, password_hash, bio, avatar_url) VALUES ($1, $2, $3, $4, $5)
        RETURNING id, fullname, email, bio, avatar_url, created_at, updated_at;`;
  const values = [fullname, email, password_hash, bio, avatar_url];
  const result = await pool.query<Author>(query, values);
  return result.rows[0] ?? null;
};

export const getAuthorByEmail = async (email: string): Promise<Author | null> => {
  const query = `SELECT * FROM authors WHERE email = $1`;
  const value = [email];
  const result = await pool.query<Author>(query, value);
  return result.rows[0] ?? null;
};

export const updateAuthor = async (author: UpdateAuthorInput): Promise<AuthorResponseDto | null> => {
  const query = `UPDATE authors set fullname = $1, bio = $2, updated_at = NOW() where id = $3 RETURNING id, fullname, email, bio, avatar_url, created_at, updated_at;`;
  const values = [author.fullname, author.bio, author.id];
  const result = await pool.query(query, values);
  return result.rows[0] ?? null;
};

export const getAuthorById = async (id: string): Promise<AuthorResponseDto | null> => {
  const query = `SELECT id, fullname, email, bio, avatar_url, created_at, updated_at FROM authors WHERE id = $1`;
  const value = [id];
  const result = await pool.query(query, value);
  return result.rows[0] ?? null;
};
