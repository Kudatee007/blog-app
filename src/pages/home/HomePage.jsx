import React from "react";
import PostCard from "../../components/posts/PostCard";
import PostList from "../../components/posts/PostLister";
import smileyWoman from "../../assets/smiley-woman.svg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-[#EFEFEF]">
      {/* hero section */}
      <section className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-0 h-[90vh]">
        <img
          src={smileyWoman}
          alt=""
          className="w-full max-w-[400px] lg:max-w-[600px] object-contain"
        />
        <div className="text-right space-y-4">
          <h1 className="text-[65px] xl:text-[105px] leading-none font-semibold text-[#1C1C1C]">
            Write Your <br /> <span className="text-[#7851E9]">Article</span>
            <br /> here
          </h1>
          <Link to="/post-editor">
            <button className="bg-[#3652E1] w-[150px] md:w-[200px] py-3 px-4 text-[#EFEFEF] rounded-full font-meduim">
              Write
            </button>
          </Link>
        </div>
      </section>

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
      <section className="h-[90vh] bg-[#EFEFEF] flex justify-center items-center bg-[url('/subsribe-bg.svg')] bg-cover bg-center">
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
