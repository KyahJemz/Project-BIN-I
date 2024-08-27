import { z } from "zod";

export interface ICreateRoutesRequest extends z.infer<typeof CreateRoutesRequestSchema> { }
export const CreateRoutesRequestSchema = z.object({
    schedule_id: z.string().min(1).trim(),
    routeName: z.string().min(1).trim(),
    pickupPoints: z.array(z.object({
        lat: z.number(),
        lng: z.number()
    })),
    description: z.string().optional().nullable().default(null),
    status: z.string().min(1).trim(),
    notes: z.string().optional().nullable().default(null),
});

export interface IUpdateRoutesRequest extends z.infer<typeof UpdateRoutesRequestSchema> { }
export const UpdateRoutesRequestSchema = z.object({
    schedule_id: z.string().optional(),
    routeName: z.string().optional(),
    pickupPoints: z.array(z.object({
        lat: z.number(),
        lng: z.number()
    })).optional(),
    description: z.string().optional(),
    status: z.string().optional(),
    notes: z.string().optional(),
});