import { useEffect } from "react";
import { useParams } from "react-router-dom";
import neral from "../assets/Rectangle91.svg";
import DeleteButton from "../components/common/DeleteButton";
import { usePosts } from "../context/PostContext";
import { postsAPI } from "../services/Api";
import { ACTIONS } from "../context/PostReducer";

const PostDetailPage = () => {
  const { slug } = useParams();
  const { state, dispatch } = usePosts();

  const post = state.posts.find((p) => p.slug === slug);

  useEffect(() => {
    // If not in cache, fetch just this one
    if (!post) {
      (async () => {
        const raw = await postsAPI.getBySlug(slug); // GET /posts/:slug
        if (raw) dispatch({ type: ACTIONS.UPSERT, payload: raw }); // reducer calls toUI()
      })();
    }
  }, [slug, post, dispatch]);

  if (!post) return <section className="p-6">Loading…</section>;

  return (
    // <section className="p-6 md:px-20 md:py-12 lg:px-40 xl:px-60 mb-12">
    //   <h1 className="text-[#1C1C1C] text-[22px] font-semibold leading-tight md:text-[30px]">
    //     Elon Musk shows off updates to his brain chips and says he’s going to
    //     install one in himself when they are ready
    //   </h1>
    //   <div className="pt-6 pb-8">
    //     <span className="text-[#8E8E8E] text-sm">
    //       PUBLISHED THU, DEC 1 20228:09 AM
    //     </span>
    //     <img src={neral} alt="" className="w-full h-auto" />
    //   </div>
    //   <p className="text-base text-[#1C1C1C] font-normal md:text-[18px]">
    //     gsgsg
    //   </p>

    //   <div className="mt-6 flex justify-end">
    //     <DeleteButton />
    //   </div>
    // </section>
    <article className="max-w-3xl mx-auto p-6 bg-white rounded-lg">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <span className="text-[#8E8E8E] text-sm">
        PUBLISHED {post.publishedAt}
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
        <p>{post.description}</p>
      )}
    </article>
  );
};

export default PostDetailPage;
