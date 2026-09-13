import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { SYSTEM_CONSTANTS } from './config/constants.js';

export const createApp = (): Express => {
  const app = express();

  // Security & standard middleware
  app.use(helmet());
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  }));
  app.use(express.json({ limit: '10mb' }));
  app.use(morgan('dev'));

  // Health endpoint
  app.get('/api/v1/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'healthy',
      service: 'audit-mesh-backend',
      version: SYSTEM_CONSTANTS.API_VERSION,
      timestamp: new Date().toISOString(),
    });
  });

  // Global 404 handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      error: 'RESOURCE_NOT_FOUND',
      message: 'The requested API route does not exist.',
    });
  });

  // Global error handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[Error] Unhandled application error:', err);
    res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred during processing.'
        : err.message,
    });
  });

  return app;
};
