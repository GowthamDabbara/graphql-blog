import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import type { Comment } from "../types/blog.types";
import { DELETE_COMMENT } from "../graphql/mutations";
import { ConfirmDialog } from "../../../components/ConfirmDialog";

interface CommentCardProps {
	comment: Comment;
	postSlug: string;
	onCommentDeleted: () => void;
}

export function CommentCard({
	comment,
	postSlug,
	onCommentDeleted,
}: CommentCardProps) {
	const [showDialog, setShowDialog] = useState(false);
	const [deleteComment, { loading }] = useMutation(DELETE_COMMENT);

	const handleDelete = async () => {
		try {
			await deleteComment({
				variables: { id: comment.id },
			});
			setShowDialog(false);
			onCommentDeleted(); // Refresh the page data
		} catch (error) {
			console.error("❌ Error deleting comment:", error);
			setShowDialog(false);
		}
	};

	const formatDate = (dateString: string) => {
		try {
			const date = new Date(dateString);
			if (isNaN(date.getTime())) return "Recently";
			return date.toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			});
		} catch {
			return "Recently";
		}
	};

	return (
		<>
			<div className="bg-slate-700/30 rounded-xl p-5 border border-slate-700/50 hover:border-slate-600/50 transition-all animate-fadeIn">
				<div className="flex items-start gap-3">
					<div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg">
						{comment.author.name.charAt(0)}
					</div>
					<div className="flex-1">
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center gap-2">
								<p className="text-white font-semibold">
									{comment.author.name}
								</p>
								<span className="text-slate-600">•</span>
								<p className="text-slate-400 text-sm">
									{formatDate(comment.createdAt)}
								</p>
							</div>
							<button
								onClick={() => setShowDialog(true)}
								disabled={loading}
								className="text-red-400 hover:text-red-300 text-sm font-semibold px-3 py-1 rounded-lg hover:bg-red-500/10 transition-all disabled:opacity-50"
								title="Delete comment"
							>
								🗑️
							</button>
						</div>
						<p className="text-slate-300 leading-relaxed">{comment.content}</p>
					</div>
				</div>
			</div>

			<ConfirmDialog
				isOpen={showDialog}
				title="Delete Comment"
				message="Are you sure you want to delete this comment? This action cannot be undone."
				confirmText="Delete"
				cancelText="Cancel"
				isDanger={true}
				onConfirm={handleDelete}
				onCancel={() => setShowDialog(false)}
			/>
		</>
	);
}
