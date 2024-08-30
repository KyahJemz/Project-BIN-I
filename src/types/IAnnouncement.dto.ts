export interface IAnnouncement {
	title: string;
	author: string;
	content: string;
	image: string;
	deletedAt?: Date | null;
}
