import { AccountTypeEnum } from '@/enums/accountType.enum';
import { IAccountDocument } from '@/models/accounts';
import {
	ICreateAccountRequest,
	ILoginRequest,
	IUpdateAccountRequest,
} from '@/validation/accounts.validation';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { LogsService } from './logs.service';
import LogsModel from '@/models/logs';
import { ICreateLogsRequest } from '@/validation/logs.validation';
import { ActionsEnum } from '@/enums/actions.enum';
import { CollectionsEnum } from '@/enums/collections.enum';
import { MongoDbConnect } from '@/utils/mongodb';

export class AccountService {
	private readonly logsService: LogsService;
	private readonly rqst: any;
	constructor(
		private readonly accountModel: Model<IAccountDocument>,
		private readonly rqst: any,
		logsService: LogsService = new LogsService(LogsModel)
	) {
		this.rqst = rqst;
		this.logsService = logsService;
	}

	private async createLogs(request: ICreateLogsRequest) {
		return await this.logsService.createLogs(request);
	}

	async createAccount(request: ICreateAccountRequest) {
		try {
			await MongoDbConnect();
			const existing = await this.getByEmail(request.email);
			if (existing) {
				throw new Error('Email already exists');
			}
			const account: IAccountDocument = await this.accountModel.create(request);
			if (!account) {
				throw new Error('Account creation failed');
			}
			await this.createLogs({
				account_id: this.rqst,
				actionCollection: CollectionsEnum.Accounts,
				action: ActionsEnum.Create,
				action_id: (account._id || "").toString(),
				oldDocument: null,
				newDocument: JSON.stringify(account)
			})
			return account;
		} catch (error) {
			throw error;
		}
	}
	async getAccountById(id: string) {
		try {
			await MongoDbConnect();
			const account = await this.accountModel
				.findOne({ _id: id, deletedAt: null })
				.lean();
			if (!account) {
				throw new Error('No account found');
			}
			return account;
		} catch (error) {
			throw error;
		}
	}
	async getAllAccounts() {
		try {
			await MongoDbConnect();
			const account = await this.accountModel
				.find({ deletedAt: null })
				.sort({ createdAt: -1 })
				.lean();
			if (!account) {
				throw new Error('No accounts found');
			}
			return account;
		} catch (error) {
			throw error;
		}
	}
	async updateAccount(id: string, request: IUpdateAccountRequest) {
		try {
			await MongoDbConnect();
			const account = await this.accountModel.findById(id);
			if (!account) {
				throw new Error('Account not found');
			}
			if (request.firstName !== undefined) {
				account.firstName = request.firstName;
			}
			if (request.lastName !== undefined) {
				account.lastName = request.lastName;
			}
			if (request.position !== undefined) {
				account.position = request.position;
			}
			if (request.department !== undefined) {
				account.department = request.department;
			}
			if (request.email !== undefined && request.email !== account.email) {
				const existing = await this.getByEmail(request.email);
				if (existing) {
					throw new Error('Email already exists');
				}
				account.email = request.email;
			}
			if (request.type !== undefined) {
				account.type = request.type as AccountTypeEnum;
			}
			if (request.token !== undefined) {
				account.token = request.token;
			}
			if (request.password !== undefined) {
				account.password = request.password;
			}
			const updatedAccount = await account.save();
			if (request.token !== undefined){
				return updatedAccount.toObject();
			}
			await this.createLogs({
				account_id: this.rqst,
				actionCollection: CollectionsEnum.Accounts,
				action: ActionsEnum.Update,
				action_id: (id || "").toString(),
				oldDocument: JSON.stringify(account),
				newDocument: JSON.stringify(updatedAccount)
			})
			return updatedAccount.toObject();
		} catch (error) {
			throw error;
		}
	}
	async validateAccount(request: ILoginRequest) {
		try {
			await MongoDbConnect();
			const account = await this.accountModel
				.findOne({ email: request.email })
				.lean();
			if (!account) {
				throw new Error('Account not found');
			}
			if (await bcrypt.compare(request.password, account.password)) {
				return account;
			} else {
				throw new Error('Invalid password');
			}
		} catch (error) {
			throw error;
		}
	}
	async getByEmail(string: string) {
		try {
			await MongoDbConnect();
			const account = await this.accountModel
				.findOne({ email: string })
				.lean();
			if (!account) {
				throw new Error('Account not found');
			}
			return account;
		} catch (error) {
			throw error;
		}
	}
	async changeAccountPassword(id: string, password: string) {
		try {
			await MongoDbConnect();
			const account = await this.accountModel.findById(id);
			if (!account) {
				throw new Error('Account not found');
			}
			account.password = password;
			const updatedAccount = await account.save();
			await this.createLogs({
				account_id: this.rqst,
				actionCollection: CollectionsEnum.Accounts,
				action: ActionsEnum.Update,
				action_id: (id || "").toString(),
				oldDocument: JSON.stringify(account),
				newDocument: JSON.stringify(updatedAccount)
			})
			return updatedAccount.toObject();
		} catch (error) {
			throw error;
		}
	}
	async deleteAccount(id: string) {
		try {
			await MongoDbConnect();
			const account = await this.accountModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }).lean();
			await this.createLogs({
				account_id: this.rqst,
				actionCollection: CollectionsEnum.Accounts,
				action: ActionsEnum.Delete,
				action_id: (id || "").toString(),
				oldDocument: JSON.stringify(account),
				newDocument: null
			})
			return account;
		} catch (error) {
			throw error;
		}
	}
}
