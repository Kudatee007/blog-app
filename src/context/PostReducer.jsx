export const initialState = {
  posts: [],
  loading: false,
  error: null,
  query: "",
};

export const ACTIONS = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  SET_QUERY: "SET_QUERY",
  UPSERT: "UPSERT",
  DELETE: "DELETE",
};

const ASSET_BASE = import.meta.env.VITE_ASSET_BASE || "http://localhost:1337";
const isString = (v) => typeof v === "string";

const withBase = (u) => {
  if (!isString(u) || u.length === 0) return "";
  return u.startsWith("http") ? u : `${ASSET_BASE}${u}`;
};

const getCoverUrl = (ci) => {
  if (!ci) return "";
  // plain string
  if (isString(ci)) return ci;
  // common Strapi shapes
  if (isString(ci?.url)) return ci.url; // { url }
  if (isString(ci?.data?.attributes?.url)) return ci.data.attributes.url;
  if (Array.isArray(ci)) {
    const first =
      (isString(ci[0]?.url) && ci[0].url) ||
      (isString(ci[0]?.formats?.medium?.url) && ci[0].formats.medium.url) ||
      (isString(ci[0]?.data?.attributes?.url) && ci[0].data.attributes.url);
    return first || "";
  }
  // formats on object
  const f = ci?.formats;
  if (isString(f?.medium?.url)) return f.medium.url;
  if (isString(f?.large?.url)) return f.large.url;
  if (isString(f?.thumbnail?.url)) return f.thumbnail.url;
  return "";
};

// Normalize API’s PascalCase + blocks to UI-friendly camelCase
const toUI = (p) => {
  const preview = Array.isArray(p?.Content)
    ? p.Content.map(
        (b) =>
          b?.text ??
          (Array.isArray(b?.children)
            ? b.children
                .map((c) => c?.text)
                .filter(Boolean)
                .join(" ")
            : "")
      )
        .filter(Boolean)
        .join(" ")
        .slice(0, 180)
    : "";


  const url = getCoverUrl(p?.coverImage) || (isString(p?.image) ? p.image : "");
  return {
    id: p.id ?? p.documentId,
    documentId: p.documentId,
    title: p.Title ?? p.title ?? "",
    slug: p.Slug ?? p.slug ?? "",
    description: p.description ?? preview,
    image: withBase(url),
    status: p.statusBlog ?? p.status,
    content: p.Content,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    publishedAt: p.publishedAt,
  };
};

export function postsReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return { ...state, loading: true, error: null };
    case ACTIONS.FETCH_SUCCESS: {
      const raw = Array.isArray(action.payload)
        ? action.payload
        : Array.isArray(action.payload?.data)
          ? action.payload.data
          : [];
      const posts = raw.map(toUI);
      return { ...state, loading: false, posts, error: null };
    }
    case ACTIONS.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload || "Fetch failed",
      };
    case ACTIONS.SET_QUERY:
      return { ...state, query: action.payload ?? "" };
    case ACTIONS.UPSERT: {
      const up = toUI(action.payload);
      const posts = [...state.posts.filter((p) => p.id !== up.id), up];
      return { ...state, posts };
    }
    case ACTIONS.DELETE:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
}
