import ProductDetailPage from "@/components/ProductDetailPage";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // ✅ Unwrap the Promise
  const { slug } = await params;

  // ✅ Pass it down to your client component
  return <ProductDetailPage slug={slug} />;
}
