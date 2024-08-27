import { Schema } from "mongoose";

export interface IAnnouncement {
    title: string;
    author: string;
    content: string;
    image: string;
}