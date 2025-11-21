"use client";

import { useEffect } from "react";
import { useBlogStore } from "@/store/useBlogStore";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import Head from "next/head";

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

                    <div className="grid md:grid-cols-2 gap-6">
                        {blog.productIds.map((p: any, i: number) => (
                            <div
                                key={i}
                                className="border rounded-xl shadow-sm p-4 hover:shadow-md transition bg-white"
                            >
                                <Image
                                    src={p.imageUrls[0]}
                                    alt={p.title}
                                    width={500}
                                    height={500}
                                    className="rounded-lg object-contain h-56 w-full bg-gray-50"
                                />

                                <h3 className="text-lg font-semibold mt-4 line-clamp-2">
                                    {p.title}
                                </h3>

                                <div className="text-sm text-gray-500 mt-1">
                                    ⭐ {p.rating.average} ({p.rating.count})
                                </div>

                                <div className="mt-2">
                                    {p.price.current > 0 ? (
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xl font-bold text-green-600">
                                                ₹{p.price.current.toLocaleString()}
                                            </span>
                                            <span className="text-gray-400 line-through">
                                                ₹{p.price.original.toLocaleString()}
                                            </span>
                                            <span className="text-green-600 text-sm">
                                                ({p.price.discount}% off)
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-gray-600">Price Not Available</span>
                                    )}
                                </div>

                                <a
                                    href={p.affiliateUrl}
                                    target="_blank"
                                    className="mt-4 block text-center bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                                >
                                    View Product
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
