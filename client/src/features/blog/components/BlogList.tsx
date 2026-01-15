import { usePosts } from "../hooks/usePosts";
import { PostCard } from "./PostCard";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { PostCardSkeleton } from "../../../components/PostCardSkeleton";
import { useNavigate } from "react-router-dom";

export function BlogList() {
	const navigate = useNavigate();
	const { data, loading, error } = usePosts(true);

	if (error) return <ErrorMessage message={error.message} />;

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
			{/* Header */}
			<header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700 sticky top-0 z-50">
				<div className="max-w-4xl mx-auto px-6 py-6">
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
						<div>
							<h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-sky-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">
								GraphQL Blog
							</h1>
							<p className="text-lg text-slate-400">
								Built with Apollo Server + React + Prisma
							</p>
						</div>

						<button
							onClick={() => navigate("/create")}
							className="px-6 py-3 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-sky-500/30 transition-all duration-300 flex items-center gap-2"
						>
							<span className="text-xl">✍️</span>
							<span>New Post</span>
						</button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-4xl mx-auto px-6 py-12">
				<div className="grid gap-8">
					{loading ? (
						// Show skeletons while loading
						<>
							<PostCardSkeleton />
							<PostCardSkeleton />
							<PostCardSkeleton />
						</>
					) : data?.posts.length === 0 ? (
						// Empty state
						<div className="text-center py-20">
							<div className="text-6xl mb-6">📝</div>
							<h2 className="text-3xl font-bold text-white mb-4">
								No posts yet
							</h2>
							<p className="text-slate-400 mb-8">
								Be the first to create a post!
							</p>
							<button
								onClick={() => navigate("/create")}
								className="px-8 py-3 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 rounded-xl font-semibold text-white shadow-lg transition-all"
							>
								Create Your First Post
							</button>
						</div>
					) : (
						// Post cards
						data?.posts.map((post) => <PostCard key={post.id} post={post} />)
					)}
				</div>
			</main>

			{/* Footer */}
			<footer className="border-t border-slate-700 mt-20">
				<div className="max-w-4xl mx-auto px-6 py-8 text-center">
					<p className="text-slate-400">
						Made with <span className="text-red-400">♥</span> using GraphQL
					</p>
				</div>
			</footer>
		</div>
	);
}
