import { z } from 'zod';

export type ICreateNewsRequest = z.infer<typeof CreateNewsRequestSchema>
export const CreateNewsRequestSchema = z.object({
	title: z.string().min(1).trim(),
	author: z.string().min(1).trim(),
	description: z.string().min(1).trim(),
	content: z.string().min(1).trim().optional(),
	image: z.string().min(1).trim().optional(),
});

export type IUpdateNewsRequest = z.infer<typeof UpdateNewsRequestSchema>
export const UpdateNewsRequestSchema = z.object({
	title: z.string().optional(),
	author: z.string().optional(),
	description: z.string().optional(),
	content: z.string().optional(),
	image: z.string().optional(),
});
