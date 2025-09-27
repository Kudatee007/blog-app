import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../components/common/DeleteButton";
import { usePosts } from "../context/PostContext";
import { postsAPI } from "../services/Api";
import { ACTIONS } from "../context/PostReducer";

const PostDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { state, dispatch } = usePosts();
  const post = state.posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post && slug) {
      (async () => {
        const entity = await postsAPI.getBySlug(slug); // GET by slug
        if (!entity) return;
        const attrs = entity.attributes || {};
        const ui = {
          id: entity.id,
          slug: attrs.Slug || attrs.slug || "",
          title: attrs.Title || attrs.title || "",
          // description: attrs.Content || "",
          content: attrs.Content || "",
          image:
            attrs.coverUrl ||
            attrs.coverImage?.data?.attributes?.url ||
            attrs.coverImage?.url ||
            "",
          publishedAt: attrs.publishedAt || attrs.createdAt || "",
          statusBlog: attrs.statusBlog || attrs.status || "Draft",
        };

        dispatch({ type: ACTIONS.UPSERT, payload: ui });
      })();
    }
  }, [slug, post, dispatch]);

  if (!post) return <section className="flex flex-col justify-center items-center min-h-screen">Loading…</section>;

  // navigate to edit page
  const handleEdit = () => {
    navigate(`/posts/${post.id}/edit`);
  };

  // delete post handler
  const handleDelete = async () => {
    try {
      console.log("[PostDetail] handleDelete start", { id: post.id });
      await postsAPI.delete(post.id);
      console.log("[PostDetail] server delete OK");
      dispatch({ type: ACTIONS.DELETE, payload: post.id });
      const fresh = await postsAPI.getAll();
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: fresh });
      navigate("/posts");
    } catch (e) {
      console.error("Delete failed:", e);
      alert("Could not delete the post.");
    }
  };

  return (
    <section className="max-w-3xl mx-auto py-16 px-6 bg-white rounded-lg h-100vh">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded mb-6 h-[500px]"
        />
      )}

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <span className="text-[#8E8E8E] text-sm block mb-6">
        {post.publishedAt ? `PUBLISHED ${post.publishedAt}` : post.statusBlog}
      </span>

      {Array.isArray(post.content) ? (
        post.content.map((b, i) => (
          <p key={i} className="mb-3">
            {b?.text ??
              (Array.isArray(b?.children)
                ? b.children.map((c) => c?.text).join(" ")
                : "")}
          </p>
        ))
      ) : (
        <p className="mb-3">{post.content}</p>
      )}

      <div className="mt-6 flex justify-between">
        <button
          onClick={handleEdit}
          className="py-2 px-8 text-black border-none rounded bg-[#EFEFEF] text-lg font-sm"
        >
          Edit
        </button>
        <DeleteButton onConfirm={handleDelete} />
      </div>
    </section>
  );
};

export default PostDetailPage;
