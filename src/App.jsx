import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/HomePage";
import Posts from "./components/posts/PostList";
import PostDetails from "./pages/PostDetailPage";
import PostEditorPage from "./pages/PostEditorPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/posts" element={<Posts />} />
             <Route path="/post-details" element={<PostDetails />} />
             <Route path="/post-editor" element={<PostEditorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
