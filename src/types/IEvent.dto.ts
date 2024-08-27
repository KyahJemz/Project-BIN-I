import { EventStatusEnum } from "@/enums/eventStatus.enum";
import { Schema } from "mongoose";

export interface IEvent {
    title: string;
    author: string;
    content: string;
    image: string;
    eventDate: Date;
    eventTime: string;
    status: EventStatusEnum;
    deletedAt?: Date | null;
}