import { gql } from "@apollo/client";

export const GET_POSTS = gql`
	query GetPosts($published: Boolean) {
		posts(published: $published) {
			id
			title
			slug
			excerpt
			published
			createdAt
			author {
				id
				name
				bio
			}
			comments {
				id
				content
				author {
					name
				}
			}
		}
	}
`;

export const GET_POST_BY_SLUG = gql`
	query GetPostBySlug($slug: String!) {
		postBySlug(slug: $slug) {
			id
			title
			content
			excerpt
			published
			author {
				name
				bio
			}
			comments {
				id
				content
				author {
					name
				}
			}
		}
	}
`;
