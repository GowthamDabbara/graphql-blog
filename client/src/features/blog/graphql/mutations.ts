import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
	mutation CreateComment($input: CreateCommentInput!) {
		createComment(input: $input) {
			id
			content
			createdAt
			author {
				id
				name
			}
		}
	}
`;

export const CREATE_POST = gql`
	mutation CreatePost($input: CreatePostInput!) {
		createPost(input: $input) {
			id
			title
			slug
			content
			excerpt
			published
			author {
				id
				name
			}
		}
	}
`;

export const DELETE_POST = gql`
	mutation DeletePost($id: ID!) {
		deletePost(id: $id)
	}
`;

export const DELETE_COMMENT = gql`
	mutation DeleteComment($id: ID!) {
		deleteComment(id: $id)
	}
`;

export const UPDATE_POST = gql`
	mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
		updatePost(id: $id, input: $input) {
			id
			title
			slug
			content
			excerpt
			createdAt
			author {
				id
				name
			}
		}
	}
`;
