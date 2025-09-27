// PostList.jsx
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PostCard from "./PostCard";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { register } from "swiper/element/bundle";
import { posts } from "../../utils/Posts";

const PostLister = () => {
  useEffect(() => {
    register(); // Register Swiper Web Components

    const swiperEl = document.querySelector("swiper-container");
    swiperEl.breakpoints = {
      320: { slidesPerView: 1.2, spaceBetween: 10 }, // mobile
      640: { slidesPerView: 2.2, spaceBetween: 15 }, // tablet
      1024: { slidesPerView: 3.5, spaceBetween: 20 }, // desktop
    };
  }, []);
  return (
    <div className="">
      <swiper-container
        slides-per-view="3.5"
        space-between="20"
        grab-cursor="true"
        effect="coverflow"
        centered-slides="false"
        pagination="true"
        coverflow-effect-rotate="50"
        coverflow-effect-stretch="0"
        coverflow-effect-depth="100"
        coverflow-effect-modifier="1"
        coverflow-effect-slide-shadows="true"
        style={{ paddingBottom: "10px" }}
      >
        {posts.map((post, index) => (
          <swiper-slide key={index}>
            <PostCard
              forceMobile={true}
              image={post.image}
              title={post.title}
              description={post.description}
            />
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
};

export default PostLister;
