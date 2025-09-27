import { Link } from "react-router-dom";

// helpers
const asPlainText = (content) => {
  if (Array.isArray(content)) {
    return content
      .map(
        (b) =>
          b?.text ??
          (Array.isArray(b?.children)
            ? b.children.map((c) => c?.text).join(" ")
            : "")
      )
      .filter(Boolean)
      .join(" ");
  }
  return typeof content === "string" ? content : "";
};

const truncate = (text, limit = 100) => {
  const s = String(text || "").trim();
  if (s.length <= limit) return s;
  const cut = s.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  // breaking on a space to avoid chopping a word in half
  const safe = lastSpace > 40 ? cut.slice(0, lastSpace) : cut;
  return safe.trim() + "…";
};

export default function PostCard({ post, forceMobile = false }) {
  const { image, title, content } = post || {};
  if (!title && !content && !image) return null;

  return (
    <div className={`${forceMobile ? "max-w-[320px]" : "w-full"}`}>
      <article
        className={`bg-white rounded-[10px] ${forceMobile ? "w-full rounded-[25px]" : "md:flex md:w-full md:p-6 md:rounded-[14px]"}`}
      >
        {image && (
          <div>
            <img
              src={image}
              alt={title || "post image"}
              className={`w-full object-cover ${forceMobile ? "h-[230px]" : "h-[230px] md:h-[250px] md:w-[250px] md:rounded-[12px]"}`}
            />
          </div>
        )}
        <div
          className={`p-6 pb-10 space-y-2 rounded-b-[25px] ${forceMobile ? "" : "md:p-6 md:flex md:flex-col md:justify-end"}`}
        >
          {title && (
            <h3
              className={`font-semibold leading-none text-[#1C1C1C] ${forceMobile ? "text-base" : "text-base md:text-[30px]"}`}
            >
              {title}
            </h3>
          )}
          <p
            className={`font-normal leading-tight text-[#424242] pb-6 ${forceMobile ? "text-sm" : "text-sm md:text-base"}`}
          >
            {truncate(asPlainText(post.content), 100)}
          </p>
          <Link
            to={`/posts/${post.slug || post.Slug}`}
            className={`block w-full py-3 px-8 text-center text-[#EFEFEF] bg-[#3652E1] rounded-[25px] ${forceMobile ? "py-2 px-4" : "py-2 md:py-3 md:w-[200px]"}`}
          >
            Read More
          </Link>
        </div>
      </article>
    </div>
  );
}
