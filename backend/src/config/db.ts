import mongoose from 'mongoose';

export const connectDatabase = async (uri?: string): Promise<typeof mongoose> => {
  const connectionUri = uri || process.env.MONGODB_URI || 'mongodb://localhost:27017/audit_mesh';
  try {
    const conn = await mongoose.connect(connectionUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] Connected successfully to MongoDB: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[Database] Warning: Could not connect to MongoDB (${message}). Running in mock/offline mode if configured.`);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
};
