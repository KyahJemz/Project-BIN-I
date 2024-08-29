import { Model } from 'mongoose';
import { INewsDocument } from '@/models/news';
import {
	ICreateNewsRequest,
	IUpdateNewsRequest,
} from '@/validation/news.validation';
export class NewsService {
	constructor(private readonly newsModel: Model<INewsDocument>) {}

	async createNews(request: ICreateNewsRequest) {
		try {
			const news = await this.newsModel.create(request);
			if (!news) {
				throw new Error('News creation failed');
			}
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
			return updatedNews.toObject();
		} catch (error) {
			throw error;
		}
	}
	async deleteNews(id: string) {
		const news = await this.newsModel
			.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
			.lean();
		try {
			return news;
		} catch (error) {
			throw error;
		}
	}
}
