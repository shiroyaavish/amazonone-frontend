import ProductDetailPage from "@/components/ProductDetailPage";
import ProductFilter from "@/components/ProductFilter";
import { apiHelpers } from "@/lib/axios";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Popular products",
        description: "Find all popular products",
        openGraph: {
            type: "website",
            title: "Popular products",
            description: "Find all popular products",
            //   images: product.images?.map((img: string) => ({ url: img })),
            siteName: "Deal Mitra",
            url: "/popular",
            // product: {
            //   brand: product.brand,
            //   retailer_item_id: product.metaTitle,
            // }
        }

    };
}
export default async function PopularPage() {
    return <ProductFilter />;
}
