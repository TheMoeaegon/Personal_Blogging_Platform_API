import { NotFoundError } from '../../shared/errors/not-found.error.js';
import { ValidationError } from '../../shared/errors/validation.error.js';
import {
  createNewArticle,
  deleteArticleById,
  getAllArticles,
  getArticleById,
  updateArticle,
} from './article.repository.js';
import type { CreateArticleViewModel, UpdateArticleViewModel } from './article.types.js';

export const createNewArticleService = async ({
  title,
  slug,
  status,
  content,
  cover_image_url,
  author_id,
}: CreateArticleViewModel) => {
  try {
    if (!title || !slug || !status || !content || !cover_image_url || !author_id) {
      throw new ValidationError('Bad Request: Missing required fields', 400);
    }
    const article = await createNewArticle({ title, slug, status, content, cover_image_url, author_id });
    return { ...article };
  } catch (err) {
    console.error('Failed to create article: ', err);
    throw err;
  }
};

export const getAllArticlesService = async () => {
  try {
    const articles = await getAllArticles();
    return articles;
  } catch (err) {
    console.error('Failed to get all article: ', err);
    throw err;
  }
};

export const getArticleByIdService = async (articleId: string) => {
  try {
    const article = await getArticleById(articleId);
    if (!article) {
      throw new NotFoundError('Article not found', 404);
    }
    return article;
  } catch (error) {
    console.error('Failed to get article by id: ', error);
    throw error;
  }
};

export const updateArticleService = async ({ articleId, authorId, ...updateData }: UpdateArticleViewModel) => {
  try {
    //input validation
    if (
      !updateData.content ||
      !updateData.cover_image_url ||
      !updateData.slug ||
      !updateData.status ||
      !updateData.title
    ) {
      throw new ValidationError('Bad Request: Missing field required', 400);
    }
    const updatedArticle = await updateArticle({ articleId, authorId, ...updateData });
    if (!updateArticle) {
      throw new NotFoundError('Article not found', 404);
    }
    return updateArticle;
  } catch (error) {
    console.error('Failed to update article by id: ', error);
    throw error;
  }
};

export const deleteArticleSerice = async (articleId: string, authorId: string) => {
  try {
    const isDeleted = await deleteArticleById(articleId, authorId);
    if (!isDeleted) {
      throw new NotFoundError('Article not Found', 404);
    }
    return;
  } catch (error) {
    console.error('Failed to delete article by id: ', error);
    throw error;
  }
};
