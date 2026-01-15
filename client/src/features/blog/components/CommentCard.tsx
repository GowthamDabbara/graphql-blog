import type { Comment } from "../types/blog.types";

interface CommentCardProps {
	comment: Comment;
}

export function CommentCard({ comment }: CommentCardProps) {
	return (
		<div className="bg-slate-700/30 rounded-lg p-4 mb-4">
			<div className="flex items-center gap-3 mb-2">
				<div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold">
					{comment.author.name.charAt(0)}
				</div>
				<div>
					<p className="text-white font-medium">{comment.author.name}</p>
					<p className="text-slate-400 text-sm">
						{new Date(comment.createdAt).toLocaleDateString()}
					</p>
				</div>
			</div>
			<p className="text-slate-300 ml-11">{comment.content}</p>
		</div>
	);
}
