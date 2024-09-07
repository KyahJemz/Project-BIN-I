import { EventStatusEnum } from '@/enums/eventStatus.enum';
import { IEvent } from '@/types/IEvent.dto';
import mongoose, { Schema, Document } from 'mongoose';

export interface IEventDocument extends IEvent, Document {}

const eventsSchema: Schema<IEventDocument> = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		eventDate: {
			type: Date,
			required: true,
		},
		eventTime: {
			type: String,
			required: true,
		},
		eventLocation: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: Object.values(EventStatusEnum),
			required: true,
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

const EventsModel =
	mongoose.models.Event ||
	mongoose.model<IEventDocument>('Event', eventsSchema);

export default EventsModel;
