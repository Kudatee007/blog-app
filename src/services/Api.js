import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:1337/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Small helper to build params
const buildParams = (q) => ({
  populate: "coverImage", // return the media field
  "sort[0]": "publishedAt:desc", // Strapi array sort syntax
  ...(q && {
    // case-insensitive contains on Title and Slug
    "filters[$or][0][Title][$containsi]": q,
    "filters[$or][1][Slug][$containsi]": q,
  }),
});

export const postsAPI = {
  // Get all
  getAll: async (searchQuery = "") => {
    const res = await api.get("/blogs", { params: buildParams(searchQuery) });
    return res.data?.data ?? res.data;
  },

  // Get one
  getById: async (id) => {
    const res = await api.get(`/blogs/${id}`, {
      params: { "populate[coverImage]": "*" },
    });
    return res.data?.data;
  },

  // Create
  create: async (postData) => {
    const res = await api.post("/blogs", postData);
    return res.data?.data;
  },

  // Update
  update: async (id, postData) => {
    const res = await api.put(`/blogs/${id}`, postData);
    return res.data?.data;
  },

  // Delete
  delete: async (id) => {
    const res = await api.delete(`/blogs/${id}`);
    return res.data?.data;
  },
};

export const healthCheck = async () => (await api.get("/health")).data;

export default api;
