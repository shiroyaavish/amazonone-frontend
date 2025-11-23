import ProductFilter from "@/components/ProductFilter";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "New release products",
        description: "Find all New release products",
        openGraph: {
            type: "website",
            title: "New release products",
            description: "Find all new release products",
            //   images: product.images?.map((img: string) => ({ url: img })),
            siteName: "Deal Mitra",
            url: "/newrelease",
            // product: {
            //   brand: product.brand,
            //   retailer_item_id: product.metaTitle,
            // }
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
