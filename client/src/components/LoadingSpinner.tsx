export function LoadingSpinner() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
			<div className="text-center">
				<div className="inline-block w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin mb-4"></div>
				<p className="text-2xl text-slate-300 animate-pulse">Loading...</p>
			</div>
		</div>
	);
}
