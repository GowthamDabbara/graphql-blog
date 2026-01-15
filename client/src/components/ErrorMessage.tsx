interface ErrorMessageProps {
	message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
			<div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-8 max-w-md">
				<h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
				<p className="text-slate-300">{message}</p>
			</div>
		</div>
	);
}
