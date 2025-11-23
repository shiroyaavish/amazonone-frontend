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
            metaTitle: `${data.data.name.toLocaleUpperCase()} | Get best deals ever.`,
            title: data.data.name,
            metaDescription: `Find all product of the ${data.data.name}`,
        };
    } catch (error) {
        console.error("Error fetching product for seo:", error);
        return null;
    }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = (await params).name;

    const product = await getCategory(slug.replaceAll("-", " "));

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
            // images: product.images?.map((img: string) => ({ url: img })),
            siteName: "Deal Mitra",
            url: `/category/${product.title}`,
            // product: {
            //   brand: product.brand,
            //   retailer_item_id: product.metaTitle,
            // }
        }

    };
}
export default async function ProductPage({ params }: Props) {
    return <ProductFilter />;
}
