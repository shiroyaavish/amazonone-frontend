import ProductDetailPage from "@/components/ProductDetailPage";
import ProductFilter from "@/components/ProductFilter";
import { apiHelpers } from "@/lib/axios";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
    const ogImage = `https://dealmitra.online/api/og?title=${encodeURIComponent(
        "Best Seller Products"
    )}&subtitle=${encodeURIComponent("Trending Products · DealMitra")}`;

    return {
        title: "Best Seller Products - Top Deals & Price Comparison | DealMitra",
        description: "Explore best-selling products across categories with the best prices online. Compare deals, discounts, and reviews to save money on electronics, fashion, appliances and more.",
        keywords: [
            "best seller products",
            "top selling products",
            "best deals online",
            "price comparison",
            "discount shopping",
            "best prices",
            "deal finder",
            "shopping comparison",
            "top rated products",
            "popular deals"
        ],
        authors: [{ name: "DealMitra" }],
        creator: "DealMitra",
        publisher: "DealMitra",

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1
            }
        },

        openGraph: {
            type: "website",
            locale: "en_US",
            url: "https://dealmitra.online/product/bestseller?bestSeller=true",
            siteName: "DealMitra",
            title: "Best Seller Products - Top Deals & Price Comparison | DealMitra",
            description: "Explore the best-selling products with top deals & price comparison to help you save more online shopping.",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: "Best Seller Products - DealMitra"
                }
            ]
        },

        twitter: {
            card: "summary_large_image",
            site: "@dealmitra",
            creator: "@dealmitra",
            title: "Best Seller Products - Top Deals & Price Comparison | DealMitra",
            description: "Find best-selling products with the most attractive deals and price comparisons.",
            images: [ogImage]
        },

        alternates: {
            canonical: "https://dealmitra.online/product/bestseller",
            languages: {
                "en-US": "https://dealmitra.online/product/bestseller"
            }
        },

        category: "E-commerce",

        verification: {
            google: "7KKI_7V1_ER8U4BCRYDtWTzR542aWACXMSueVhn5e5k"
        }
    };
}


export default async function BestSellerPage() {
    return (<div className="min-h-screen bg-gray-50">
        <Suspense
            fallback={
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
                </div>
            }
        >
            <ProductFilter />
        </Suspense>
    </div>)
}
