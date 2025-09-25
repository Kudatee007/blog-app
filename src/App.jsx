import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/HomePage";
import PostDetails from "./pages/PostDetailPage";
import PostEditorPage from "./pages/PostEditorPage";
import PostList from "./components/posts/PostList";
import { PostsProvider } from "./context/Provider";
import { usePosts } from "./context/PostContext";

function PostsRoute() {
  const { state } = usePosts();
  return <PostList posts={state.posts} loading={state.loading} />;
}

export default function App() {
  return (
    <PostsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/posts" element={<PostsRoute />} />
            <Route path="/posts/:slug" element={<PostDetails />} />
            <Route path="/post-editor" element={<PostEditorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PostsProvider>
  );
}

