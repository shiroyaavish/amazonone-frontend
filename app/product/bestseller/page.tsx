import ProductDetailPage from "@/components/ProductDetailPage";
import ProductFilter from "@/components/ProductFilter";
import { apiHelpers } from "@/lib/axios";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Best seller products",
        description: "Find all Best seller products",
        openGraph: {
            type: "website",
            title: "Best seller products",
            description: "Find all best seller products",
            siteName: "Deal Mitra",
            url: "https://dealmitra.online/product/bestseller?bestSeller=true",
            images: [
                {
                    url: "https://dealmitra.online/logo.png",
                    width: 512,
                    height: 512
                }
            ]
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
