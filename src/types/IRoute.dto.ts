import { Schema } from 'mongoose';
import { ICoordinates } from './ICoordinates.dto';
import { RouteStatusEnum } from '@/enums/routeStatus.enum';

export interface IRoute {
	schedule_id: Schema.Types.ObjectId | null;
	routeName: string;
	pickupPoints: number[][];
	description?: string | null;
	status: RouteStatusEnum;
	notes?: string | null;
	deletedAt?: Date | null;
}
