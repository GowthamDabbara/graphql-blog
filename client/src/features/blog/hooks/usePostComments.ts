import { useQuery } from "@apollo/client/react";
import { GET_POST_COMMENTS } from "../graphql/queries";
import type { Comment } from "../types/blog.types";

interface PostCommentsData {
	postComments: Comment[];
}

export function usePostComments(postId: string) {
	return useQuery<PostCommentsData>(GET_POST_COMMENTS, {
		variables: { postId },
		fetchPolicy: "cache-and-network",
	});
}
