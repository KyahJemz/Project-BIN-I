import { IPost } from '@/types/IPost.dto';
import mongoose, { Schema, Document } from 'mongoose';

export interface IPostDocument extends IPost, Document {}

const postSchema: Schema<IPostDocument> = new Schema(
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
			required: false,
		},
		image: {
			type: String,
			required: false,
		},
		deletedAt: {
			type: Date,
			default: null,
		}
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

const PostsModel =
	mongoose.models.Post ||
	mongoose.model<IPostDocument>('Post', postSchema);

export default PostsModel;
