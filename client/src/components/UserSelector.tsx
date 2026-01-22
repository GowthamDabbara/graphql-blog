import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useUser } from "../contexts/UserContext";

const GET_USERS = gql`
	query {
		users {
			id
			name
			email
		}
	}
`;

export function UserSelector() {
	const { currentUser, setCurrentUser } = useUser();
	const { data, loading } = useQuery(GET_USERS);

	if (loading) return <div>Loading users...</div>;

	return (
		<div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-4 border border-slate-700">
			<label className="block text-slate-300 mb-2 font-medium">
				Sign in as:
			</label>
			<select
				value={currentUser?.id || ""}
				onChange={(e) => {
					const user = data?.users.find(
						(u: any) => u.id === parseInt(e.target.value),
					);
					setCurrentUser(user || null);
				}}
				className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
			>
				<option value="">Select a user...</option>
				{data?.users.map((user: any) => (
					<option key={user.id} value={user.id}>
						{user.name} ({user.email})
					</option>
				))}
			</select>
		</div>
	);
}
