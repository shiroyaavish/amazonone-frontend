import BlogDetailsPage from "@/components/BlogDetailsPage";

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  // ✅ Unwrap the Promise
  const { slug } = await params;

  // ✅ Pass it down to your client component
  return <BlogDetailsPage slug={slug} />;
}
