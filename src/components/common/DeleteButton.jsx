// DeleteButton.tsx
import { useState } from "react";

export default function DeleteButton({ onConfirm, disabled }) {
  const [busy, setBusy] = useState(false);

  const handleClick = async () => {
    console.log("[DeleteButton] click");
    if (busy || disabled) return;
    const ok = window.confirm(
      "Delete this post? This action cannot be undone."
    );
    if (!ok) return;
    try {
      setBusy(true);
      await onConfirm?.();
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2
             2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1
             1 0 011-1h4a1 1 0 011 1v3m-9 0h10"
        />
      </svg>
      {busy ? "Deleting…" : "Delete"}
    </button>
  );
}
