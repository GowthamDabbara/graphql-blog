export function LoadingSpinner() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
			<div className="text-center">
				{/* Animated spinner */}
				<div className="relative w-24 h-24 mx-auto mb-6">
					<div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
					<div className="absolute inset-0 border-4 border-transparent border-t-sky-400 border-r-emerald-400 rounded-full animate-spin"></div>
				</div>

				{/* Loading text */}
				<p className="text-2xl font-semibold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">
					Loading...
				</p>
			</div>
		</div>
	);
}
