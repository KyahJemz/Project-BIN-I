/** @type {import('next').NextConfig} */
import { env } from './src/env.mjs';

const nextConfig = {
	webpack: (config, { isServer }) => {
		if (config.node) {
			delete config.node.fs;
			delete config.node.net;
			delete config.node.tls;
		  }
		return config;
	  },
	  eslint: {
		ignoreDuringBuilds: true,
	  },
	  typescript: {
		ignoreBuildErrors: true,
	  },
	reactStrictMode: false,
	serverRuntimeConfig: {
		Environment: env.ENVIRONMENT,
		ApiBaseUrl: env.API_BASE_URL,
		BaseUrl: env.BASE_URL,
		MongoDbConnectionString: env.MONGODB_URL,
		MongoDbDatabase: env.MONGODB_DATABASE,
		MongoDbSecret: env.MONGODB_SECRET,
	},
	publicRuntimeConfig: {
		Environment: env.NEXT_PUBLIC_ENVIRONMENT,
		ApiBaseUrl: env.NEXT_PUBLIC_API_BASE_URL,
		BaseUrl: env.NEXT_PUBLIC_BASE_URL,
	},
};

export default nextConfig;
