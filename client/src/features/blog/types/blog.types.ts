export interface Post {
	id: number;
	title: string;
	slug: string;
	content: string;
	excerpt?: string;
	published: boolean;
	createdAt: string;
	updatedAt: string;
	author: User;
	comments: Comment[];
}

export interface User {
	id: number;
	email: string;
	name: string;
	bio?: string;
	createdAt: string;
	updatedAt: string;
}

export interface Comment {
	id: number;
	content: string;
	createdAt: string;
	updatedAt: string;
	post: Post;
	author: User;
}
