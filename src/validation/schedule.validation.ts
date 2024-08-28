import { z } from "zod";

export interface ICreateScheduleRequest extends z.infer<typeof CreateScheduleRequestSchema> { }
export const CreateScheduleRequestSchema = z.object({
    schedule: z.string().min(1).trim(),
    scheduleLocation: z.string().min(1).trim(),
    wasteType: z.string().min(1).trim(),
    status: z.string().min(1).trim(),
    notes: z.string().optional().nullable().default(null),
});

export interface IUpdateScheduleRequest extends z.infer<typeof UpdateScheduleRequestSchema> { }
export const UpdateScheduleRequestSchema = z.object({
    schedule: z.string().optional(),
    scheduleLocation: z.string().optional(),
    wasteType: z.string().optional(),
    status: z.string().optional(),
    notes: z.string().optional(),
});