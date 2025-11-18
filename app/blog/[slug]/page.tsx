"use client";

import { useEffect } from "react";
import { useBlogStore } from "@/store/useBlogStore";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import Head from "next/head";

export default function BlogPage() {
    const params = useParams();
    const slug = params.slug as string; // get slug safely

    const { blog, fetchBlogBySlug, loading } = useBlogStore();

    useEffect(() => {
        if (slug) {
            fetchBlogBySlug(slug);
        }
    }, [slug]);

    if (loading || !blog) return <Loader2 />;

    return (
        <main className="max-w-4xl mx-auto px-4 py-10">
            <Head>
                <title>{blog.title} | Deal Mitra Blogs</title>
                <meta name="description" content={blog.description} />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={blog.description} />
                <meta property="og:image" content={blog.thumbnail} />
            </Head>
            <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>

            <p className="text-gray-600 mt-2">{blog.description}</p>

            <div className="mt-6">
                <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    width={1200}
                    height={500}
                    className="rounded-lg w-full object-cover shadow-sm"
                />
            </div>

            <div className="flex items-center gap-3 mt-4 text-gray-500 text-sm">
                <span>✍️ {blog.author}</span>
                <span>•</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="flex gap-2 flex-wrap mt-4">
                {blog.tags?.map((tag, i) => (
                    <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            <article
                className="mt-10 blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content.replace(/&lt;/g, "<").replace(/&gt;/g, ">") }}
            />

        </main>
    );
}
