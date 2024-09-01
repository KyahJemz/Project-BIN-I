import { Model } from 'mongoose';
import { IAnnouncementDocument } from '@/models/announcements';
import {
	ICreateAnnouncementRequest,
	IUpdateAnnouncementRequest,
} from '@/validation/announcements.validation';
import LogsModel from '@/models/logs';
import { LogsService } from './logs.service';
import { CollectionsEnum } from '@/enums/collections.enum';
import { ActionsEnum } from '@/enums/actions.enum';
import { ICreateLogsRequest } from '@/validation/logs.validation';
import { MongoDbConnect } from '@/utils/mongodb';

export class AnnouncementService {
	private readonly logsService: LogsService;
	constructor(
		private readonly announcementModel: Model<IAnnouncementDocument>,
		logsService: LogsService = new LogsService(LogsModel)
	) {
		this.logsService = logsService;
	}

	private async createLogs(request: ICreateLogsRequest) {
		return await this.logsService.createLogs(request);
	}

	async createAnnouncement(request: ICreateAnnouncementRequest) {
		try {
			await MongoDbConnect();
			const announcement = await this.announcementModel.create(request);
			if (!announcement) {
				throw new Error('announcement creation failed');
			}
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.Announcements,
				action: ActionsEnum.Create,
				action_id: (announcement._id || "").toString(),
			})
			return announcement;
		} catch (error) {
			throw error;
		}
	}
	async getAnnouncementById(id: string) {
		try {
			await MongoDbConnect();
			const announcement = await this.announcementModel
				.findOne({ _id: id, deletedAt: null })
				.lean();
			if (!announcement) {
				throw new Error('No announcement found');
			}
			return announcement;
		} catch (error) {
			throw error;
		}
	}
	async getAllAnnouncements() {
		try {
			await MongoDbConnect();
			const announcement = await this.announcementModel
				.find({ deletedAt: null })
				.lean();
			if (!announcement) {
				throw new Error('No announcement found');
			}
			return announcement;
		} catch (error) {
			throw error;
		}
	}
	async updateAnnouncement(id: string, request: IUpdateAnnouncementRequest) {
		try {
			await MongoDbConnect();
			const announcement = await this.announcementModel.findById(id);
			if (!announcement) {
				throw new Error('Announcement not found');
			}
			if (request.title !== undefined) {
				announcement.title = request.title;
			}
			if (request.author !== undefined) {
				announcement.author = request.author;
			}
			if (request.content !== undefined) {
				announcement.content = request.content;
			}
			if (request.image !== undefined) {
				announcement.image = request.image;
			}
			const updatedAnnouncement = await announcement.save();
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.Announcements,
				action: ActionsEnum.Update,
				action_id: (id || "").toString(),
			})
			return updatedAnnouncement.toObject();
		} catch (error) {
			throw error;
		}
	}
	async deleteAnnouncement(id: string) {
		try {
			await MongoDbConnect();
			const announcement = await this.announcementModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }).lean();
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.Announcements,
				action: ActionsEnum.Update,
				action_id: (id || "").toString(),
			})
			return announcement;
		} catch (error) {
			throw error;
		}
	}
}
