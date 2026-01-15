import { usePosts } from "./features/blog/hooks/usePosts";
import { PostCard } from "./features/blog/components/PostCard";
import { client } from "./lib/apollo";
import "./App.css";

function App() {
	const { data, loading, error } = usePosts(true);

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
				<div className="text-2xl text-white animate-pulse">
					Loading posts...
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
				<div className="text-xl text-red-400">Error: {error.message}</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
			<header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700">
				<div className="max-w-4xl mx-auto px-6 py-8">
					<h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent mb-4">
						GraphQL Blog
					</h1>
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

export default App;
