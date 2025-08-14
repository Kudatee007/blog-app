import { useState } from "react";
import { posts } from "../../utils/Posts";

export default function SearchPosts() {
  const [query, setQuery] = useState("");

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        className="border p-2 rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="mt-4">
        {filteredPosts.map(post => (
          <div key={post.id} className="border p-4 mb-2 rounded">
            {post.title}
          </div>
        ))}
      </div>
    </div>
  );
}
