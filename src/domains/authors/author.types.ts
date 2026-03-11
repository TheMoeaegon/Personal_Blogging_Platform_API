import type { Author } from '../../shared/types/index.js';

export type CreateAuthorInput = Omit<Author, 'id' | 'created_at' | 'updated_at'>;

export type UpdateAuthorInput = {
  fullname: string;
  bio: string;
  id: string;
};
