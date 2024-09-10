import { Model, Schema } from 'mongoose';
import { ILogDocument } from '@/models/logs';
import {
	ICreateLogsRequest,
} from '@/validation/logs.validation';
import { MongoDbConnect } from '@/utils/mongodb';
import { decodeJwt } from '@/utils/jwt';
import { NextRequest } from 'next/server';

export class LogsService {
	constructor(private readonly logsModel: Model<ILogDocument>) {}

	async processRequest(rqst: any) {
		const autHeader = rqst.get('authorization');
		const token = autHeader.split(' ')[1];
		const decode = await decodeJwt(token);
		return decode._id;
	}

	async createLogs(request: ICreateLogsRequest) {
		try {
			await MongoDbConnect();
			const parsedRequest = {
				...request,
				account_id: await this.processRequest(request?.account_id??""),
				action_id: request.action_id,
			}
			const logs = await this.logsModel.create(parsedRequest);
			if (!logs) {
				throw new Error('Logs creation failed');
			}
			return logs;
		} catch (error) {
			throw error;
		}
	}
	async getLogsById(id: string) {
		try {
			await MongoDbConnect();
			const logs = await this.logsModel.findOne({ _id: id }).populate('account_id').lean();
			if (!logs) {
				throw new Error('No log found');
			}
			return logs;
		} catch (error) {
			throw error;
		}
	}
	async getAllLogs(page: number, pageSize: number) {
		try {
			await MongoDbConnect();
			const count = await this.logsModel.countDocuments().lean();
			const logs = await this.logsModel
				.find()
				.populate('account_id')
				.sort({ createdAt: -1})
				.skip((+page-1) * +pageSize)
				.limit(pageSize)
				.lean();
			if (!logs) {
				throw new Error('No logs found');
			}
			return {
				logs,
				metadata: {
					totalItems: count,
				},
			};
		} catch (error) {
			throw error;
		}
	}
}
