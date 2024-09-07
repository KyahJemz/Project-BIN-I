export interface IPost {
	title: string;
	author: string;
	description: string;
	content?: string | null;
	image?: string | null;
	deletedAt?: Date | null;
}
