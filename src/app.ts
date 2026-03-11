import express from 'express';
import morgan from 'morgan';

import { errorMiddleware } from './shared/middlewares/index.js';
import authorRouter from './domains/authors/index.js';
import authRouter from './domains/auth/index.js';
import { isTestEnv } from '../env.js';

const app = express();

app.use(express.json());
app.use(
  morgan('dev', {
    skip: () => isTestEnv(),
  })
);

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'ok' });
});

app.use('/api/v1/author', authorRouter);
app.use('/api/v1/auth', authRouter);

app.use(errorMiddleware);

export default app;
