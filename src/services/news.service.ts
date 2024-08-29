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
			const news = await this.newsModel.create(request);
			if (!news) {
				throw new Error('News creation failed');
			}
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.News,
				action: ActionsEnum.Create,
				action_id: (news._id || "").toString(),
			})
			return news;
		} catch (error) {
			throw error;
		}
	}
	async getNewsById(id: string) {
		try {
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
			const news = await this.newsModel.find({ deletedAt: null }).lean();
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
				news.content = request.content;
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
			})
			return updatedNews.toObject();
		} catch (error) {
			throw error;
		}
	}
	async deleteNews(id: string) {
		try {
			const news = await this.newsModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }).lean();
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.News,
				action: ActionsEnum.Delete,
				action_id: (id || "").toString(),
			})
			return news;
		} catch (error) {
			throw error;
		}
	}
}
