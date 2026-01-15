import { useQuery } from "@apollo/client/react";
import { GET_POSTS } from "../graphql/queries";
import type { Post } from "../types/blog.types";

interface GetPostsData {
	posts: Post[];
}

export function usePosts(published?: boolean) {
	return useQuery<GetPostsData>(GET_POSTS, {
		variables: { published },
	});
}
