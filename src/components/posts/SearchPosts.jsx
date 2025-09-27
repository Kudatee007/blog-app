// import { useState } from "react";
// import { Search } from "lucide-react";

// export default function SearchPosts() {
//   const [query, setQuery] = useState("");

//   return (
//     <div className="relative">
//       <Search className="hover:text-[#7851E9] absolute top-3 left-3" />
//       <input
//         type="text"
//         placeholder="Search article"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className="py-3 px-4 bg-[#efefef] md:bg-white rounded-[25px] w-full pl-10"
//       />
//     </div>
//   );
// }

// Update SearchPosts.jsx to include clear functionality:

import { useState, useCallback } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../../context/PostContext";

export default function SearchPosts() {
  const [query, setQuery] = useState("");
  const { fetchPosts, setQuery: setGlobalQuery, state } = usePosts();
  const navigate = useNavigate();

  const handleSearch = useCallback(
    async (searchQuery) => {
      const trimmedQuery = searchQuery.trim();
      setGlobalQuery(trimmedQuery);
      await fetchPosts(trimmedQuery);

      if (window.location.pathname !== "/posts") {
        navigate("/posts");
      }
    },
    [fetchPosts, setGlobalQuery, navigate]
  );

  const handleClear = async () => {
    setQuery("");
    setGlobalQuery("");
    await fetchPosts(""); // Fetch all posts
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      handleSearch(newQuery);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(window.searchTimeout);
    handleSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search
        className="hover:text-[#7851E9] absolute top-3 left-3 cursor-pointer"
        onClick={() => handleSearch(query)}
      />
      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={handleInputChange}
        className="py-3 px-4 bg-[#efefef] md:bg-white rounded-[25px] w-full pl-10 pr-10"
      />
      {(query || state.query) && (
        <X
          className="absolute top-3 right-3 cursor-pointer hover:text-red-500"
          onClick={handleClear}
          size={20}
        />
      )}
    </form>
  );
}
