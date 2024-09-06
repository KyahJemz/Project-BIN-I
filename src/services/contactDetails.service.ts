import { Model } from 'mongoose';
import { IContactDetailsDocument } from '@/models/contactDetails';
import {
	ICreateContactDetailsRequest,
	IUpdateContactDetailsRequest,
} from '@/validation/contactDetails.validation';
import LogsModel from '@/models/logs';
import { LogsService } from './logs.service';
import { ICreateLogsRequest } from '@/validation/logs.validation';
import { ActionsEnum } from '@/enums/actions.enum';
import { CollectionsEnum } from '@/enums/collections.enum';
import { MongoDbConnect } from '@/utils/mongodb';

export class ContactDetailsService {
	private readonly logsService: LogsService;
	constructor(
		private readonly contactDetailsModel: Model<IContactDetailsDocument>,
		logsService: LogsService = new LogsService(LogsModel)
	) {
		this.logsService = logsService;
	}

	private async createLogs(request: ICreateLogsRequest) {
		return await this.logsService.createLogs(request);
	}

	async createContactDetails(request: ICreateContactDetailsRequest) {
		try {
			await MongoDbConnect();
			const contactDetails =
				await this.contactDetailsModel.create(request);
			if (!contactDetails) {
				throw new Error('Contact Details creation failed');
			}
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.ContactDetails,
				action: ActionsEnum.Create,
				action_id: (contactDetails._id || "").toString(),
				oldDocument: null,
				newDocument: JSON.stringify(contactDetails)
			})
			return contactDetails;
		} catch (error) {
			throw error;
		}
	}
	async getContactDetailsById(id: string) {
		try {
			await MongoDbConnect();
			const contactDetails = await this.contactDetailsModel
				.findOne({ _id: id, deletedAt: null })
				.lean();
			if (!contactDetails) {
				throw new Error('No Contact Details found');
			}
			return contactDetails;
		} catch (error) {
			throw error;
		}
	}
	async getAllContactDetails() {
		try {
			await MongoDbConnect();
			const contactDetails = await this.contactDetailsModel
				.find({ deletedAt: null })
				.lean();
			if (!contactDetails) {
				throw new Error('No Contact Details found');
			}
			return contactDetails;
		} catch (error) {
			throw error;
		}
	}
	async updateContactDetails(
		id: string,
		request: IUpdateContactDetailsRequest,
	) {
		try {
			await MongoDbConnect();
			const contactDetails = await this.contactDetailsModel.findById(id);
			if (!contactDetails) {
				throw new Error('ContactDetails not found');
			}
			if (request.name !== undefined) {
				contactDetails.name = request.name;
			}
			if (request.contactDetails !== undefined) {
				contactDetails.contactDetails = request.contactDetails;
			}
			if (request.type !== undefined) {
				contactDetails.type = request.type;
			}
			if (request.description !== undefined) {
				contactDetails.description = request.description;
			}
			if (request.priorityIndex !== undefined) {
				contactDetails.priorityIndex = +request.priorityIndex;
			}
			const updatedContactDetails = await contactDetails.save();
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.ContactDetails,
				action: ActionsEnum.Update,
				action_id: (id || "").toString(),
				oldDocument: JSON.stringify(contactDetails),
				newDocument: JSON.stringify(updatedContactDetails)
			})
			return updatedContactDetails.toObject();
		} catch (error) {
			throw error;
		}
	}
	async deleteContactDetails(id: string) {
		try {
			await MongoDbConnect();
			const contactDetails = await this.contactDetailsModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }).lean();
			await this.createLogs({
				account_id: "ADMIN_ACCOUNT",
				actionCollection: CollectionsEnum.ContactDetails,
				action: ActionsEnum.Delete,
				action_id: (id || "").toString(),
				oldDocument: JSON.stringify(contactDetails),
				newDocument: null
			})
			return contactDetails;
		} catch (error) {
			throw error;
		}
	}
}
