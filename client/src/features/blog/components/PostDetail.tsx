import { useParams, useNavigate } from "react-router-dom";
import { usePostBySlug } from "../hooks/usePostBySlug";
import { CommentCard } from "./CommentCard";
import { CommentForm } from "./CommentForm";
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
			{/* Header */}
			<header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700">
				<div className="max-w-4xl mx-auto px-6 py-8">
					<button
						onClick={() => navigate("/")}
						className="text-sky-400 hover:text-sky-300 font-semibold mb-6 flex items-center gap-2 hover:gap-3 transition-all"
					>
						<span>←</span> Back to all posts
					</button>

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
							{new Date(post.createdAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</span>
					</div>
				</div>
			</header>

			{/* Content */}
			<main className="max-w-4xl mx-auto px-6 py-12">
				{/* Article Content */}
				<article className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700 p-8 mb-12 animate-fadeIn shadow-2xl">
					<div className="prose prose-invert prose-lg max-w-none">
						<p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
							{post.content}
						</p>
					</div>
				</article>

				{/* Comments Section */}
				<section className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700 p-8 animate-fadeIn shadow-2xl">
					<h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
						<span>💬</span>
						<span>Comments ({post.comments.length})</span>
					</h2>

					{/* Comment Form */}
					<CommentForm postId={parseInt(post.id)} postSlug={post.slug} />

					{/* Comments List */}
					{post.comments.length === 0 ? (
						<div className="text-center py-12">
							<div className="text-5xl mb-4">💭</div>
							<p className="text-slate-400 text-lg">
								No comments yet. Be the first to share your thoughts!
							</p>
						</div>
					) : (
						<div className="space-y-4">
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
