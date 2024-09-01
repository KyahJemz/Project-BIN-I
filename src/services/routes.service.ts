import { Model, Schema } from 'mongoose';
import { IRoutesDocument } from '@/models/routes';
import {
	ICreateRoutesRequest,
	IUpdateRoutesRequest,
} from '@/validation/routes.validation';
import { RouteStatusEnum } from '@/enums/routeStatus.enum';
import LogsModel from '@/models/logs';
import { LogsService } from './logs.service';
import { ICreateLogsRequest } from '@/validation/logs.validation';
import { CollectionsEnum } from '@/enums/collections.enum';
import { ActionsEnum } from '@/enums/actions.enum';
import { MongoDbConnect } from '@/utils/mongodb';
export class RoutesService {
	private readonly logsService: LogsService;
	constructor(private readonly routesModel: Model<IRoutesDocument>,
		logsService: LogsService = new LogsService(LogsModel)
	) {
		this.logsService = logsService;
	}

	private async createLogs(request: ICreateLogsRequest) {
		return await this.logsService.createLogs(request);
	}

	async createRoute(request: ICreateRoutesRequest) {
		try {
			await MongoDbConnect();
			const routes = await this.routesModel.create(request);
			if (!routes) {
				throw new Error('Routes creation failed');
			}
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.Routes,
				action: ActionsEnum.Create,
				action_id: (routes._id || "").toString(),
			})
			return routes;
		} catch (error) {
			throw error;
		}
	}
	async getRouteById(id: string) {
		try {
			await MongoDbConnect();
			const routes = await this.routesModel
				.findOne({ _id: id, deletedAt: null })
				.lean();
			if (!routes) {
				throw new Error('No routes found');
			}
			return routes;
		} catch (error) {
			throw error;
		}
	}
	async getAllRoutes() {
		try {
			await MongoDbConnect();
			const routes = await this.routesModel
				.find({ deletedAt: null })
				.lean();
			if (!routes) {
				throw new Error('No routes found');
			}
			return routes;
		} catch (error) {
			throw error;
		}
	}
	async getRouteByScheduleId(id: string) {
		try {
			await MongoDbConnect();
			const routes = await this.routesModel
				.findOne({ schedule_id: id, deletedAt: null })
				.lean();
			if (!routes) {
				throw new Error('No routes found');
			}
			return routes;
		} catch (error) {
			throw error;
		}
	}
	async updateRoute(id: string, request: IUpdateRoutesRequest) {
		try {
			await MongoDbConnect();
			const routes = await this.routesModel.findById(id);
			if (!routes) {
				throw new Error('Routes not found');
			}
			if (request.schedule_id !== undefined) {
				routes.schedule_id = new Schema.Types.ObjectId(
					request.schedule_id,
				);
			}
			if (request.routeName !== undefined) {
				routes.routeName = request.routeName;
			}
			if (request.pickupPoints !== undefined) {
				routes.pickupPoints = request.pickupPoints;
			}
			if (request.description !== undefined) {
				routes.description = request.description;
			}
			if (request.status !== undefined) {
				routes.status = request.status as RouteStatusEnum;
			}
			if (request.notes !== undefined) {
				routes.notes = request.notes;
			}
			const updatedRoutes = await routes.save();
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.Routes,
				action: ActionsEnum.Update,
				action_id: (id || "").toString(),
			})
			return updatedRoutes.toObject();
		} catch (error) {
			throw error;
		}
	}
	async deleteRoute(id: string) {
		try {
			await MongoDbConnect();
			const routes = await this.routesModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }).lean();
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.Routes,
				action: ActionsEnum.Delete,
				action_id: (id || "").toString(),
			})
			return routes;
		} catch (error) {
			throw error;
		}
	}
}
