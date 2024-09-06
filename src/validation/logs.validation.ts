import { ActionsEnum } from '@/enums/actions.enum';
import { z } from 'zod';

export const ActionsEnumValues = Object.values(ActionsEnum) as string[];

export type ICreateLogsRequest = z.infer<typeof CreateLogsRequestSchema>
export const CreateLogsRequestSchema = z.object({
	account_id: z.string().min(1).trim(),
	actionCollection: z.string().min(1).trim(),
	action: z.string().min(1).trim(),
	action_id: z.string().min(1).trim(),
	oldDocument: z.string().optional().nullable(),
	newDocument: z.string().optional().nullable(),
});

export type IUpdateLogsRequest = z.infer<typeof UpdateLogsRequestSchema>
export const UpdateLogsRequestSchema = z.object({
	account_id: z.string().optional(),
	actionCollection: z.string().optional(),
	action: z.string().optional(),
	action_id: z.string().optional(),
	oldDocument: z.string().optional().nullable(),
	newDocument: z.string().optional().nullable(),
});
