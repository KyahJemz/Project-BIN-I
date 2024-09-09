import { Model } from 'mongoose';
import { IPostDocument } from '@/models/posts';
import {
	ICreatePostRequest,
	IUpdatePostRequest,
} from '@/validation/post.validation';
import LogsModel from '@/models/logs';
import { LogsService } from './logs.service';
import { CollectionsEnum } from '@/enums/collections.enum';
import { ActionsEnum } from '@/enums/actions.enum';
import { ICreateLogsRequest } from '@/validation/logs.validation';
import { MongoDbConnect } from '@/utils/mongodb';

export class PostService {
	private readonly logsService: LogsService;
	constructor(
		private readonly postModel: Model<IPostDocument>,
		logsService: LogsService = new LogsService(LogsModel)
	) {
		this.logsService = logsService;
	}

	private async createLogs(request: ICreateLogsRequest) {
		return await this.logsService.createLogs(request);
	}

	async createPost(request: ICreatePostRequest) {
		try {
			await MongoDbConnect();
			if(request.content === "null") {
				request.content = "[]"
			}
			const post = await this.postModel.create(request);
			if (!post) {
				throw new Error('post creation failed');
			}
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.Posts,
				action: ActionsEnum.Create,
				action_id: (post._id || "").toString(),
				oldDocument: null,
				newDocument: JSON.stringify(post)
			})
			return post;
		} catch (error) {
			throw error;
		}
	}
	async getPostById(id: string) {
		try {
			await MongoDbConnect();
			const post = await this.postModel
				.findOne({ _id: id, deletedAt: null })
				.lean();
			if (!post) {
				throw new Error('No post found');
			}
			return post;
		} catch (error) {
			throw error;
		}
	}
	async getAllPosts() {
		try {
			await MongoDbConnect();
			const post = await this.postModel
				.find({ deletedAt: null })
				.sort({ createdAt: -1 })
				.lean();
			if (!post) {
				throw new Error('No post found');
			}
			return post;
		} catch (error) {
			throw error;
		}
	}
	async updatePost(id: string, request: IUpdatePostRequest) {
		try {
			await MongoDbConnect();
			const post = await this.postModel.findById(id);
			if (!post) {
				throw new Error('Post not found');
			}
			if (request.title !== undefined) {
				post.title = request.title;
			}
			if (request.author !== undefined) {
				post.author = request.author;
			}
			if (request.content !== undefined) {
				if (request.content === "null") {
					post.content = "[]";
				} else {
					post.content = request.content;
				}
			}
			if (request.image !== undefined) {
				post.image = request.image;
			}
			if (request.description !== undefined) {
				post.description = request.description;
			}
			const updatedPost = await post.save();
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.Posts,
				action: ActionsEnum.Update,
				action_id: (id || "").toString(),
				oldDocument: JSON.stringify(post),
				newDocument: JSON.stringify(updatedPost)
			})
			return updatedPost.toObject();
		} catch (error) {
			throw error;
		}
	}
	async deletePost(id: string) {
		try {
			await MongoDbConnect();
			const post = await this.postModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }).lean();
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.Posts,
				action: ActionsEnum.Delete,
				action_id: (id || "").toString(),
				oldDocument: JSON.stringify(post),
				newDocument: null
			})
			return post;
		} catch (error) {
			throw error;
		}
	}
}
