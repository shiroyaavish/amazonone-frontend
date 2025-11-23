import ProductDetailPage from "@/components/ProductDetailPage";
import ProductFilter from "@/components/ProductFilter";
import { apiHelpers } from "@/lib/axios";
import { Metadata } from "next";

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
    return <ProductFilter />;
}
