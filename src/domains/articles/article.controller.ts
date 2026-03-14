import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../../shared/middlewares/index.js';
import {
  createNewArticleService,
  deleteArticleSerice,
  getAllArticlesService,
  getArticleByIdService,
  updateArticleService,
} from './article.service.js';
import { NotFoundError } from '../../shared/errors/not-found.error.js';

export const createNewArticleController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.sub;
    const article = await createNewArticleService({ ...req.body, authorId: userId });
    res.status(201).json({ message: 'Article created', article });
  } catch (err) {
    next(err);
  }
};

export const getAllArticlesController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    await getAllArticlesService();
  } catch (err) {
    next(err);
  }
};

export const getArticleByIdController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const articleId = req.params.id as string;
    const article = await getArticleByIdService(articleId);
    return res.json({ ...article });
  } catch (err) {
    next(err);
  }
};

export const updateArticleController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const articleId = req.params?.id as string;
    const authorId = req.user?.sub;
    const updatedArticle = await updateArticleService({ ...req.body, articleId, authorId });
    return res.json({ message: 'Article Updated', updatedArticle });
  } catch (error) {
    next(error);
  }
};

export const deleteArticleController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const articleId = req.params?.id as string;
    const authorId = req.user?.sub as string;
    await deleteArticleSerice(articleId, authorId);
    return res.json({ message: 'Article deleted' });
  } catch (error) {
    next(error);
  }
};
