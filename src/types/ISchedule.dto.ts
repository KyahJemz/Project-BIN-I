import { IScheduleSchedule } from "./IScheduleSchedule";

export interface ISchedule {
	schedule: IScheduleSchedule;
	scheduleLocation: string;
	wasteType: string;
	status: string;
	notes?: string | null;
	deletedAt?: Date | null;
}

