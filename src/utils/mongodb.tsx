import mongoose from "mongoose";
import getConfig from "next/config";

interface ServerRuntimeConfig {
  MongoDbConnectionString: string;
}

const MongoDbConnect = async (): Promise<void> => {
  const { serverRuntimeConfig } = getConfig();
  const config = serverRuntimeConfig as ServerRuntimeConfig;

  if (!config.MongoDbConnectionString) {
    throw new Error("MongoDB connection string is not defined.");
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(config.MongoDbConnectionString);
      console.log("MongoDB connected successfully.");
    }
  } catch (error) {
    const err = error as Error;
    console.error("MongoDB connection failed:", err.message);
    throw err;
  }
};

export default MongoDbConnect;
