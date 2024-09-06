import { Model } from 'mongoose';
import { IEventDocument } from '@/models/events';
import {
	ICreateEventRequest,
	IUpdateEventRequest,
} from '@/validation/events.validation';
import { EventStatusEnum } from '@/enums/eventStatus.enum';
import LogsModel from '@/models/logs';
import { LogsService } from './logs.service';
import { ICreateLogsRequest } from '@/validation/logs.validation';
import { ActionsEnum } from '@/enums/actions.enum';
import { CollectionsEnum } from '@/enums/collections.enum';
import { MongoDbConnect } from '@/utils/mongodb';

export class EventService {
	private readonly logsService: LogsService;
	constructor(private readonly eventModel: Model<IEventDocument>,
		logsService: LogsService = new LogsService(LogsModel)
	) {
		this.logsService = logsService;
	}

	private async createLogs(request: ICreateLogsRequest) {
		return await this.logsService.createLogs(request);
	}

	async createEvent(request: ICreateEventRequest) {
		try {
			await MongoDbConnect();
			if(request.content === "null") {
				request.content = "[]"
			}
			const event = await this.eventModel.create(request);
			if (!event) {
				throw new Error('Event creation failed');
			}
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.Events,
				action: ActionsEnum.Create,
				action_id: (event._id || "").toString(),
				oldDocument: null,
				newDocument: JSON.stringify(event)
			})
			return event;
		} catch (error) {
			throw error;
		}
	}
	async getEventById(id: string) {
		try {
			await MongoDbConnect();
			const event = await this.eventModel
				.findOne({ _id: id, deletedAt: null })
				.lean();
			if (!event) {
				throw new Error('No event found');
			}
			return event;
		} catch (error) {
			throw error;
		}
	}
	async getAllEvent() {
		try {
			await MongoDbConnect();
			const event = await this.eventModel
				.find({ deletedAt: null })
				.lean();
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
			await MongoDbConnect();
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
				if (request.content === "null") {
					event.content = "[]";
				} else {
					event.content = request.content;
				}
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
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.Events,
				action: ActionsEnum.Update,
				action_id: (id || "").toString(),
				oldDocument: JSON.stringify(event),
				newDocument: JSON.stringify(updatedEvent)
			})
			return updatedEvent.toObject();
		} catch (error) {
			throw error;
		}
	}
	async deleteEvent(id: string) {
		try {
			await MongoDbConnect();
			const event = await this.eventModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }).lean();
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.Events,
				action: ActionsEnum.Delete,
				action_id: (id || "").toString(),
				oldDocument: JSON.stringify(event),
				newDocument: null
			})
			return event;
		} catch (error) {
			throw error;
		}
	}
}
