import dotenv from 'dotenv';
import { createApp } from './app.js';
import { connectDatabase } from './config/db.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;
const app = createApp();

const startServer = async (): Promise<void> => {
  try {
    if (process.env.MONGODB_URI) {
      await connectDatabase(process.env.MONGODB_URI);
    } else {
      console.log('[Database] No MONGODB_URI provided in environment. Running in decoupled mode.');
    }

    app.listen(PORT, () => {
      console.log(`[Server] Audit Mesh Backend running on port ${PORT}`);
      console.log(`[Server] Health check available at http://localhost:${PORT}/api/v1/health`);
    });
  } catch (error) {
    console.error('[Server] Fatal startup failure:', error);
    process.exit(1);
  }
};

startServer();
