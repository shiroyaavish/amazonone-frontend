import { Metadata } from "next";
import BlogDetailsPage from "@/components/BlogDetailsPage";
import { apiHelpers } from "@/lib/axios";

type Props = {
  params: Promise<{ slug: string }>
};
async function getBlog(slug: string) {
  try {
    const data: any = await apiHelpers.get(`blog/${slug}`);
    return data?.blog || null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const blog = await getBlog(slug);

  if (!blog) {
    return { title: "Blog Not Found | DealMitra" };
  }

  const blogUrl = `https://dealmitra.online/blog/${slug}`;
  const ogImage = `https://dealmitra.online/api/og?title=${encodeURIComponent(
    blog.title
  )}&subtitle=${encodeURIComponent("DealMitra Blog")}`;

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription,
    keywords: blog.keywords || blog.title.split(" "),
    authors: [{ name: blog.author || "DealMitra" }],
    publisher: "DealMitra",

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    openGraph: {
      type: "article",
      locale: "en_US",
      siteName: "DealMitra",
      url: blogUrl,
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription,
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: [blog.author || "DealMitra"],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@dealmitra",
      creator: "@dealmitra",
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription,
      images: [ogImage],
    },

    alternates: {
      canonical: blogUrl,
      languages: {
        "en-US": blogUrl,
      },
    },

    category: blog.category,
  };
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  return <BlogDetailsPage slug={slug} />;
}
