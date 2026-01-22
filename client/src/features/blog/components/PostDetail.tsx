import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { usePostBySlug } from "../hooks/usePostBySlug";
import { usePostComments } from "../hooks/usePostComments";
import { CommentCard } from "./CommentCard";
import { CommentForm } from "./CommentForm";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { ConfirmDialog } from "../../../components/ConfirmDialog";
import { DELETE_POST } from "../graphql/mutations";
import { GET_POSTS } from "../graphql/queries";
import { UserSelector } from "../../../components/UserSelector";

export function PostDetail() {
	const { slug } = useParams<{ slug: string }>();
	const navigate = useNavigate();
	const { data, loading, error } = usePostBySlug(slug || "");
	const [showDialog, setShowDialog] = useState(false);

	// Separate query for comments
	const {
		data: commentsData,
		refetch: refetchComments,
		loading: commentsLoading,
	} = usePostComments(data?.postBySlug?.id || "");

	const [deletePost, { loading: deleting }] = useMutation(DELETE_POST, {
		refetchQueries: [{ query: GET_POSTS, variables: { published: true } }],
	});

	if (loading) return <LoadingSpinner />;
	if (error) return <ErrorMessage message={error.message} />;
	if (!data?.postBySlug) return <ErrorMessage message="Post not found" />;

	const post = data.postBySlug;
	const comments = commentsData?.postComments || [];

	const handleDelete = async () => {
		try {
			await deletePost({ variables: { id: post.id } });
			setShowDialog(false);
			navigate("/");
		} catch (err) {
			console.error("Error deleting post:", err);
			setShowDialog(false);
		}
	};

	// Refresh only comments
	const handleRefreshComments = async () => {
		await refetchComments();
	};

	const formatDate = (dateString: string) => {
		try {
			const date = new Date(dateString);
			if (isNaN(date.getTime())) return "Recently";
			return date.toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		} catch {
			return "Recently";
		}
	};

	return (
		<>
			<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
				<header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700">
					<div className="max-w-4xl mx-auto px-6 py-8">
						<div className="flex items-center justify-between mb-6">
							<button
								onClick={() => navigate("/")}
								className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
							>
								<span>←</span> Back to all posts
							</button>

							<button
								onClick={() => setShowDialog(true)}
								disabled={deleting}
								className="text-red-400 hover:text-red-300 font-semibold px-4 py-2 rounded-lg hover:bg-red-500/10 transition-all disabled:opacity-50 flex items-center gap-2 border border-red-500/30 hover:border-red-500/50"
							>
								<span>🗑️</span>
								<span>{deleting ? "Deleting..." : "Delete Post"}</span>
							</button>
						</div>

						<h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight animate-fadeIn">
							{post.title}
						</h1>

						<div className="flex items-center gap-4 text-slate-400">
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
									{post.author.name.charAt(0)}
								</div>
								<div>
									<p className="text-white font-semibold">{post.author.name}</p>
									{post.author.bio && (
										<p className="text-sm text-slate-400">{post.author.bio}</p>
									)}
								</div>
							</div>
							<span className="text-slate-600">•</span>
							<span className="text-slate-400">
								{formatDate(post.createdAt)}
							</span>
						</div>
					</div>
				</header>
				<div className="max-w-4xl mx-auto px-6 py-6">
					<UserSelector />
				</div>
				<main className="max-w-4xl mx-auto px-6 py-12">
					<article className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700 p-8 mb-12 animate-fadeIn shadow-2xl">
						<div className="prose prose-invert prose-lg max-w-none">
							<p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
								{post.content}
							</p>
						</div>
					</article>

					<section className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700 p-8 animate-fadeIn shadow-2xl">
						<h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
							<span>💬</span>
							<span>Comments ({comments.length})</span>
						</h2>

						<CommentForm
							postId={parseInt(post.id)}
							onCommentAdded={handleRefreshComments}
						/>

						{commentsLoading && comments.length === 0 ? (
							<div className="text-center py-8">
								<div className="animate-spin text-4xl">⟳</div>
								<p className="text-slate-400 mt-2">Loading comments...</p>
							</div>
						) : comments.length === 0 ? (
							<div className="text-center py-12">
								<div className="text-5xl mb-4">💭</div>
								<p className="text-slate-400 text-lg">
									No comments yet. Be the first to share your thoughts!
								</p>
							</div>
						) : (
							<div className="space-y-4">
								{comments.map((comment: any) => (
									<CommentCard
										key={comment.id}
										comment={comment}
										onCommentDeleted={handleRefreshComments}
									/>
								))}
							</div>
						)}
					</section>
				</main>
			</div>

			<ConfirmDialog
				isOpen={showDialog}
				title="Delete Post"
				message="Are you sure you want to delete this post? All comments will also be deleted. This action cannot be undone."
				confirmText="Delete"
				cancelText="Cancel"
				isDanger={true}
				onConfirm={handleDelete}
				onCancel={() => setShowDialog(false)}
			/>
		</>
	);
}
