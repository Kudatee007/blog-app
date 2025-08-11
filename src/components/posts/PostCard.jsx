import React from "react";

const PostCard = ({ image, title, description, forceMobile = false }) => {
  return (
    <div className={`${forceMobile ? "max-w-[320px]" : "w-full"}`}>
      <article className={`bg-white rounded-[10px] ${forceMobile ? "w-full rounded-[25px]" : "md:flex md:w-full md:p-6 md:rounded-[14px]"}`}>
        {image && (
          <div>
            <img
              src={image}
              alt={title}
              className={`w-full object-cover 
                ${forceMobile ? "h-[230px]" : "h-[230px] md:h-[250px] md:w-[250px] md:rounded-[12px]"}
              `}
            />
          </div>
        )}
        <div
          className={`p-6 pb-10 space-y-2 rounded-b-[25px] 
            ${forceMobile ? "" : "md:p-6 md:flex md:flex-col md:justify-end"}
          `}
        >
          <h3
            className={`font-semibold leading-none text-[#1C1C1C] 
              ${forceMobile ? "text-base" : "text-base md:text-[30px]"}
            `}
          >
            {title}
          </h3>
          <p
            className={`font-normal leading-tight text-[#424242] 
              ${forceMobile ? "text-sm" : "text-sm md:text-base"}
            `}
          >
            {description}
          </p>
          <button
            className={`w-full text-[#EFEFEF] bg-[#3652E1] rounded-[25px] 
              ${forceMobile ? "py-2 mt-4" : "py-2 mt-4 md:py-3 md:w-[200px]"}
            `}
          >
            Read More
          </button>
        </div>
      </article>
    </div>
  );
};

export default PostCard;
