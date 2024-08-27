import mongoose from 'mongoose';
import getConfig from "next/config";

interface ServerRuntimeConfig {
  MongoDbConnectionString: string;
}

const MongoDbConnect = async (): Promise<void> => {
  const { serverRuntimeConfig } = getConfig();
  const config = serverRuntimeConfig as ServerRuntimeConfig;

  if (!config.MongoDbConnectionString) {
    throw new Error('MongoDB connection string is not defined.');
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(config.MongoDbConnectionString);
      console.log('MongoDB connected successfully.');
    }
  } catch (error: any) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
};

const closeConnection = async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
    console.log('MongoDB disconnected successfully.');
  }
};

process.on('SIGINT', async () => {
  await closeConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeConnection();
  process.exit(0);
});

export { MongoDbConnect, closeConnection };