import { z } from "zod";

export interface ICreateAnnouncementRequest extends z.infer<typeof CreateAnnouncementRequestSchema> { }
export const CreateAnnouncementRequestSchema = z.object({
    title: z.string().min(1).trim(),
    author: z.string().min(1).trim(),
    content: z.string().min(1).trim(),
    image: z.string().min(1).trim(),
});

export interface IUpdateAnnouncementRequest extends z.infer<typeof UpdateAnnouncementRequestSchema> { }
export const UpdateAnnouncementRequestSchema = z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    content: z.string().optional(),
    image: z.string().optional(),
});
