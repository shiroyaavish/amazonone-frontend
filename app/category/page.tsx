import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import ProductFilter from "@/components/ProductFilter";

export const dynamic = "force-dynamic";

export default async function CategoryProductsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Suspense
                fallback={
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
                    </div>
                }
            >
                <ProductFilter />
            </Suspense>
        </div>
    );
}
