export interface Post {
	id: string; // Keep as string (GraphQL returns ID as string)
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
	id: string; // Keep as string
	email: string;
	name: string;
	bio?: string;
	createdAt: string;
	updatedAt: string;
}

export interface Comment {
	id: string; // Keep as string
	content: string;
	createdAt: string;
	updatedAt: string;
	post: Post;
	author: User;
}
