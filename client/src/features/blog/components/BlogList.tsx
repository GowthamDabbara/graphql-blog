import { usePosts } from "../hooks/usePosts";
import { PostCard } from "./PostCard";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { useNavigate } from "react-router-dom"; // ✅ Add this

export function BlogList() {
	const navigate = useNavigate(); // ✅ Add this
	const { data, loading, error } = usePosts(true);

	if (loading) return <LoadingSpinner />;
	if (error) return <ErrorMessage message={error.message} />;

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
			<header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700">
				<div className="max-w-4xl mx-auto px-6 py-8">
					<div className="flex items-center justify-between mb-4">
						<h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
							GraphQL Blog
						</h1>
						{/* ✅ ADD THIS BUTTON */}
						<button
							onClick={() => navigate("/create")}
							className="px-6 py-2 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 rounded-lg font-semibold text-white transition-all"
						>
							✍️ New Post
						</button>
					</div>
					<p className="text-xl text-slate-300">
						Built with Apollo Server + React + Prisma
					</p>
				</div>
			</header>

			<main className="max-w-4xl mx-auto px-6 py-12">
				<div className="grid gap-8">
					{data?.posts.map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</div>
			</main>
		</div>
	);
}
