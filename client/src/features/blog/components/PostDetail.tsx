import { useParams, useNavigate } from "react-router-dom";
import { usePostBySlug } from "../hooks/usePostBySlug";
import { CommentCard } from "./CommentCard";
import { CommentForm } from "./CommentForm"; // ✅ Add this
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { ErrorMessage } from "../../../components/ErrorMessage";

export function PostDetail() {
	const { slug } = useParams<{ slug: string }>();
	const navigate = useNavigate();
	const { data, loading, error } = usePostBySlug(slug || "");

	if (loading) return <LoadingSpinner />;
	if (error) return <ErrorMessage message={error.message} />;
	if (!data?.postBySlug) return <ErrorMessage message="Post not found" />;

	const post = data.postBySlug;

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
			{/* Header - same as before */}
			<header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700">
				<div className="max-w-4xl mx-auto px-6 py-6">
					<button
						onClick={() => navigate("/")}
						className="text-sky-400 hover:text-sky-300 font-semibold mb-4 flex items-center gap-2"
					>
						← Back to all posts
					</button>
					<h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
					<div className="flex items-center gap-4 text-slate-400">
						<div className="flex items-center gap-2">
							<div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold">
								{post.author.name.charAt(0)}
							</div>
							<div>
								<p className="text-white font-medium">{post.author.name}</p>
								<p className="text-sm">{post.author.bio}</p>
							</div>
						</div>
						<span className="text-slate-500">•</span>
						<span>{new Date(post.createdAt).toLocaleDateString()}</span>
					</div>
				</div>
			</header>

			{/* Content - same as before */}
			<main className="max-w-4xl mx-auto px-6 py-12">
				<article className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700 p-8 mb-12">
					<div className="prose prose-invert prose-lg max-w-none">
						<p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
							{post.content}
						</p>
					</div>
				</article>

				{/* Comments Section */}
				<section className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700 p-8">
					<h2 className="text-2xl font-bold text-white mb-6">
						Comments ({post.comments.length})
					</h2>

					{/* ✅ ADD COMMENT FORM HERE */}
					<CommentForm postId={parseInt(post.id)} postSlug={post.slug} />

					{/* Existing comments */}
					{post.comments.length === 0 ? (
						<p className="text-slate-400 text-center py-8">
							No comments yet. Be the first to comment!
						</p>
					) : (
						<div>
							{post.comments.map((comment) => (
								<CommentCard key={comment.id} comment={comment} />
							))}
						</div>
					)}
				</section>
			</main>
		</div>
	);
}
