import { useEffect, useMemo, useReducer } from "react";
import { postsAPI } from "../services/Api";
import { PostsContext } from "./PostContext";
import { postsReducer, initialState, ACTIONS } from "./PostReducer";

export function PostsProvider({ children }) {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  const fetchPosts = async (search = "") => {
    dispatch({ type: ACTIONS.FETCH_START });
    try {
      const data = await postsAPI.getAll(search);
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: err?.message });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      fetchPosts,
      setQuery: (q) => dispatch({ type: ACTIONS.SET_QUERY, payload: q }),
      upsertPost: (post) => dispatch({ type: ACTIONS.UPSERT, payload: post }),
      deletePostLocal: (id) => dispatch({ type: ACTIONS.DELETE, payload: id }),
    }),
    [state]
  );

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
}
