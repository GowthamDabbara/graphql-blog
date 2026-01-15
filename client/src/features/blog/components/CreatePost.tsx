import { useState, type FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import { CREATE_POST } from "../graphql/mutations";
import { GET_POSTS } from "../graphql/queries";

export function CreatePost() {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [excerpt, setExcerpt] = useState("");
	const [loading, setLoading] = useState(false);

	const [createPost] = useMutation(CREATE_POST, {
		refetchQueries: [{ query: GET_POSTS, variables: { published: true } }],
	});

	// Generate slug from title
	const generateSlug = (text: string): string => {
		return text
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, "")
			.replace(/[\s_-]+/g, "-")
			.replace(/^-+|-+$/g, "");
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!title.trim() || !content.trim()) {
			return;
		}

		setLoading(true);

		try {
			const slug = generateSlug(title);

			console.log("Creating post with:", {
				title: title.trim(),
				slug,
				content: content.trim(),
				excerpt: excerpt.trim() || null,
				authorId: 1, // Alice from seed data
			});

			const result = await createPost({
				variables: {
					input: {
						title: title.trim(),
						slug,
						content: content.trim(),
						excerpt: excerpt.trim() || null,
						authorId: 1,
						published: true,
					},
				},
			});

			console.log("Post created!", result);
			navigate("/");
		} catch (err: any) {
			console.error("Error creating post:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
			{/* Header */}
			<header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700">
				<div className="max-w-4xl mx-auto px-6 py-6">
					<button
						onClick={() => navigate("/")}
						className="text-sky-400 hover:text-sky-300 font-semibold mb-4 flex items-center gap-2"
					>
						← Back to all posts
					</button>
					<h1 className="text-4xl font-bold text-white">Create New Post</h1>
				</div>
			</header>

			{/* Form */}
			<main className="max-w-4xl mx-auto px-6 py-12">
				<form
					onSubmit={handleSubmit}
					className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700 p-8"
				>
					{/* Title */}
					<div className="mb-6">
						<label
							htmlFor="title"
							className="block text-slate-300 font-semibold mb-2"
						>
							Title <span className="text-red-400">*</span>
						</label>
						<input
							id="title"
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							disabled={loading}
							className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
							placeholder="Enter post title..."
						/>
						{title && (
							<p className="text-sm text-slate-400 mt-2">
								Slug:{" "}
								<span className="text-sky-400">{generateSlug(title)}</span>
							</p>
						)}
					</div>

					{/* Excerpt */}
					<div className="mb-6">
						<label
							htmlFor="excerpt"
							className="block text-slate-300 font-semibold mb-2"
						>
							Excerpt (optional)
						</label>
						<input
							id="excerpt"
							type="text"
							value={excerpt}
							onChange={(e) => setExcerpt(e.target.value)}
							disabled={loading}
							className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
							placeholder="Short summary..."
						/>
					</div>

					{/* Content */}
					<div className="mb-6">
						<label
							htmlFor="content"
							className="block text-slate-300 font-semibold mb-2"
						>
							Content <span className="text-red-400">*</span>
						</label>
						<textarea
							id="content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							disabled={loading}
							rows={12}
							className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none font-mono text-sm"
							placeholder="Write your post content..."
						/>
					</div>

					{/* Author info */}
					<div className="mb-6 bg-slate-700/30 rounded-lg p-4">
						<p className="text-slate-300 text-sm">
							Posting as:{" "}
							<span className="text-sky-400 font-semibold">Alice Chen</span>
						</p>
					</div>

					{/* Submit button */}
					<div className="flex gap-4">
						<button
							type="submit"
							disabled={loading || !title.trim() || !content.trim()}
							className="px-8 py-3 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 disabled:opacity-50 rounded-lg font-semibold text-white transition-all cursor-pointer disabled:cursor-not-allowed"
						>
							{loading ? "Creating..." : "Create Post"}
						</button>
						<button
							type="button"
							onClick={() => navigate("/")}
							disabled={loading}
							className="px-8 py-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded-lg font-semibold text-white transition-all"
						>
							Cancel
						</button>
					</div>
				</form>
			</main>
		</div>
	);
}
