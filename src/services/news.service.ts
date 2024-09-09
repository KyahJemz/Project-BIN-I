import { Model } from 'mongoose';
import { INewsDocument } from '@/models/news';
import {
	ICreateNewsRequest,
	IUpdateNewsRequest,
} from '@/validation/news.validation';
import LogsModel from '@/models/logs';
import { LogsService } from './logs.service';
import { ICreateLogsRequest } from '@/validation/logs.validation';
import { CollectionsEnum } from '@/enums/collections.enum';
import { ActionsEnum } from '@/enums/actions.enum';
import { MongoDbConnect } from '@/utils/mongodb';
export class NewsService {
	private readonly logsService: LogsService;
	constructor(private readonly newsModel: Model<INewsDocument>,		
		logsService: LogsService = new LogsService(LogsModel)
	) {
		this.logsService = logsService;
	}

	private async createLogs(request: ICreateLogsRequest) {
		return await this.logsService.createLogs(request);
	}

	async createNews(request: ICreateNewsRequest) {
		try {
			await MongoDbConnect();
			if(request.content === "null") {
				request.content = "[]"
			}
			const news = await this.newsModel.create(request);
			if (!news) {
				throw new Error('News creation failed');
			}
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.News,
				action: ActionsEnum.Create,
				action_id: (news._id || "").toString(),
				oldDocument: null,
				newDocument: JSON.stringify(news),
			})
			return news;
		} catch (error) {
			throw error;
		}
	}
	async getNewsById(id: string) {
		try {
			await MongoDbConnect();
			const news = await this.newsModel
				.findOne({ _id: id, deletedAt: null })
				.lean();
			if (!news) {
				throw new Error('No news found');
			}
			return news;
		} catch (error) {
			throw error;
		}
	}
	async getAllNews() {
		try {
			await MongoDbConnect();
			const news = await this.newsModel
				.find({ deletedAt: null })
				.sort({ createdAt: -1 })
				.lean();
			if (!news) {
				throw new Error('No news found');
			}
			return news;
		} catch (error) {
			throw error;
		}
	}
	async updateNews(id: string, request: IUpdateNewsRequest) {
		try {
			await MongoDbConnect();
			const news = await this.newsModel.findById(id);
			if (!news) {
				throw new Error('News not found');
			}
			if (request.title !== undefined) {
				news.title = request.title;
			}
			if (request.author !== undefined) {
				news.author = request.author;
			}
			if (request.content !== undefined) {
				if (request.content === "null") {
					news.content = "[]";
				} else {
					news.content = request.content;
				}
			}
			if (request.image !== undefined) {
				news.image = request.image;
			}
			const updatedNews = await news.save();
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.News,
				action: ActionsEnum.Update,
				action_id: (id || "").toString(),
				oldDocument: JSON.stringify(news),
				newDocument: JSON.stringify(updatedNews)
			})
			return updatedNews.toObject();
		} catch (error) {
			throw error;
		}
	}
	async deleteNews(id: string) {
		try {
			await MongoDbConnect();
			const news = await this.newsModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }).lean();
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.News,
				action: ActionsEnum.Delete,
				action_id: (id || "").toString(),
				oldDocument: JSON.stringify(news),
				newDocument: null
			})
			return news;
		} catch (error) {
			throw error;
		}
	}
}
