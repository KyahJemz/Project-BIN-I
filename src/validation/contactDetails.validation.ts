import { z } from 'zod';

export type ICreateContactDetailsRequest = z.infer<typeof CreateContactDetailsRequestSchema>
export const CreateContactDetailsRequestSchema = z.object({
	name: z.string().min(1).trim(),
	contactDetails: z.string().min(1).trim(),
	type: z.string().min(1).trim(),
	description: z.string().nullable().default(null),
	priorityIndex: z.string().min(1).trim(),
});

export type IUpdateContactDetailsRequest = z.infer<typeof UpdateContactDetailsRequestSchema>
export const UpdateContactDetailsRequestSchema = z.object({
	name: z.string().optional(),
	contactDetails: z.string().optional(),
	type: z.string().optional(),
	description: z.string().optional(),
	priorityIndex: z.string().optional(),
});
