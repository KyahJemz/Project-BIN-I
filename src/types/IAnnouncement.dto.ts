export interface IAnnouncement {
	title: string;
	author: string;
	description: string;
	content: string;
	image: string;
	deletedAt?: Date | null;
}
