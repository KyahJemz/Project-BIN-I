import { z } from 'zod';

export type ICreatePostRequest = z.infer<typeof CreatePostRequestSchema>
export const CreatePostRequestSchema = z.object({
	title: z.string().min(1).trim(),
	author: z.string().min(1).trim(),
	content: z.string().min(1).trim(),
	description: z.string().min(1).trim(),
	image: z.string().min(1).trim(),
});

export type IUpdatePostRequest = z.infer<typeof UpdatePostRequestSchema>
export const UpdatePostRequestSchema = z.object({
	title: z.string().optional(),
	author: z.string().optional(),
	content: z.string().optional(),
	description: z.string().optional(),
	image: z.string().optional(),
});
