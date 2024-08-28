import { Model } from "mongoose";
import { IEventDocument } from "@/models/events";
import { ICreateEventRequest, IUpdateEventRequest } from "@/validation/events.validation";
import { EventStatusEnum } from "@/enums/eventStatus.enum";

export class EventService {
    constructor(private readonly eventModel: Model<IEventDocument>) {}
    
    async createEvent (request: ICreateEventRequest) {
        try {
            const event = await this.eventModel.create(request);
            if (!event) {
                throw new Error('Event creation failed');
            }
            return event;
        } catch (error) {
            throw error;
        }
    }
    async getEventById (id: string) {
        try {
            const event = await this.eventModel.findOne({ _id: id, deletedAt: null }).lean();
            if (!event) {
                throw new Error('No event found');
            }
            return event;
        } catch (error) {
            throw error;
        }
    }
    async getAllEvent () {
        try {
            const event = await this.eventModel.find({deletedAt: null}).lean();
            if (!event) {
                throw new Error('No events found');
            }
            return event;
        } catch (error) {
            throw error;
        }
    }
    async updateEvent(id: string, request: IUpdateEventRequest) {
        try {
            const event = await this.eventModel.findById(id);
            if (!event) {
                throw new Error('Event not found');
            }
            if (request.title !== undefined) {
                event.title = request.title;
            }
            if (request.author !== undefined) {
                event.author = request.author;
            }
            if (request.content !== undefined) {
                event.content = request.content;
            }
            if (request.image !== undefined) {
                event.image = request.image;
            }
            if (request.eventDate !== undefined) {
                event.eventDate = new Date(request.eventDate);
            }
            if (request.eventTime !== undefined) {
                event.eventTime = request.eventTime;
            }
            if (request.status !== undefined) {
                event.status = request.status as EventStatusEnum;
            }
            const updatedEvent = await event.save();
            return updatedEvent.toObject(); 
        } catch (error) {
            throw error;
        }
    }
    async deleteEvent (id: string) {
        const event = await this.eventModel.findByIdAndUpdate(id, {deletedAt: new Date()}, { new: true }).lean();
        try {
            return event;
        } catch (error) {
            throw error;
        }
    }
}