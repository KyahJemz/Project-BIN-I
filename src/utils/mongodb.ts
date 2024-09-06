import mongoose from 'mongoose';
import getConfig from 'next/config';

interface ServerRuntimeConfig {
    MongoDbConnectionString: string;
    MongoDbDatabase: string;
}

const MongoDbConnect = async (): Promise<void> => {
    const { serverRuntimeConfig } = getConfig();
    const config = serverRuntimeConfig as ServerRuntimeConfig;

    if (!config.MongoDbConnectionString || !config.MongoDbDatabase) {
        throw new Error('MongoDB connection string or database name is not defined.');
    }

    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(config.MongoDbConnectionString, {
                dbName: config.MongoDbDatabase,
                serverSelectionTimeoutMS: 30000,
                socketTimeoutMS: 45000, 
                serverApi: {
                    version: '1',
                    strict: true,
                    deprecationErrors: true,
                },
            });
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
