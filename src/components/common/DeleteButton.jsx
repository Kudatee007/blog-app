// DeleteButton.tsx
export default function DeleteButton() {
    const handleDelete = () => {
      if (window.confirm("Are you sure you want to delete this post?")) {
        // Call API to delete post here
        console.log("Post deleted!");
      }
    };
  
    return (
      <button
        onClick={handleDelete}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 
               2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 
               1 0 011-1h4a1 1 0 011 1v3m-9 0h10" />
        </svg>
        Delete
      </button>
    );
  }
  