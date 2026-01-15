import { gql } from "@apollo/client";

export const GET_POSTS = gql`
	query GetPosts($published: Boolean) {
		posts(published: $published) {
			id
			title
			slug
			excerpt
			createdAt
			author {
				id
				name
			}
			comments {
				id
			}
		}
	}
`;

export const GET_POST_BY_SLUG = gql`
	query GetPostBySlug($slug: String!) {
		postBySlug(slug: $slug) {
			id
			title
			slug
			content
			excerpt
			createdAt
			author {
				id
				name
				bio
			}
			comments {
				id
				content
				createdAt
				author {
					id
					name
				}
			}
		}
	}
`;

export const GET_POST_COMMENTS = gql`
	query GetPostComments($postId: ID!) {
		postComments(postId: $postId) {
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
