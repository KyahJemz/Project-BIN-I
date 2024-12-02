import { IUserDocument } from '@/models/users';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { MongoDbConnect } from '@/utils/mongodb';
import { ILoginRequest, IUpdateUserProgressRequest, IUpdateUserRequest } from '@/validation/users.validation';
import { ICreateUserRequest } from '@/validation/users.validation';
import { TutorialsService } from './tutorials.service';
import TutorialModel from '@/models/tutorials';
import { CollectionsEnum } from '@/enums/collections.enum';
import { ActionsEnum } from '@/enums/actions.enum';
import LogsModel from '@/models/logs';
import { LogsService } from './logs.service';
import { ICreateLogsRequest } from '@/validation/logs.validation';

export class UsersService {
	private readonly rqst: any;
	private readonly logsService: LogsService;
	constructor(
		private readonly userModel: Model<IUserDocument>,
		private readonly rqst: any,
		logsService: LogsService = new LogsService(LogsModel)
	) {
		this.rqst = rqst;
		this.logsService = logsService;
	}

	private async createLogs(request: ICreateLogsRequest) {
		return await this.logsService.createLogs(request);
	}

	async createUser(request: ICreateUserRequest) {
		try {
			await MongoDbConnect();
			const existing = await this.getIsExist(request.email as string);
			if (existing) {
				throw new Error('Email already exists');
			}
			const user: IUserDocument = await this.userModel.create(request);
			if (!user) {
				throw new Error('User creation failed');
			}
			return user;
		} catch (error) {
			throw error;
		}
	}

	async getByEmail(string: string) {
		try {
			await MongoDbConnect();
			const user = await this.userModel
				.findOne({ email: string })
				.lean();
			if (!user) {
				throw new Error('User not found');
			}
			return user;
		} catch (error) {
			throw error;
		}
	}

	async getById(id: string) {
		try {
			await MongoDbConnect();
			const user = await this.userModel
				.findOne({ _id: id, deletedAt: null })
				.lean();
			if (!user) {
				throw new Error('User not found');
			}
			return user;
		} catch (error) {
			throw error;
		}
	}

	async getIsExist(string: string) {
		try {
			await MongoDbConnect();
			const user = await this.userModel
				.findOne({ email: string })
				.lean();
			return user;
		} catch (error) {
			throw error;
		}
	}

	async validateUser(request: ILoginRequest) {
		try {
			await MongoDbConnect();
			const user = await this.userModel
				.findOne({ email: request.email })
				.lean();
			if (!user) {
				throw new Error('User not found');
			}
			if (await bcrypt.compare(request.password, user.password)) {
				return user;
			} else {
				throw new Error('Invalid password');
			}
		} catch (error) {
			throw error;
		}
	}

	async getUserById(id: string) {
		try {
			await MongoDbConnect();
			const user = await this.userModel
				.findOne({ _id: id, deletedAt: null })
				.lean();
			if (!user) {
				throw new Error('No user found');
			}
			return user;
		} catch (error) {
			throw error;
		}
	}

	async changeUserPassword(id: string, password: string) {
		try {
			await MongoDbConnect();
			const user = await this.userModel.findById(id);
			if (!user) {
				throw new Error('User not found');
			}
			user.password = password;
			const updatedUser = await user.save();
			return updatedUser.toObject();
		} catch (error) {
			throw error;
		}
	}

	async updateUserProgress(id: string, request: IUpdateUserProgressRequest) {
		try {
			await MongoDbConnect();
			const user = await this.userModel.findById(id);
			const tutorialService = new TutorialsService(TutorialModel, this.rqst);
			if (!user) {
				throw new Error('User not found');
			}
			if (request.progress) {
				for (const progressUpdate of request.progress) {
					const tutorial = await tutorialService.getTutorialById(progressUpdate.tutorial_id);
					if (!tutorial) {
						throw new Error('Tutorial not found');
					}
					const existingTutorial = user.progress.find(
						(p: any) => p.tutorial_id === progressUpdate.tutorial_id
					);
					if (existingTutorial) {
						existingTutorial.count = progressUpdate.count ?? existingTutorial.count;
						existingTutorial.dateCompleted = progressUpdate.dateCompleted ?? existingTutorial.dateCompleted;
						existingTutorial.certificateLink = progressUpdate.certificateLink ?? existingTutorial.certificateLink;

						const isCompleted = !!progressUpdate.dateCompleted;
						if (isCompleted) {
							tutorial.tutorial_status.completers += 1;
							tutorial.tutorial_status.ongoing = Math.max(0, tutorial.tutorial_status.ongoing - 1);
							await tutorial.save();
						}
					} else {
						user.progress.push(progressUpdate);
						tutorial.tutorial_status.ongoing += 1;
						await tutorial.save();
					}
				}
			}
			const updatedUser = await user.save();
			return updatedUser.toObject();
		} catch (error) {
			throw error;
		}
	}

	async getAllUsers() {
		try {
			await MongoDbConnect();
			const user = await this.userModel
				.find({ deletedAt: null })
				.sort({ createdAt: -1 })
				.lean();
			if (!user) {
				throw new Error('No user found');
			}
			return user;
		} catch (error) {
			throw error;
		}
	}


	async updateUser(id: string, request: IUpdateUserRequest) {
		try {
			await MongoDbConnect();
			const user = await this.userModel.findById(id);
			if (!user) {
				throw new Error('User not found');
			}
			if (request.firstName !== undefined) {
				user.firstName = request.firstName;
			}
			if (request.lastName !== undefined) {
				user.lastName = request.lastName;
			}
			if (request.middleName !== undefined) {
				user.middleName = request.middleName;
			}
			if (request.email !== undefined && request.email !== user.email) {
				const existing = await this.getByEmail(request.email);
				if (existing) {
					throw new Error('Email already exists');
				}
				user.email = request.email;
			}
			const updatedUser = await user.save();
			if (request.token !== undefined){
				return updatedUser.toObject();
			}
			await this.createLogs({
				account_id: this.rqst,
				actionCollection: CollectionsEnum.Users,
				action: ActionsEnum.Update,
				action_id: (id || "").toString(),
				oldDocument: JSON.stringify(user),
				newDocument: JSON.stringify(updatedUser)
			})
			return updatedUser.toObject();
		} catch (error) {
			throw error;
		}
	}

	async deleteUser(id: string) {
		try {
			await MongoDbConnect();
			const user = await this.userModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }).lean();
			await this.createLogs({
				account_id: this.rqst,
				actionCollection: CollectionsEnum.Users,
				action: ActionsEnum.Delete,
				action_id: (id || "").toString(),
				oldDocument: JSON.stringify(user),
				newDocument: null
			})
			return user;
		} catch (error) {
			throw error;
		}
	}
	
}
