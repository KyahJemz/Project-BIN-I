import { z } from 'zod';

export type ICreateRoutesRequest = z.infer<typeof CreateRoutesRequestSchema>
export const CreateRoutesRequestSchema = z.object({
	schedule_id: z.string().trim().optional().nullable().default(null),
	routeName: z.string().min(1).trim(),
	pickupPoints: z.array(
		z.array(z.number()),
	),
	description: z.string().optional().nullable().default(null),
	status: z.string().min(1).trim(),
	notes: z.string().optional().nullable().default(null),
});

export type IUpdateRoutesRequest = z.infer<typeof UpdateRoutesRequestSchema>
export const UpdateRoutesRequestSchema = z.object({
	schedule_id: z.string().optional(),
	routeName: z.string().optional(),
	pickupPoints: z
		.array(
			z.array(z.number()),
		)
		.optional(),
	description: z.string().optional(),
	status: z.string().optional(),
	notes: z.string().optional(),
});
