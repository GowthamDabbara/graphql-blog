import { gql } from "apollo-server-express";

export const typeDefs = gql`
	type User {
		id: ID!
		email: String!
		name: String!
		bio: String
		createdAt: String!
		updatedAt: String!
		posts: [Post!]!
		comments: [Comment!]!
	}

	type Post {
		id: ID!
		title: String!
		slug: String!
		content: String!
		excerpt: String
		published: Boolean!
		createdAt: String!
		updatedAt: String!
		author: User!
		comments: [Comment!]!
	}

	type Comment {
		id: ID!
		content: String!
		createdAt: String!
		updatedAt: String!
		post: Post!
		author: User!
	}

	type Query {
		posts(published: Boolean): [Post!]!
		post(id: ID!): Post
		postBySlug(slug: String!): Post
		users: [User!]!
		user(id: ID!): User
		comments: [Comment!]!
		postComments(postId: ID!): [Comment!]!
	}

	type Mutation {
		createUser(input: CreateUserInput!): User!
		createPost(input: CreatePostInput!): Post!
		updatePost(id: ID!, input: UpdatePostInput!): Post!
		deletePost(id: ID!): Boolean!
		publishPost(id: ID!, published: Boolean!): Post!
		createComment(input: CreateCommentInput!): Comment!
		deleteComment(id: ID!): Boolean!
	}

	input CreateUserInput {
		email: String!
		name: String!
		bio: String
	}

	input CreatePostInput {
		title: String!
		slug: String!
		content: String!
		excerpt: String
		authorId: Int!
	}

	input UpdatePostInput {
		title: String
		content: String
		excerpt: String
	}

	input CreateCommentInput {
		content: String!
		postId: Int!
		authorId: Int!
	}
`;
