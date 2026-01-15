export function PostCardSkeleton() {
	return (
		<article className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 animate-pulse">
			{/* Title skeleton */}
			<div className="h-8 bg-slate-700/50 rounded-lg w-3/4 mb-4"></div>

			{/* Excerpt skeleton */}
			<div className="space-y-2 mb-4">
				<div className="h-4 bg-slate-700/50 rounded w-full"></div>
				<div className="h-4 bg-slate-700/50 rounded w-5/6"></div>
				<div className="h-4 bg-slate-700/50 rounded w-4/6"></div>
			</div>

			{/* Meta skeleton */}
			<div className="flex items-center justify-between">
				<div className="h-4 bg-slate-700/50 rounded w-32"></div>
				<div className="h-4 bg-slate-700/50 rounded w-24"></div>
			</div>

			{/* Comments skeleton */}
			<div className="mt-4">
				<div className="h-4 bg-slate-700/50 rounded w-28"></div>
			</div>
		</article>
	);
}
