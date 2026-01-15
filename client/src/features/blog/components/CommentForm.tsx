import { useState, type FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_COMMENT } from "../graphql/mutations";
import { GET_POST_BY_SLUG } from "../graphql/queries";

interface CommentFormProps {
	postId: number; // ✅ Keep as number
	postSlug: string;
}

export function CommentForm({ postId, postSlug }: CommentFormProps) {
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);

	const [createComment] = useMutation(CREATE_COMMENT, {
		refetchQueries: [
			{ query: GET_POST_BY_SLUG, variables: { slug: postSlug } },
		],
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!content.trim()) {
			alert("Please enter a comment");
			return;
		}

		setLoading(true);

		try {
			console.log("Submitting comment with:", {
				content: content.trim(),
				postId: postId, // ✅ Already a number, no conversion needed
				authorId: 2,
			});

			const result = await createComment({
				variables: {
					input: {
						content: content.trim(),
						postId: postId, // ✅ Send as number
						authorId: 2,
					},
				},
			});

			console.log("Success!", result);
			setContent("");
			alert("Comment added successfully!");
		} catch (err: any) {
			console.error("Full error:", err);
			console.error("GraphQL errors:", err.graphQLErrors);
			console.error("Network error:", err.networkError);
			alert("Failed to add comment. Check console.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-slate-700/20 rounded-xl p-6 mb-8 border border-slate-700/50"
		>
			<h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
				<span>✍️</span>
				<span>Add a Comment</span>
			</h3>

			<div className="mb-4">
				<label
					htmlFor="content"
					className="block text-slate-300 mb-2 font-medium"
				>
					Comment as{" "}
					<span className="text-sky-400 font-semibold">Bob Smith</span>
				</label>
				<textarea
					id="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					disabled={loading}
					rows={4}
					className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none transition-all"
					placeholder="Share your thoughts..."
				/>
			</div>

			<button
				type="submit"
				disabled={loading || !content.trim()}
				className="px-6 py-3 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all shadow-lg hover:shadow-xl hover:shadow-sky-500/30"
			>
				{loading ? "Posting..." : "Post Comment"}
			</button>
		</form>
	);
}
