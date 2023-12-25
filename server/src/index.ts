import express from 'express';

import cors from 'cors';
import morgan from 'morgan';
import env from './envSchema';
import { uploadRouter } from './routes';

const main = async () => {
  const app = express();

  app.use(express.json());

  app.use(
    cors({
      allowedHeaders: ['Content-Type', 'Authorization'],
      origin: '*',
    })
  );

  app.use(morgan('dev'));

  app.get('/ping', (_req, res) => {
    res.status(200).json({
      message: 'pong',
      data: {
        date: new Date().toISOString(),
      },
    });
  });

  app.use('/api', uploadRouter);

  app.get('*', (_req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });

  app.listen(env.PORT, () => {
    console.log(`🚀 Listening on port ${env.PORT}`);
  });
};

main().catch(console.error);
