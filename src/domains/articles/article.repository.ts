import { pool } from '../../shared/db/pool.js';
import type { Article, CreateArticleViewModel, UpdateArticleViewModel } from './article.types.js';

export const createNewArticle = async ({
  title,
  content,
  slug,
  cover_image_url,
  status,
  author_id,
}: CreateArticleViewModel): Promise<Article> => {
  const query = `INSERT INTO articles (title, content, slug, cover_image_url, status, author_id)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
  const values = [title, content, slug, cover_image_url, status, author_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllArticles = async (): Promise<Article[]> => {
  const query = `SELECT * FROM articles ORDER BY created_at DESC LIMIT 10;`;
  const result = await pool.query(query);
  return result.rows[0];
};

export const getArticleById = async (articleId: string): Promise<Article | null> => {
  const query = `SELECT * FROM articles WHERE id = $1;`;
  const value = [articleId];
  const result = await pool.query(query, value);
  return result.rows[0] || null;
};

export const updateArticle = async ({
  articleId,
  authorId,
  ...updateArticle
}: UpdateArticleViewModel): Promise<UpdateArticleViewModel | null> => {
  const { title, content, slug, cover_image_url, status } = updateArticle;
  const query = `UPDATE articles SET title = $1, content = $2, slug = $3, cover_image_url = $4, status = $5, updated_at = NOW() WHERE id = $6 AND authorId= $7 RETURNING *;`;
  const values = [title, content, slug, cover_image_url, status, articleId, authorId];
  const result = await pool.query(query, values);
  return result.rows[0] ?? null;
};

export const deleteArticleById = async (articleId: string, authorId: string) => {
  const query = `DELETE FROM articles WHERE id = $1 AND author_id = $2 RETURNING *;`;
  const values = [articleId, authorId];
  const result = await pool.query(query, values);
  return result.rows[0] ? true : false;
};
