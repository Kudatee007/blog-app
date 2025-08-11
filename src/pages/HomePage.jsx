import React from "react";
import PostCard from "../components/posts/PostCard";
import PostList from "../components/posts/PostList";

const HomePage = () => {
  return (
    <div className="">
      <section className="flex flex-col lg:flex-row items-center gap-6 bg-[url('/Circlesbackground.svg')] bg-cover bg-center h-[100vh] w-full">
        {/* First Column - 40% */}
        <div className="basis-2/5 flex flex-col justify-center items-center text-center py-6">
          <h2 className="text-[65px] xl:text-[95px] leading-tight font-meduim text-[#1C1C1C] w-[5ch]">
            Best <span className="text-[#EFEFEF]">Article</span> Today
          </h2>
          <button className="mt-4 px-8 py-4 bg-[#EFEFEF] text-[#7851E9] rounded-full">
            See All Articles
          </button>
        </div>

        {/* Second Column - 60% */}
        <div className="basis-3/5 bg-white rounded-lg p-4 overflow-hidden hidde">
          <PostList />
        </div>
      </section>
      <section className="h-[90vh] bg-[#EFEFEF] flex justify-center items-center">
        <div className="bg-white rounded-[15px] w-[90%] md:w-[50%] p-6 md:p-20 space-y-1">
          <h4 className="font-semibold text-[40px] text-[#2B2C34]">
            Subscribe
          </h4>
          <p className="text-base text-[#2B2C34]">
            Subscribe to our newsletter and get upto 40% off on our exclusive
            service.
          </p>
          <div className="w-full flex pt-8">
            <input
              type="text"
              placeholder="Email Address"
              className="border-2 p-3 w-full rounded-l-[10px] border-[#6246EA]"
            />
            <button className="bg-[#6246EA] py-3 px-4 rounded-r-[10px] text-white font-semibold text-base basis-4/12 ">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
