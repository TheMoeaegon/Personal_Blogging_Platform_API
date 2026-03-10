import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import { DatabaseError } from 'pg';
import { env } from '../../../env.js';

import { ConflictError, ValidationError, NotFoundError, NotAuthenticateError } from '../../shared/errors/index.js';

import { handleCreateAccessJwtToken, handleCreateRefreshJwtToken } from './auth.utils.js';
import { saveRefreshToken } from './auth.repository.js';
import type { AuthorLoginDto, AuthorResponseDto, ClaimsType, RegisterAuthorDto } from './auth.types.js';
import { createAuthor, getAuthorByEmail } from '../authors/index.js';

export const registerNewAuthorService = async ({
  fullname,
  email,
  password,
  bio = '',
  avatar_url = '',
}: RegisterAuthorDto) => {
  try {
    if (fullname === undefined || email === undefined || password === undefined) {
      throw new ValidationError('Bad Request: Missing required fields', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const author = {
      fullname,
      email,
      password_hash: hashedPassword,
      bio,
      avatar_url,
    };
    const authorDto = await createAuthor(author);
    if (!authorDto) throw Error('null return when trying creating to create new author');
    const claims: ClaimsType = {
      sub: authorDto.id,
      iss: 'Themoeaegon',
    };
    const accessToken = handleCreateAccessJwtToken(env.JWT_SECRET, claims);
    const refreshToken = handleCreateRefreshJwtToken(env.JWT_SECRET, claims);
    const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await saveRefreshToken(hashedToken, authorDto.id, expiredAt);
    return { accessToken, refreshToken, user: authorDto };
  } catch (error: unknown) {
    if (error instanceof DatabaseError) {
      if (error?.code === '23505') {
        throw new ConflictError('Email already exists', 409);
      } else if (error?.code === '23502') {
        throw new ValidationError('Bad Request: Field cannot be empty', 400);
      } else {
        throw new Error('Internal Server Error');
      }
    }
    throw error;
  }
};

export const loginAuthorService = async ({ email, password }: AuthorLoginDto) => {
  try {
    if (!email || !password) throw new ValidationError('Bad Request: Required field cannot be empty', 400);
    const author = await getAuthorByEmail(email);
    if (!author) throw new NotFoundError("Author with this email doesn't exit");
    const isMatch = await bcrypt.compare(password, author.password_hash);
    if (!isMatch) throw new NotAuthenticateError('email or password is invalid', 401);
    const claims: ClaimsType = {
      sub: author.id,
      iss: 'Themoeaegon',
    };
    const accessToken = handleCreateAccessJwtToken(env.JWT_SECRET, claims);
    const refreshToken = handleCreateRefreshJwtToken(env.JWT_SECRET, claims);
    const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await saveRefreshToken(hashedToken, author.id, expiredAt);
    return { accessToken, refreshToken };
  } catch (err: unknown) {
    throw err;
  }
};
