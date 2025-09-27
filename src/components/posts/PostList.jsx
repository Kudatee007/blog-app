import React from "react";
import PostCard from "./PostCard";
import { usePosts } from "../../context/PostContext";

const PostList = () => {
  const { state } = usePosts();
  const { posts, loading, query } = state;
  
  if (loading) return (
    <div className="bg-[#EFEFEF] min-h-screen">
      <section className="p-6 md:px-20 md:py-8 lg:px-40 xl:px-60">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-500 animate-pulse">Loading posts...</div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="bg-[#EFEFEF] min-h-screen">
      <section className="p-6 md:px-20 md:py-8 lg:px-40 xl:px-60">
        <div className="space-y-2 mb-4">
          <h1 className="text-[35px] font-semibold text-[#8057F5] md:text-[45px]">
            {query ? 'Search Results' : 'For you'}
          </h1>
          
          {query && (
            <p className="text-gray-600">
              Showing results for: <span className="font-medium">"{query}"</span>
            </p>
          )}
          
          <h2 className="text-[25px] font-semibold text-[#3652E1]">
            {query ? `${posts.length} Results` : 'All'}
          </h2>
        </div>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            {query ? (
              <div className="space-y-2">
                <p className="text-gray-500 text-lg">No posts found for "{query}"</p>
                <p className="text-gray-400">Try different keywords or check your spelling</p>
              </div>
            ) : (
              <p className="text-gray-500">No posts available</p>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            {posts.map((post) => (
              <PostCard
                key={post.slug || post.id}
                post={post}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PostList;