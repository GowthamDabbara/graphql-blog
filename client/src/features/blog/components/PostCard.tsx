import type { Post } from "../types/blog.types";

interface PostCardProps {
	post: Post;
}

export function PostCard({ post }: PostCardProps) {
	return (
		<article className="bg-white rounded-lg shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow">
			<h2 className="text-2xl font-bold mb-2">
				<a
					href={`/post/${post.slug}`}
					className="text-blue-600 hover:text-blue-800"
				>
					{post.title}
				</a>
			</h2>

			<p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

			<div className="flex items-center justify-between text-sm text-gray-500">
				<span>By {post.author.name}</span>
				<span>{new Date(post.createdAt).toLocaleDateString()}</span>
			</div>

			<div className="mt-4 text-sm text-gray-500">
				{post.comments.length} comments
			</div>
		</article>
	);
}
