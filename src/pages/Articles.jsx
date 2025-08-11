import React from "react";
import PostCard from "../components/posts/PostCard";
import postImage from "../assets/postcard-image.svg";

const posts = [
  {
    image: postImage,
    title: "Elon Musk shows off updates to his brain chips",
    description:
      "Elon Musk’s health tech venture Neuralink shared updates to its brain...",
  },
  {
    image: postImage,
    title: "AI beats humans in medical diagnosis",
    description:
      "A breakthrough AI has surpassed human doctors in detecting early-stage...",
  },
  {
    image: postImage,
    title: "NASA reveals plans for Mars mission",
    description:
      "NASA has unveiled a timeline for its upcoming human mission to Mars...",
  },
  {
    image: postImage,
    title: "NASA reveals plans for Mars mission",
    description:
      "NASA has unveiled a timeline for its upcoming human mission to Mars...",
  },
  {
    image: postImage,
    title: "NASA reveals plans for Mars mission",
    description:
      "NASA has unveiled a timeline for its upcoming human mission to Mars...",
  },
];
const Articles = () => {
  return (
    <div className="bg-[#EFEFEF]">
      <section className="p-6 md:px-20 md:py-8 lg:px-40 xl:px-60">
        <div className="space-y-2 mb-4">
          <h1 className="text-[40px] font-semibold text-[#8057F5] md:text-[60px]">For you</h1>
          <input
            type="text"
            placeholder="Search article"
            className="py-3 px-4 bg-[#E8E8E8] rounded-[25px] w-[300px]"
          />
          <h2 className="text-[25px] font-semibold text-[#3652E1]">All</h2>
        </div>
        <div className="space-y-10">
          {posts.map((post, index) => {
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

export default Articles;
