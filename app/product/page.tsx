import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import ProductFilter from "@/components/ProductFilter";
import Head from "next/head";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <meta name="google-site-verification" content="7KKI_7V1_ER8U4BCRYDtWTzR542aWACXMSueVhn5e5k" />
      </Head>
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
