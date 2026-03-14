import { Router } from 'express';
import { authMiddleware } from '../../shared/middlewares/authmiddleware.js';
import {
  createNewArticleController,
  deleteArticleController,
  getAllArticlesController,
  getArticleByIdController,
  updateArticleController,
} from './article.controller.js';

const router = Router();

router.use(authMiddleware);

// Todo: Implement article routes. Use cases
// client can create new article
// client can get all articles
// client can get article by id
// client can update article by id
// client can delete article by id
// client can get all articles by author id

router.post('/', createNewArticleController);
router.get('/', getAllArticlesController);
router.get('/:id', getArticleByIdController);
router.put('/:id', updateArticleController);
router.delete('/:id', deleteArticleController);

export default router;
