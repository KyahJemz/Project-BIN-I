import { Model, Schema } from 'mongoose';
import { IScheduleDocument } from '@/models/schedules';
import {
	ICreateScheduleRequest,
	IUpdateScheduleRequest,
} from '@/validation/schedule.validation';
import LogsModel from '@/models/logs';
import { LogsService } from './logs.service';
import { ICreateLogsRequest } from '@/validation/logs.validation';
import { ActionsEnum } from '@/enums/actions.enum';
import { CollectionsEnum } from '@/enums/collections.enum';
import { MongoDbConnect } from '@/utils/mongodb';

export class ScheduleService {
	private readonly logsService: LogsService;
	constructor(private readonly scheduleModel: Model<IScheduleDocument>,
		logsService: LogsService = new LogsService(LogsModel)
	) {
		this.logsService = logsService;
	}

	private async createLogs(request: ICreateLogsRequest) {
		return await this.logsService.createLogs(request);
	}

	async createSchedule(request: ICreateScheduleRequest) {
		try {
			await MongoDbConnect();
			const schedule = await this.scheduleModel.create(request);
			if (!schedule) {
				throw new Error('Schedule creation failed');
			}
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.Schedules,
				action: ActionsEnum.Create,
				action_id: (schedule._id || "").toString(),
			})
			return schedule;
		} catch (error) {
			throw error;
		}
	}
	async getScheduleById(id: string) {
		try {
			await MongoDbConnect();
			const schedule = await this.scheduleModel
				.findOne({ _id: id, deletedAt: null })
				.lean();
			if (!schedule) {
				throw new Error('No schedule found');
			}
			return schedule;
		} catch (error) {
			throw error;
		}
	}
	async getAllSchedules() {
		try {
			await MongoDbConnect();
			const schedule = await this.scheduleModel
				.find({ deletedAt: null })
				.lean();
			if (!schedule) {
				throw new Error('No schedules found');
			}
			return schedule;
		} catch (error) {
			throw error;
		}
	}
	async updateSchedule(id: string, request: IUpdateScheduleRequest) {
		try {
			await MongoDbConnect();
			const schedule = await this.scheduleModel.findById(id);
			if (!schedule) {
				throw new Error('Schedule not found');
			}
			if (request.schedule !== undefined) {
				schedule.schedule = request.schedule;
			}
			if (request.scheduleLocation !== undefined) {
				schedule.scheduleLocation = request.scheduleLocation;
			}
			if (request.wasteType !== undefined) {
				schedule.wasteType = request.wasteType;
			}
			if (request.status !== undefined) {
				schedule.status = request.status;
			}
			if (request.notes !== undefined) {
				schedule.notes = request.notes;
			}
			const updatedSchedule = await schedule.save();
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.Schedules,
				action: ActionsEnum.Update,
				action_id: (id || "").toString(),
			})
			return updatedSchedule.toObject();
		} catch (error) {
			throw error;
		}
	}
	async deleteSchedule(id: string) {
		try {
			await MongoDbConnect();
			const schedule = await this.scheduleModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }).lean();
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.Schedules,
				action: ActionsEnum.Delete,
				action_id: (id || "").toString(),
			})
			return schedule;
		} catch (error) {
			throw error;
		}
	}
}