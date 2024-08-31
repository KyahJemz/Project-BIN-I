import { ISchedule } from '@/types/ISchedule.dto';
import { IScheduleSchedule } from '@/types/IScheduleSchedule';
import mongoose, { Schema, Document } from 'mongoose';

export interface IScheduleDocument extends ISchedule, Document {}

const scheduleSchema = new Schema<IScheduleSchedule>({
    frequency: {
        type: String,
        enum: ["weekly", "biweekly", "monthly"],
        required: true
    },
    interval: {
        type: Number,
        required: true
    },
    dayOfWeek: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        required: false
    },
    timeStart: {
        type: String,
        required: true
    },
    daysOfMonth: {
        type: [Number],
        required: false
    },
    specificDate: {
        type: String,
        required: false
    }
}, { _id: false });


const schedulesSchema: Schema<IScheduleDocument> = new Schema(
	{
		scheduleLocation: {
			type: String,
			required: true,
		},
		schedule: {
			type: scheduleSchema,
			required: true,
		},
		wasteType: {
			type: String,
			default: null,
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

const SchedulesModel =
	mongoose.models.Schedule ||
	mongoose.model<IScheduleDocument>('Schedule', schedulesSchema);

export default SchedulesModel;
