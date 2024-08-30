import { INews } from '@/types/INews.dto';
import mongoose, { Schema, Document } from 'mongoose';

export interface INewsDocument extends INews, Document {}

const newsSchema: Schema<INewsDocument> = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
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

const NewsModel =
	mongoose.models.News ||
	mongoose.model<INewsDocument>('News', newsSchema);

export default NewsModel;
