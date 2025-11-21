// store/useBlogStore.ts
import { create } from "zustand";
import api from "@/lib/axios";

export interface Blog {
    _id: string;
    title: string;
    slug: string;
    description: string;
    productIds: any[];
    thumbnail: string;
    category: string;
    tags: string[];
    author: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    createdAt: string;
}

interface BlogStore {
    blogs: Blog[];
    blog: Blog | null;
    loading: boolean;
    error: string | null;

    fetchAllBlogs: () => Promise<void>;
    fetchBlogBySlug: (slug: string) => Promise<void>;
    clearBlog: () => void;
    clearError: () => void;
}

export const useBlogStore = create<BlogStore>((set) => ({
    blogs: [],
    blog: null,
    loading: false,
    error: null,

    // Fetch all blogs
    fetchAllBlogs: async () => {
        try {
            set({ loading: true, error: null });
            const { data } = await api.get("/blog");
            const blogs = Array.isArray(data) ? data : data.blogs;
            set({ blogs, loading: false });
        } catch (err: any) {
            console.error("Error fetching blogs:", err);
            set({
                loading: false,
                error: err.message || "Failed to fetch blogs"
            });
        }
    },

    // Fetch single blog by slug
    fetchBlogBySlug: async (slug: string) => {
        try {
            set({ loading: true, error: null });
            const { data } = await api.get(`/blog/${slug}`);
            set({ blog: data.blog, loading: false });
        } catch (err: any) {
            console.error("Error fetching blog:", err);
            set({
                loading: false,
                error: err.message || "Failed to fetch blog"
            });
        }
    },

    // Clear single blog (useful when navigating away)
    clearBlog: () => set({ blog: null }),

    // Clear error
    clearError: () => set({ error: null }),
}));