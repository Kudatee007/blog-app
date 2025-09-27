import React, { useState, useMemo } from "react";
import PostCard from "./PostCard";

const PostList = ({ posts = [], onPostDelete, loading = false }) => {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) =>
      (p?.title || "").toLowerCase().includes(q)
      || (p?.description || "").toLowerCase().includes(q)
    );
  }, [posts, query]);

  console.log(filtered);
  
  if (loading) return <div className="p-4">Loading…</div>;
  if (!filtered.length)
    return <div className="p-4 text-center text-gray-500">No posts found.</div>;

  return (
    <div className="bg-[#EFEFEF] min-h-screen">
      <section className="p-6 md:px-20 md:py-8 lg:px-40 xl:px-60">
        <div className="space-y-2 mb-4">
          <h1 className="text-[35px] font-semibold text-[#8057F5] md:text-[45px]">
            For you
          </h1>
          <input
            type="text"
            placeholder="Search article"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="py-3 px-4 bg-[#E8E8E8] rounded-[25px] w-[300px]"
          />
          <h2 className="text-[25px] font-semibold text-[#3652E1]">All</h2>
        </div>
        {filtered.length === 0 ? (
          <p className="text-gray-500">No posts match “{query}”.</p>
        ) : (
          <div className="space-y-10">
            {filtered.map((post) => (
              <PostCard
                key={post.slug || post.id}
                post={post}
                onDelete={onPostDelete}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PostList;
