import { IUserDocument } from '@/models/users';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { MongoDbConnect } from '@/utils/mongodb';
import { ILoginRequest, IUpdateUserProgressRequest } from '@/validation/users.validation';
import { ICreateUserRequest } from '@/validation/users.validation';

export class UsersService {
	private readonly rqst: any;
	constructor(
		private readonly userModel: Model<IUserDocument>,
		private readonly rqst: any,
	) {
		this.rqst = rqst;
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

	async updateUser(id: string, request: any) {
		try {
			await MongoDbConnect();
			const user = await this.userModel.findById(id);
			if (!user) {
				throw new Error('User not found');
			}
			const updatedAccount = await user.save();
			if (request.token !== undefined){
				return updatedAccount.toObject();
			}
			return updatedAccount.toObject();
		} catch (error) {
			throw error;
		}
	}

	async updateUserProgress(id: string, request: IUpdateUserProgressRequest) {
		try {
			await MongoDbConnect();
			const user = await this.userModel.findById(id);
			if (!user) {
				throw new Error('User not found');
			}
			if (request.progress) {
				request.progress.forEach((progressUpdate) => {
					const existingTutorial = user.progress.find(
						(p: any) => p.tutorial_id === progressUpdate.tutorial_id
					);
	
					if (existingTutorial) {
						existingTutorial.count = progressUpdate.count ?? existingTutorial.count;
						existingTutorial.dateCompleted = progressUpdate.dateCompleted ?? existingTutorial.dateCompleted;
						existingTutorial.certificateLink = progressUpdate.certificateLink ?? existingTutorial.certificateLink;
					} else {
						user.progress.push(progressUpdate);
					}
				});
			}
			const updatedUser = await user.save();
			return updatedUser.toObject();
		} catch (error) {
			throw error;
		}
	}
}
