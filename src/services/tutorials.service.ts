import { ITutorialDocument } from '@/models/tutorials';
import { Model } from 'mongoose';
import { MongoDbConnect } from '@/utils/mongodb';
import { IUpdateTutorialStatusRequest } from '@/validation/tutorials.validation';

export class TutorialsService {
	private readonly rqst: any;
	constructor(
		private readonly tutorialModel: Model<ITutorialDocument>,
		private readonly rqst: any,
	) {
		this.rqst = rqst;
	}

	async getTutorialById(id: string) {
		try {
			await MongoDbConnect();
			const tutorial = await this.tutorialModel
				.findOne({ _id: id, deletedAt: null })
				.lean();
			if (!tutorial) {
				throw new Error('No tutorial found');
			}
			return tutorial;
		} catch (error) {
			throw error;
		}
	}
	
	async getAllTutorials() {
		try {
			await MongoDbConnect();
			const tutorial = await this.tutorialModel
				.find({ deletedAt: null })
				.sort({ createdAt: -1 })
				.lean();
			if (!tutorial) {
				throw new Error('No tutorials found');
			}
			return tutorial;
		} catch (error) {
			throw error;
		}
	}

	async getCertificateById(id: string) {
		try {
			await MongoDbConnect();
			const tutorial = await this.tutorialModel
				.findOne({ _id: id, deletedAt: null })
				.lean();
			if (!tutorial) {
				throw new Error('No tutorial found');
			}
			return tutorial;
		} catch (error) {
			throw error;
		}
	}

	async updateTutorialStatus(id: string, request: IUpdateTutorialStatusRequest) {
		try {
			await MongoDbConnect();
			const tutorial = await this.tutorialModel.findById(id);
			if (!tutorial) {
				throw new Error('Tutorial not found');
			}
			if (request.tutorial_status) {
				tutorial.tutorial_status.completers = request.tutorial_status.completers ?? tutorial.tutorial_status.completers;
				tutorial.tutorial_status.ongoing = request.tutorial_status.ongoing ?? tutorial.tutorial_status.ongoing;
			}	
			const updatedTutorial = await tutorial.save();
			return updatedTutorial.toObject();
		} catch (error) {
			throw error;
		}
	}
}
