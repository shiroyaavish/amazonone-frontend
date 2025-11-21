"use client";

import { useEffect } from "react";
import { useBlogStore } from "@/store/useBlogStore";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import Head from "next/head";
import ProductCard from "./ProductCard";

export default function BlogDetailsPage({ slug }: { slug: string }) {

    const { blog, fetchBlogBySlug, loading, error } = useBlogStore();

    useEffect(() => {
        if (slug) fetchBlogBySlug(slug);
    }, [slug]);

    if (loading || !blog)
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin w-8 h-8 text-gray-600" />
            </div>
        );
    if (error || !blog) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">Blog Not Found</h2>
                <p className="text-gray-600 mt-2">The blog you are looking for does not exist or has been removed.</p>
            </div>
        );
    }

    return (
        <main className="max-w-5xl mx-auto px-4 py-10">
            {/* SEO Meta */}
            {/* <Head>
                <title>{blog.metaTitle || blog.title}</title>
                <meta name="description" content={blog.metaDescription || blog.description} />
                <meta name="keywords" content={blog.keywords?.join(", ")} />
                <meta property="og:title" content={blog.metaTitle} />
                <meta property="og:description" content={blog.metaDescription} />
                <meta property="og:image" content={blog.thumbnail} />
            </Head> */}

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 leading-snug">
                {blog.title}
            </h1>

            {/* Description */}
            <p className="text-gray-600 mt-3 text-lg">
                {blog.description}
            </p>

            {/* Thumbnail */}
            <div className="mt-6 rounded-xl overflow-hidden shadow-md">
                <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    width={1200}
                    height={600}
                    className="object-cover w-full"
                />
            </div>

            {/* Author + Date */}
            <div className="flex items-center gap-4 mt-4 text-gray-500 text-sm">
                <span className="font-medium">✍️ {blog.author}</span>
                <span>•</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mt-5">
                {blog.tags?.map((tag, i) => (
                    <span
                        key={i}
                        className="px-3 py-1 text-xs bg-gray-100 border rounded-full text-gray-700"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Product Section */}
            {blog.productIds?.length > 0 && (
                <section className="mt-16">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                        Recommended Products
                    </h2>

                    <div className="grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-6">
                        {blog.productIds.map((p: any, i: number) => (
                            <ProductCard product={p} />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
