import ProductFilter from "@/components/ProductFilter";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
    const ogImage = `https://dealmitra.online/api/og?title=${encodeURIComponent(
        "Popular Products"
    )}&subtitle=${encodeURIComponent("Trending Products · DealMitra")}`;

    return {
        title: "Popular Products - Best Deals & Price Comparison | DealMitra",
        description:
            "Discover trending and popular products with the best prices. Compare deals across multiple retailers and save money on electronics, fashion, home appliances, and more at DealMitra.",
        keywords: [
            "popular products",
            "trending products",
            "best deals",
            "price comparison",
            "online shopping",
            "discount products",
            "best prices",
            "deal finder",
            "shopping comparison",
            "top rated products"
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
            url: "https://dealmitra.online/product/popular?isPopular=true",
            siteName: "DealMitra",
            title: "Popular Products - Best Deals & Price Comparison | DealMitra",
            description:
                "Discover trending and popular products with the best prices. Compare deals across multiple retailers and save money on your favorite products.",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: "Popular Products - DealMitra"
                }
            ]
        },

        twitter: {
            card: "summary_large_image",
            site: "@dealmitra",
            creator: "@dealmitra",
            title: "Popular Products - Best Deals & Price Comparison | DealMitra",
            description:
                "Discover trending and popular products with the best prices. Compare deals and save money.",
            images: [ogImage]
        },

        alternates: {
            canonical: "https://dealmitra.online/product/popular",
            languages: {
                "en-US": "https://dealmitra.online/product/popular"
            }
        },

        category: "E-commerce",

        verification: {
            google: "7KKI_7V1_ER8U4BCRYDtWTzR542aWACXMSueVhn5e5k"
        }
    };
}


export default async function PopularPage() {
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
