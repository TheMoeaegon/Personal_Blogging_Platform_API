import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../../shared/middlewares/index.js';
import { getAuthorProfileService, updateAuthorService } from './author.service.js';
import type { UpdateAuthorInput } from './author.types.js';

export async function updateAuthorControlller(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const id = req.user?.sub;
    const updateAuthorDto: UpdateAuthorInput = { ...req.body, id };
    const updatedAuthor = await updateAuthorService(updateAuthorDto);
    return res.json({ message: 'Author Profile Updated', author: updatedAuthor });
  } catch (error: unknown) {
    next(error);
  }
}

export async function getAuthorProfileController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const id = req.user?.sub as string;
    const author = await getAuthorProfileService(id);
    return res.json({ author });
  } catch (error) {
    next(error);
  }
}
