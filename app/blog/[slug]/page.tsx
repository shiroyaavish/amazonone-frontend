import { Metadata } from "next";
import BlogDetailsPage from "@/components/BlogDetailsPage";
import { apiHelpers } from "@/lib/axios";

type Props = {
  params: Promise<{ slug: string }>
};
async function getBlog(slug: string) {
  try {
    // console.log("Fetching blog for slug:", slug);
    const data: any = await apiHelpers.get(`blog/${slug}`);
    // console.log("Blog data:", data);
    if (!data) return null;

    return data.blog || null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  const blog = await getBlog(slug);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription,
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      images: [blog.thumbnail],
    },
  };
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  return <BlogDetailsPage slug={slug} />;
}
