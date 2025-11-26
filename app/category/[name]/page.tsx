import ProductDetailPage from "@/components/ProductDetailPage";
import ProductFilter from "@/components/ProductFilter";
import { apiHelpers } from "@/lib/axios";
import { Metadata } from "next";

type Props = {
    params: Promise<{ name: string }>
};
async function getCategory(name: string) {
    try {
        const data: any = await apiHelpers.get(`category/name/${name}`);
        if (!data) return null;

        return {
            metaTitle: `${data.data.name.toUpperCase()} | Best Deals, Price Comparison & Offers`,
            title: data.data.name,
            metaDescription: `Find all products under the ${data.data.name} category. Compare prices across multiple online stores and save money.`,
            images: data.data.images ?? [], // if you store image list in DB
        };
    } catch (error) {
        console.error("Error fetching product for SEO:", error);
        return null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).name;
  const categoryName = slug.replaceAll("-", " ");
  const product = await getCategory(categoryName);

  if (!product) {
    return { title: "Category Not Found | DealMitra" };
  }

  const categoryUrl = `https://dealmitra.online/category/${slug}`;

  // 🔥 Dynamic OG-image for category
  const ogImage = `https://dealmitra.online/api/og?title=${encodeURIComponent(
    product.title
  )}&subtitle=${encodeURIComponent("DealMitra Category")}`;

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    keywords: [
      `${product.title} products`,
      `${product.title} category`,
      "best price",
      "discount deals",
      "online shopping",
      "price comparison",
      "DealMitra",
    ],
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
      type: "website",
      siteName: "DealMitra",
      title: product.metaTitle,
      description: product.metaDescription,
      locale: "en_US",
      url: categoryUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@dealmitra",
      creator: "@dealmitra",
      title: product.metaTitle,
      description: product.metaDescription,
      images: [ogImage],
    },

    alternates: {
      canonical: categoryUrl,
      languages: {
        "en-US": categoryUrl,
      },
    },

    category: product.title,
    authors: [{ name: "DealMitra" }],
    publisher: "DealMitra",
  };
}


export default async function ProductPage({ params }: Props) {
    return <ProductFilter />;
}
