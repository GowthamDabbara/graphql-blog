import { useQuery } from "@apollo/client/react";
import { GET_POST_BY_SLUG } from "../graphql/queries";
import type { Post } from "../types/blog.types";

interface GetPostBySlugData {
	postBySlug: Post | null;
}

export function usePostBySlug(slug: string) {
	return useQuery<GetPostBySlugData>(GET_POST_BY_SLUG, {
		variables: { slug },
		skip: !slug,
	});
}
