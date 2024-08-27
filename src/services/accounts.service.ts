import { AccountTypeEnum } from "@/enums/accountType.enum";
import { IAccountDocument } from "@/models/accounts";
import { ICreateAccountRequest, ILoginRequest, IUpdateAccountRequest } from "@/validation/accounts.validation";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';

export class AccountService {
    constructor(private readonly accountModel: Model<IAccountDocument>) {}
    
    async createAccount (request: ICreateAccountRequest) {
        try {
            const account = await this.accountModel.create(request);
            if (!account) {
                throw new Error('Account creation failed');
            }
            return account;
        } catch (error) {
            throw error;
        }
    }
    async getAccountById (id: string) {
        try {
            const account = await this.accountModel.findOne({ _id: id, deletedAt: null }).lean();
            if (!account) {
                throw new Error('No account found');
            }
            return account;
        } catch (error) {
            throw error;
        }
    }
    async getAllAccounts () {
        try {
            const account = await this.accountModel.find({deletedAt: null}).lean();
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
            if (request.email !== undefined) {
                account.email = request.email;
            }
            if (request.type !== undefined) {
                account.type = request.type as AccountTypeEnum;
            }
            if (request.password !== undefined) {
                account.password = request.password;
            }
            const updatedAccount = await account.save();
            return updatedAccount.toObject(); 
        } catch (error) {
            throw error;
        }
    }
    async validateAccount(request: ILoginRequest) {
        try {
            const account = await this.accountModel.findOne({email: request.email}).lean();
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
    async changeAccountPassword (id: string, password: string) {
        try {
            const account = await this.accountModel.findById(id);
            if (!account) {
                throw new Error('Account not found');
            }
            account.password = password;
            const updatedAccount = await account.save();
            return updatedAccount.toObject(); 
        } catch (error) {
            throw error;
        }
    }
    async deleteAccount (id: string) {
        const account = await this.accountModel.findByIdAndUpdate(id, {deletedAt: new Date()}, { new: true }).lean();
        try {
            return account;
        } catch (error) {
            throw error;
        }
    }
}