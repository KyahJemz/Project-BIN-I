import { Model, Schema } from "mongoose";
import { ILogDocument } from "@/models/logs";
import { ICreateLogsRequest, IUpdateLogsRequest } from "@/validation/logs.validation";
import { CollectionsEnum } from "@/enums/collections.enum";
import { ActionsEnum } from "@/enums/actions.enum";

export class LogsService {
    constructor(private readonly logsModel: Model<ILogDocument>) {}
    
    async createLogs (request: ICreateLogsRequest) {
        try {
            const logs = await this.logsModel.create(request);
            if (!logs) {
                throw new Error('Logs creation failed');
            }
            return logs;
        } catch (error) {
            throw error;
        }
    }
    async getLogsById (id: string) {
        try {
            const logs = await this.logsModel.findOne({ _id: id }).lean();
            if (!logs) {
                throw new Error('No log found');
            }
            return logs;
        } catch (error) {
            throw error;
        }
    }
    async getAllLogs () {
        try {
            const logs = await this.logsModel.find().lean();
            if (!logs) {
                throw new Error('No logs found');
            }
            return logs;
        } catch (error) {
            throw error;
        }
    }
}