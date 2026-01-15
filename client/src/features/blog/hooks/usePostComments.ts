import { useQuery } from "@apollo/client/react";
import { GET_POST_COMMENTS } from "../graphql/queries";

export function usePostComments(postId: string) {
	return useQuery(GET_POST_COMMENTS, {
		variables: { postId },
		fetchPolicy: "cache-and-network",
	});
}
