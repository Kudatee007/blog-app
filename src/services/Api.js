import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:1337/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const postsAPI = {
  getAll: async (searchQuery = "") => {
    const params = {
      populate: "coverImage",
      "sort[0]": "publishedAt:desc",
      ...(searchQuery && { "filters[title][$contains]": searchQuery }), // your search endpoint
    };
    const res = await api.get("/blogs", { params });
    return res.data?.data ?? res.data;
  },

  // Get one
  getById: async (slug) => {
    const res = await api.get(`/blogs/${encodeURIComponent(slug)}`, {
      params: { "populate[coverImage]": "*" },
    });
    return res.data?.data;
  },

  getBySlug: async (slug) => {
    const res = await api.get(`/blogs/${encodeURIComponent(slug)}`, {
      params: { populate: "coverImage" },
    });
    return res.data?.data ?? res.data;
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
