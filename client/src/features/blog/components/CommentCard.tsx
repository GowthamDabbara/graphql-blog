import type { Comment } from "../types/blog.types";

interface CommentCardProps {
	comment: Comment;
}

export function CommentCard({ comment }: CommentCardProps) {
	return (
		<div className="bg-slate-700/30 rounded-xl p-5 border border-slate-700/50 hover:border-slate-600/50 transition-all animate-fadeIn">
			<div className="flex items-start gap-3">
				<div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg">
					{comment.author.name.charAt(0)}
				</div>
				<div className="flex-1">
					<div className="flex items-center gap-2 mb-2">
						<p className="text-white font-semibold">{comment.author.name}</p>
						<span className="text-slate-600">•</span>
						<p className="text-slate-400 text-sm">
							{new Date(comment.createdAt).toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
								year: "numeric",
							})}
						</p>
					</div>
					<p className="text-slate-300 leading-relaxed">{comment.content}</p>
				</div>
			</div>
		</div>
	);
}
