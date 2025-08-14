import React, { useState } from "react";
import PostCard from "../../components/posts/PostCard";
import { posts } from "../../utils/Posts";

const PostList = () => {
  const [query, setQuery] = useState("");

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );
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
        <div className="space-y-10">
          {filteredPosts.map((post, index) => {
            return (
              <PostCard
                forceMobile={false}
                key={index}
                image={post.image}
                title={post.title}
                description={post.description}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default PostList;
