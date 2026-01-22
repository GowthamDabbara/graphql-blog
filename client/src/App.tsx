import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlogList } from "./features/blog/components/BlogList";
import { PostDetail } from "./features/blog/components/PostDetail";
import { CreatePost } from "./features/blog/components/CreatePost";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<BlogList />} />
				<Route path="/post/:slug" element={<PostDetail />} />
				<Route path="/create" element={<CreatePost />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
