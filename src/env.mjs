import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		ENVIRONMENT: z.string().min(1),
		API_BASE_URL: z.string().url(),
		BASE_URL: z.string().url(),
		MONGODB_URL: z.string().url(),
		MONGODB_DATABASE: z.string().min(1),
		JWT_SECRET: z.string().min(1),
		JWT_EXP: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_ENVIRONMENT: z.string().min(1),
		NEXT_PUBLIC_API_BASE_URL: z.string().url(),
		NEXT_PUBLIC_BASE_URL: z.string().url(),
	},
	runtimeEnv: {
		ENVIRONMENT: process.env.ENVIRONMENT,
		API_BASE_URL: process.env.API_BASE_URL,
		BASE_URL: process.env.BASE_URL,
		MONGODB_URL: process.env.MONGODB_URL,
		MONGODB_DATABASE: process.env.MONGODB_DATABASE,
		JWT_SECRET: process.env.JWT_SECRET,
		JWT_EXP: process.env.JWT_EXP,
		NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
		NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
	},
});
