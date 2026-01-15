import { Link } from "react-router-dom";
import type { Post } from "../types/blog.types";

interface PostCardProps {
	post: Post;
}

export function PostCard({ post }: PostCardProps) {
	return (
		<article className="group bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700 hover:border-slate-600 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 animate-fadeIn">
			{/* Title */}
			<h2 className="text-2xl font-bold mb-3">
				<Link
					to={`/post/${post.slug}`}
					className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent hover:from-sky-300 hover:to-emerald-300 transition-all"
				>
					{post.title}
				</Link>
			</h2>

			{/* Excerpt */}
			{post.excerpt && (
				<p className="text-slate-400 mb-4 line-clamp-3 leading-relaxed">
					{post.excerpt}
				</p>
			)}

			{/* Author & Date */}
			<div className="flex items-center gap-3 mb-4">
				<div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center text-white font-bold text-sm shadow-lg">
					{post.author.name.charAt(0)}
				</div>
				<div>
					<p className="text-slate-300 font-medium">{post.author.name}</p>
					<p className="text-slate-500 text-sm">
						{new Date(post.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "short",
							day: "numeric",
						})}
					</p>
				</div>
			</div>

			{/* Footer */}
			<div className="flex items-center gap-4 pt-4 border-t border-slate-700/50">
				<span className="text-slate-400 text-sm flex items-center gap-2">
					<span className="text-lg">💬</span>
					{post.comments.length}{" "}
					{post.comments.length === 1 ? "comment" : "comments"}
				</span>
				<Link
					to={`/post/${post.slug}`}
					className="ml-auto text-sky-400 hover:text-sky-300 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
				>
					Read more
					<span>→</span>
				</Link>
			</div>
		</article>
	);
}
