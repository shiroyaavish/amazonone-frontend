import ProductDetailPage from "@/components/ProductDetailPage";
import { apiHelpers } from "@/lib/axios";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>
};
async function getProduct(slug: string) {
  try {
    // console.log("Fetching blog for slug:", slug);
    const data: any = await apiHelpers.get(`product/${slug}`);
    // console.log("Blog data:", data);
    if (!data) return null;

    return {
      metaTitle: data.data.title,
      title: data.data.title,
      metaDescription: data.data.features?.join(","),
      // keywords: data.data.features,
      images: data.data.imageUrls,
      brand: data.data.brand,
      affiliateUrl: data.data.affiliateUrl,
      type: data.data.category.name
    };
  } catch (error) {
    console.error("Error fetching product for seo:", error);
    return null;
  }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  const product = await getProduct(slug);

  if (!product) {
    return { title: "product Not Found" };
  }

  return {
    title: product.metaTitle || product.title,
    description: product.metaDescription,
    openGraph: {
      type: "website",
      title: product.metaTitle,
      description: product.metaDescription,
      images: product.images?.map((img: string) => ({ url: img })),
      siteName: "Deal Mitra",
      url: product.affiliateUrl,
      // product: {
      //   brand: product.brand,
      //   retailer_item_id: product.metaTitle,
      // }
    }

  };
}
export default async function ProductPage({ params }: Props) {
  // ✅ Unwrap the Promise
  const { slug } = await params;
  // await getProduct(slug)

  // ✅ Pass it down to your client component
  return <ProductDetailPage slug={slug} />;
}
