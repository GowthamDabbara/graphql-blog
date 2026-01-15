import { Link } from "react-router-dom";
import type { Post } from "../types/blog.types";

interface PostCardProps {
	post: Post;
}

export function PostCard({ post }: PostCardProps) {
	return (
		<article className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 hover:border-slate-600 transition-all">
			<h2 className="text-2xl font-bold mb-2">
				<Link
					to={`/post/${post.slug}`}
					className="text-sky-400 hover:text-sky-300 transition-colors"
				>
					{post.title}
				</Link>
			</h2>

			<p className="text-slate-400 mb-4 line-clamp-3">{post.excerpt}</p>

			<div className="flex items-center justify-between text-sm text-slate-500">
				<span className="text-slate-300">By {post.author.name}</span>
				<span>{new Date(post.createdAt).toLocaleDateString()}</span>
			</div>

			<div className="mt-4 text-sm text-slate-400 flex items-center gap-4">
				<span>💬 {post.comments.length} comments</span>
			</div>
		</article>
	);
}
