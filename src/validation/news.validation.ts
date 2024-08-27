import { z } from "zod";

export interface ICreateNewsRequest extends z.infer<typeof CreateNewsRequestSchema> { }
export const CreateNewsRequestSchema = z.object({
    title: z.string().min(1).trim(),
    author: z.string().min(1).trim(),
    content: z.string().min(1).trim(),
    image: z.string().min(1).trim(),
});

export interface IUpdateNewsRequest extends z.infer<typeof UpdateNewsRequestSchema> { }
export const UpdateNewsRequestSchema = z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    content: z.string().optional(),
    image: z.string().optional(),
});
