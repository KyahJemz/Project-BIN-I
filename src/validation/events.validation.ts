import { z } from "zod";

export interface ICreateEventRequest extends z.infer<typeof CreateEventRequestSchema> { }
export const CreateEventRequestSchema = z.object({
    title: z.string().min(1).trim(),
    author: z.string().min(1).trim(),
    content: z.string().min(1).trim(),
    image: z.string().min(1).trim(),
    eventDate: z.string().min(1).trim(),
    eventTime: z.string().min(1).trim(),
    status: z.string().min(1).trim(),
});

export interface IUpdateEventRequest extends z.infer<typeof UpdateEventRequestSchema> { }
export const UpdateEventRequestSchema = z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    content: z.string().optional(),
    image: z.string().optional(),
    eventDate: z.string().optional(),
    eventTime: z.string().optional(),
    status: z.string().optional(),
});
