import { ISchedule } from '@/types/ISchedule.dto';
import mongoose, { Schema } from 'mongoose';

export interface IScheduleDocument extends ISchedule, Document {}

const schedulesSchema: Schema<IScheduleDocument> = new Schema(
	{
		schedule: {
			type: String,
			required: true,
		},
		scheduleLocation: {
			type: String,
			required: true,
		},
		wasteType: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		notes: {
			type: String,
			default: null,
		},
		deletedAt: {
			type: Date,
			default: null,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

const SchedulesModel = mongoose.model<IScheduleDocument>(
	'Schedule',
	schedulesSchema,
);

export default SchedulesModel;
