import { NotFoundError, ValidationError } from '../../shared/errors/index.js';
import { getAuthorById, updateAuthor } from './author.repository.js';
import type { UpdateAuthorInput } from './author.types.js';

export const updateAuthorService = async (updateAuthorDto: UpdateAuthorInput) => {
  try {
    if (!updateAuthorDto.bio || !updateAuthorDto.id || !updateAuthorDto.fullname) {
      throw new ValidationError('Required fields are missing', 400);
    }
    const updatedAuthor = await updateAuthor(updateAuthorDto);
    if (!updatedAuthor) {
      throw new NotFoundError('Author not found', 404);
    }
    return updatedAuthor;
  } catch (error) {
    console.log('error updating user: ', error);
    throw error;
  }
};

export async function getAuthorProfileService(id: string) {
  try {
    const author = await getAuthorById(id);
    if (!author) {
      throw new NotFoundError('Author not found', 404);
    }
    return author;
  } catch (error) {
    console.error('Failed to fetch profile: ', error);
    throw error;
  }
}
