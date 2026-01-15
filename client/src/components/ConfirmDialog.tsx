import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ConfirmDialogProps {
	isOpen: boolean;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	onCancel: () => void;
	isDanger?: boolean;
}

export function ConfirmDialog({
	isOpen,
	title,
	message,
	confirmText = "Confirm",
	cancelText = "Cancel",
	onConfirm,
	onCancel,
	isDanger = false,
}: ConfirmDialogProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
			// Trigger animation after mount
			setTimeout(() => setIsVisible(true), 10);
		} else {
			setIsVisible(false);
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return createPortal(
		<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
			{/* Backdrop with smooth transition */}
			<div
				className={`fixed inset-0 bg-black/70 backdrop-blur-sm transition-all duration-300 ease-out ${
					isVisible ? "opacity-100" : "opacity-0"
				}`}
				onClick={onCancel}
			/>

			{/* Dialog with smooth scale + fade transition */}
			<div
				className={`relative bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-md w-full p-6 z-10 transition-all duration-300 ease-out ${
					isVisible
						? "opacity-100 scale-100 translate-y-0"
						: "opacity-0 scale-95 translate-y-4"
				}`}
			>
				{/* Icon */}
				<div
					className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4 ${
						isDanger
							? "bg-red-500/10 text-red-400 border border-red-500/30"
							: "bg-sky-500/10 text-sky-400 border border-sky-500/30"
					}`}
				>
					{isDanger ? "⚠️" : "ℹ️"}
				</div>

				{/* Title */}
				<h3 className="text-xl font-bold text-white mb-2">{title}</h3>

				{/* Message */}
				<p className="text-slate-400 mb-6 leading-relaxed">{message}</p>

				{/* Buttons */}
				<div className="flex gap-3">
					<button
						onClick={onCancel}
						className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all"
					>
						{cancelText}
					</button>
					<button
						onClick={onConfirm}
						className={`flex-1 px-4 py-2.5 font-semibold rounded-xl transition-all ${
							isDanger
								? "bg-red-500 hover:bg-red-600 text-white"
								: "bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white"
						}`}
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
}
