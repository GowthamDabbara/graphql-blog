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
