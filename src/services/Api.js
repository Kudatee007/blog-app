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

  getByNumericId: async (id) => {
    console.log("=== API getByNumericId DEBUG ===");
    console.log("Searching for numeric ID:", id);
    
    try {
      const res = await api.get("/blogs", {
        params: {
          "filters[id][$eq]": id,
          "populate": "coverImage",
          "pagination[pageSize]": 1,
        },
      });    
      const items = res.data?.data ?? [];  
      const result = items[0] ?? null;
      return result;
      
    } catch (error) {
      console.log("=== END API getByNumericId DEBUG (ERROR) ===");
      throw error;
    }
  },


  // Get one
  getById: async (id) => {
    const res = await api.get(`/blogs/${id}`, {
      params: { "populate[coverImage]": "*" },
    });
    return res.data?.data;
  },

  // upload method with progress tracking
  upload: async (file, onProgress) => {
    const formData = new FormData();
    formData.append("files", file);
    
    try {
      const res = await api.post("/upload", formData, {
        headers: { 
          "Content-Type": "multipart/form-data" 
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress({ loaded: progressEvent.loaded, total: progressEvent.total, progress });
          }
        },
      });
      
      // Strapi returns an array of uploaded files
      const uploadedFile = res.data?.[0];
      if (!uploadedFile) {
        throw new Error("No file returned from upload");
      }
      
      return uploadedFile;
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error(error.response?.data?.error?.message || "Upload failed");
    }
  },

  // Cloudinary upload
  uploadToCloudinary: async (file, onProgress) => {
    const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    
    if (!CLOUDINARY_UPLOAD_PRESET || !CLOUDINARY_CLOUD_NAME) {
      throw new Error("Cloudinary configuration missing");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              onProgress({ loaded: progressEvent.loaded, total: progressEvent.total, progress });
            }
          },
        }
      );
      
      return {
        id: res.data.public_id,
        url: res.data.secure_url,
        public_id: res.data.public_id,
        width: res.data.width,
        height: res.data.height,
      };
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error(error.response?.data?.error?.message || "Cloudinary upload failed");
    }
  },

getBySlug: async (slug) => {  
  const qs = new URLSearchParams({
    "filters[Slug][$eq]": slug,
    "populate": "coverImage",
    // "pagination[pageSize]": 1,
  }).toString();  
  const res = await api.get(`/blogs?${qs}`);
  
  const items = res.data?.data ?? [];
  const result = items[0] ?? null;

  return result;
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
    return res.data?.data ?? null;
  },
};

export const healthCheck = async () => (await api.get("/health")).data;

export default api;
