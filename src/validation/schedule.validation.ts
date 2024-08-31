import { z } from 'zod';

export const ScheduleSchema = z.object({
    frequency: z.enum(["weekly", "biweekly", "monthly"]),
    interval: z.number(),
    dayOfWeek: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]).optional(),
    timeStart: z.string(),
    daysOfMonth: z.array(z.number()).optional(),
    specificDate: z.string().optional().nullable(),
});

export const CreateScheduleRequestSchema = z.object({
    schedule: ScheduleSchema,
    scheduleLocation: z.string().min(1).trim(),
    wasteType: z.string().optional(),
    status: z.string().min(1).trim(),
    notes: z.string().optional().nullable().default(null),
});

export type ICreateScheduleRequest = z.infer<typeof CreateScheduleRequestSchema>;

export const UpdateScheduleRequestSchema = z.object({
    schedule: ScheduleSchema.optional(),
    scheduleLocation: z.string().optional(),
    wasteType: z.string().optional(),
    status: z.string().optional(),
    notes: z.string().optional().nullable(),
});

export type IUpdateScheduleRequest = z.infer<typeof UpdateScheduleRequestSchema>;
