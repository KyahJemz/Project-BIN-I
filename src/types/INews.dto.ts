import { Schema } from "mongoose";

export interface INews {
    title: string;
    author: string;
    content: string; 
    image: string;
    deletedAt?: Date | null;
}
  