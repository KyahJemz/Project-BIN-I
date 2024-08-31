export interface INews {
	title: string;
	author: string;
	description: string;
	content: string;
	image: string;
	deletedAt?: Date | null;
}
