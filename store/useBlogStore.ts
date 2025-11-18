import { create } from "zustand";

export interface Blog {
    _id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
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

    fetchAllBlogs: () => Promise<void>;
    fetchBlogBySlug: (slug: string) => Promise<void>;
}

export const useBlogStore = create<BlogStore>((set) => ({
    blogs: [],
    blog: null,
    loading: false,

    // Fetch all blogs
    fetchAllBlogs: async () => {
        try {
            set({ loading: true });
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
            if (!res.ok) {
                throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            // If API returns the array directly use data, otherwise use data.blogs
            const blogs = Array.isArray(data) ? (data as Blog[]) : (data.blogs as Blog[]);
            set({ blogs, loading: false });
        } catch (err) {
            console.log("Error fetching blogs:", err);
            set({ loading: false });
        }
    },

    // Fetch single blog by slug
    fetchBlogBySlug: async (slug: string) => {
        try {
            set({ loading: true });
            const res = await fetch(
                `https://nvkmbm4f-4040.inc1.devtunnels.ms/api/blog/${slug}`
            );
            
            if (!res.ok) {
                throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            console.log(data);
            set({ blog: data.blog, loading: false });
        } catch (err) {
            console.log("Error fetching blog:", err);
            set({ loading: false });
        }
    },
}));
