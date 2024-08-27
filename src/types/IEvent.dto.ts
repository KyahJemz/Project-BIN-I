import { EventStatusEnum } from "@/enums/eventStatus.enum";

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