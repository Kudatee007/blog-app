import React, { useEffect, useMemo, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postsAPI } from "../services/Api";
import { PostsContext } from "../context/PostContext";


// Tiny slugify
const slugify = (s = "") =>
  s
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const PostEditorPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [numericId, setNumericId] = useState(null);

  const postsCtx = useContext(PostsContext);
  const upsertPost = postsCtx?.upsertPost;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const autoSlug = useMemo(() => slugify(title), [title]);

  const [content, setContent] = useState("");
  const [statusBlog, setStatusBlog] = useState("Draft");
  const [loading, setLoading] = useState(false);

  // Image upload states
  const [coverImageId, setCoverImageId] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

useEffect(() => {
  let mounted = true;
  (async () => {
    if (!isEdit) return;
    
    try {
      setLoading(true);
      const data = await postsAPI.getByNumericId(id);
      console.log(data)
      
      if (!data) {
        console.log("No data returned from API");
        alert("Post not found");
        return;
      }
      const attrs = data.attributes || data;

      if (!mounted) return;

      // Extract values
      const titleValue = attrs.Title || "";
      const slugValue = attrs.Slug || "";
      const contentValue = attrs.Content || "";
      const statusValue = attrs.statusBlog || "Draft";
      const idValue = data.id;

      // Set the state
      setTitle(titleValue);
      setSlug(slugValue);
      setContent(contentValue);
      setStatusBlog(statusValue);
      setNumericId(idValue);

      // Handle cover image
      const coverImage = attrs.coverImage;
      if (coverImage) {
        if (coverImage.data) {
          setCoverImageId(coverImage.data.id);
          setCoverImageUrl(coverImage.data.attributes?.url || "");
        } else if (coverImage.id) {
          setCoverImageId(coverImage.id);
          setCoverImageUrl(coverImage.url || "");
        }
      }
    } catch (e) {
      alert("Failed to load the post for editing.", e);
    } finally {
      if (mounted) setLoading(false);
    }
  })();
  return () => {
    mounted = false;
  };
}, [id, isEdit]);

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // Validate file size (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      // Create FormData and upload via existing API
      const uploadedFile = await postsAPI.upload(file, (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(progress);
      });

      // Set uploaded file data
      setCoverImageId(uploadedFile.id);
      setCoverImageUrl(uploadedFile.url);
    } catch (e) {
      alert("Failed to upload image. Please try again.", e);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // Remove cover image
  const removeCoverImage = () => {
    setCoverImageId(null);
    setCoverImageUrl("");
  };

  const buildPayload = (nextStatus) => {
    const finalSlug = slug?.trim() ? slugify(slug) : autoSlug;
    return {
      data: {
        Title: title.trim(),
        Slug: finalSlug,
        Content: content,
        statusBlog: nextStatus,
        ...(coverImageId ? { coverImage: coverImageId } : {}),
      },
    };
  };

  const save = async (nextStatus) => {
    if (!title.trim()) return alert("Title is required.");
    if (nextStatus === "Published" && !content.trim()) {
      return alert("Content is required to publish.");
    }

    try {
      setLoading(true);
      const payload = buildPayload(nextStatus);

      let saved;
      if (isEdit) {
        // Use stored numeric ID for updates
        if (!numericId) {
          throw new Error("No numeric ID found for update");
        }
        saved = await postsAPI.update(numericId, payload); // Use numericId instead of id
      } else {
        saved = await postsAPI.create(payload);
      }

      const entity = Array.isArray(saved) ? saved[0] : saved;
      const attrs = entity?.attributes || entity;

      if (upsertPost) upsertPost({ id: entity?.id, ...(attrs || {}) });

      const nextSlug = attrs?.Slug || attrs?.slug || entity?.id;
      alert(
        nextStatus === "Published" ? "Post published ✅" : "Draft saved 💾"
      );
      navigate(`/posts/${encodeURIComponent(nextSlug)}`);
    } catch (e) {
      console.error("Save error:", e);
      alert("Could not save the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pb-10">
      <div className="max-w-3xl mx-auto p-6 md:py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            {isEdit ? "Edit Post" : "Create Post"}
          </h1>
          {loading && (
            <span className="text-sm text-gray-500 animate-pulse">
              Working...
            </span>
          )}
        </div>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            save("Published");
          }}
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter post title"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 md:p-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Slug (auto from title; you can override)
              </label>
              <input
                type="text"
                placeholder={autoSlug || "auto-slug"}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 md:p-4"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 md:p-4"
                value={statusBlog}
                onChange={(e) => setStatusBlog(e.target.value)}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>

            {!coverImageUrl ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="mt-4">
                    <label htmlFor="cover-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        {uploading ? "Uploading..." : "Upload cover image"}
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB
                      </span>
                    </label>
                    <input
                      id="cover-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                  </div>

                  {uploading && (
                    <div className="mt-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {uploadProgress}% uploaded
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={
                    coverImageUrl.startsWith("http")
                      ? coverImageUrl
                      : `${import.meta.env.VITE_ASSET_BASE || "http://localhost:1337"}${coverImageUrl}`
                  }
                  alt="Cover preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeCoverImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  title="Remove image"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("cover-upload").click()
                  }
                  className="absolute bottom-2 right-2 bg-indigo-500 text-white px-3 py-1 rounded text-sm hover:bg-indigo-600"
                >
                  Change Image
                </button>
                <input
                  id="cover-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              rows={8}
              placeholder="Write your post here..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 md:p-4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
              disabled={loading || uploading}
              title="Publish immediately"
            >
              Publish
            </button>

            <button
              type="button"
              className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-60"
              onClick={() => save("Draft")}
              disabled={loading || uploading}
              title="Save as Draft"
            >
              Save as Draft
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PostEditorPage;
