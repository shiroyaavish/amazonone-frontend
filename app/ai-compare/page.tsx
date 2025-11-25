import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import ProductComparisonPage from "@/components/ProductComparisonPage";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {

  return {
    title: "AI Product Comparison | Deal Mitra",
    description:
      "Compare any products instantly using AI on Deal Mitra. Get smart insights, feature breakdowns, pros & cons, and recommendations powered by advanced AI.",

    alternates: {
      canonical: "https://dealmitra.online/ai-compare",
    },

    openGraph: {
      type: "website",
      url: "https://dealmitra.online/ai-compare",
      title: "AI Product Comparison | Deal Mitra",
      description:
        "Use AI to compare products instantly. Get meaningful insights, feature-wise comparisons, pros, cons, and personalized product recommendations.",
      siteName: "Deal Mitra",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: "AI Product Comparison - Deal Mitra",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "AI Product Comparison | Deal Mitra",
      description:
        "Compare products instantly using AI. Get smart insights, pros & cons, and more on Deal Mitra.",
      images: ["/logo.png"],
    },
  };
}
export default async function AiComparisonPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
          </div>
        }
      >
        <ProductComparisonPage />
      </Suspense>
    </div>
  );
}
