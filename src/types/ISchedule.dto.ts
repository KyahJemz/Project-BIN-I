export interface ISchedule {
	schedule: string;
	scheduleLocation: string;
	wasteType: string;
	status: string;
	notes?: string | null;
	deletedAt?: Date | null;
}
