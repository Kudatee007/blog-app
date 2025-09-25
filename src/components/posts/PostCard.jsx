import { Link } from "react-router-dom";

export default function PostCard({ post, forceMobile = false }) {
  const { image, title, description } = post || {};
  if (!title && !description && !image) return null;
  console.log(post);

  return (
    <div className={`${forceMobile ? "max-w-[320px]" : "w-full"}`}>
      <article className={`bg-white rounded-[10px] ${forceMobile ? "w-full rounded-[25px]" : "md:flex md:w-full md:p-6 md:rounded-[14px]"}`}>
        {image && (
          <div>
            <img
              src={image}
              alt={title || "post image"}
              className={`w-full object-cover ${forceMobile ? "h-[230px]" : "h-[230px] md:h-[250px] md:w-[250px] md:rounded-[12px]"}`}
            />
          </div>
        )}
        <div className={`p-6 pb-10 space-y-2 rounded-b-[25px] ${forceMobile ? "" : "md:p-6 md:flex md:flex-col md:justify-end"}`}>
          {title && <h3 className={`font-semibold leading-none text-[#1C1C1C] ${forceMobile ? "text-base" : "text-base md:text-[30px]"}`}>{title}</h3>}
          {description && <p className={`font-normal leading-tight text-[#424242] pb-6 ${forceMobile ? "text-sm" : "text-sm md:text-base"}`}>{description}</p>}
          <Link to="/post-details" className={`block w-full py-3 px-8 text-center text-[#EFEFEF] bg-[#3652E1] rounded-[25px] ${forceMobile ? "py-2 px-4" : "py-2 md:py-3 md:w-[200px]"}`}>
            Read More
          </Link>
        </div>
      </article>
    </div>
  );
}
