"use client";

import { useEffect } from "react";
import { useBlogStore } from "@/store/useBlogStore";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { Loader2 } from "lucide-react";

export default function BlogsPage() {
    const { blogs, fetchAllBlogs, loading } = useBlogStore();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

    useEffect(() => {
        fetchAllBlogs(baseUrl);
    }, []);

    return (
        <>
            <Head>
                <title>All Blogs | DealMitra</title>
                <meta
                    name="description"
                    content="Read the latest blogs on smartphones, gadgets, tech guides, buying guides, reviews, and more."
                />
            </Head>

            <main className="max-w-6xl mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold text-gray-900">Latest Blogs</h1>
                <p className="text-gray-600 mt-2 text-lg">
                    Explore our latest tech articles, smartphone guides, reviews & more.
                </p>

                {/* Loading Spinner */}
                {loading && (
                    <div className="flex justify-center items-center py-16">
                        <Loader2 className="animate-spin w-8 h-8 text-gray-600" />
                    </div>
                )}

                {/* Blog Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {!loading &&
                        blogs.length > 0 &&
                        blogs.map((blog) => (
                            <Link
                                href={`/blog/${blog.slug}`}
                                key={blog._id}
                                className="group border rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition"
                            >
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={blog.thumbnail}
                                        alt={blog.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition"
                                    />
                                </div>

                                <div className="p-4">
                                    <h2 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition">
                                        {blog.title}
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                                        {blog.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1 mt-3">
                                        {blog.tags?.slice(0, 2).map((tag, i) => (
                                            <span
                                                key={i}
                                                className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="text-xs text-gray-400 mt-3">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>

                {!loading && blogs.length === 0 && (
                    <p className="text-gray-600 text-center mt-20">
                        No blogs found.
                    </p>
                )}
            </main>
        </>
    );
}
