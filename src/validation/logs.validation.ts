import { ActionsEnum } from "@/enums/actions.enum";
import { z } from "zod";

export const ActionsEnumValues = Object.values(ActionsEnum) as string[];

export interface ICreateLogsRequest extends z.infer<typeof CreateLogsRequestSchema> { }
export const CreateLogsRequestSchema = z.object({
    account_id: z.string().min(1).trim(),
    actionCollection: z.string().min(1).trim(),
    action: z.string().min(1).trim(),
    action_id: z.string().min(1).trim(),
});

export interface IUpdateLogsRequest extends z.infer<typeof UpdateLogsRequestSchema> { }
export const UpdateLogsRequestSchema = z.object({
    account_id: z.string().optional(),
    actionCollection: z.string().optional(),
    action: z.string().optional(),
    action_id: z.string().optional(),
});