import { Router } from 'express';
import { getAuthorProfileController, updateAuthorControlller } from './author.controller.js';
import { authMiddleware } from '../../shared/middlewares/authmiddleware.js';

const authorRouter = Router();

authorRouter.use(authMiddleware);

authorRouter.put('/profile', updateAuthorControlller);
authorRouter.get('/profile', getAuthorProfileController);

export default authorRouter;
