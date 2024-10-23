import { z } from 'zod';

export type ICreateTutorialRequest = z.infer<typeof CreateTutorialRequestSchema>
export const CreateTutorialRequestSchema = z.object({
	firstName: z.string().min(1).trim(), 
	lastName: z.string().min(1).trim(), 
	middleName: z.string().optional().nullable(), 
	email: z.string().email().optional().nullable(),  
	password: z.string().min(8).trim(),
	token: z.string().optional().nullable().default(null),  
	progress: z.array(
		z.object({
			tutorial_id: z.string().min(1).trim(),  
			count: z.number().min(0).optional().default(0), 
			dateCompleted: z.date().optional().nullable().default(null),
			certificateLink: z.string().optional().nullable().default(null)  
		})
	).optional(),
	deletedAt: z.date().optional().nullable().default(null),
});

export type IUpdateTutorialProgressRequest = z.infer<typeof UpdateTutorialProgressRequest>
export const UpdateTutorialProgressRequest = z.object({
	progress: z.array(
		z.object({
			tutorial_id: z.string().min(1).trim(),  
			count: z.number().min(0).optional().default(0), 
			dateCompleted: z.date().optional().nullable().default(null),
			certificateLink: z.string().optional().nullable().default(null)  
		})
	).optional(),
});

export type IChangeTutorialPasswordRequest = z.infer<typeof ChangeTutorialPasswordRequestSchema>
export const ChangeTutorialPasswordRequestSchema = z
	.object({
		oldPassword: z.string().min(8),
		newPassword: z.string().min(8),
	})
	.refine((data) => data.oldPassword !== data.newPassword, {
		message: 'New password must be different from the old password',
		path: ['newPassword'],
	});

export type ILoginRequest = z.infer<typeof LoginRequestSchema>
export const LoginRequestSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export type IUpdateTutorialStatusRequest = z.infer<typeof UpdateTutorialStatusRequest>;
export const UpdateTutorialStatusRequest = z.object({
	tutorial_status: z.object({
		completers: z.number().optional(),
		ongoing: z.number().optional(),
	}).optional(),
});
