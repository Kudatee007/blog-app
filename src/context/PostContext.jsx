// posts-context.js
import { createContext, useContext } from "react";

export const PostsContext = createContext(null);

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error("usePosts must be used within PostsProvider");
  return ctx;
}