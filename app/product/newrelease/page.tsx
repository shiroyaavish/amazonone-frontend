import ProductFilter from "@/components/ProductFilter";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
    const ogImage = `https://dealmitra.online/api/og?title=${encodeURIComponent(
        "New Release Products"
    )}&subtitle=${encodeURIComponent("Latest Launches · DealMitra")}`;

    return {
        title: "New Release Products - Latest Launches & Best Prices | DealMitra",
        description:
            "Discover newly launched products with the latest prices and deals. Compare features, reviews, and best offers on fresh arrivals across all categories.",
        keywords: [
            "new release products",
            "latest products",
            "new launch deals",
            "trending new products",
            "price comparison",
            "best prices",
            "new arrivals shopping",
            "latest gadgets",
            "online shopping",
            "new product releases"
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
            url: "https://dealmitra.online/product/newrelease?newRelease=true",
            siteName: "DealMitra",
            title: "New Release Products - Latest Launches & Best Prices | DealMitra",
            description:
                "Check out newly launched products with deals & price comparison to help you shop smarter.",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: "New Release Products - DealMitra"
                }
            ]
        },

        twitter: {
            card: "summary_large_image",
            site: "@dealmitra",
            creator: "@dealmitra",
            title: "New Release Products - Latest Launches & Best Prices | DealMitra",
            description:
                "Discover new launches & compare prices instantly to save more.",
            images: [ogImage]
        },

        alternates: {
            canonical: "https://dealmitra.online/product/newrelease",
            languages: {
                "en-US": "https://dealmitra.online/product/newrelease"
            }
        },

        category: "E-commerce",

        verification: {
            google: "7KKI_7V1_ER8U4BCRYDtWTzR542aWACXMSueVhn5e5k",
        }
    };
}


export default async function NewReleasePage() {
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
