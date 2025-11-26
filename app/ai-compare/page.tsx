import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import ProductComparisonPage from "@/components/ProductComparisonPage";
import { Metadata } from "next";
import Head from "next/head";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Free AI Product Comparison Tool - Deal Mitra",
    description:
      "Compare any products instantly using AI on Deal Mitra. Get smart insights, feature breakdowns, pros & cons, and recommendations powered by advanced AI.",

    alternates: {
      canonical: "https://dealmitra.online/ai-compare",
    },

    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },

    keywords: [
      "ai product comparison",
      "product comparison ai tool",
      "amazon product comparison ai",
      "compare products with ai",
      "dealmitra ai product comparison",
      "best ai for product comparison",
      "ai tool for product research",
      "ecommerce ai tools",
    ],

    openGraph: {
      type: "website",
      url: "https://dealmitra.online/ai-compare",
      title: "AI Product Comparison | Deal Mitra",
      description:
        "Use AI to compare products instantly. Get meaningful insights, feature-wise comparisons, pros, cons, and personalized product recommendations.",
      siteName: "Deal Mitra",
      images: [
        {
          url: "https://dealmitra.online/ai-compare-banner.png", // Preferred
          width: 1200,
          height: 630,
          alt: "Free AI Product Comparison Tool - Deal Mitra",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "AI Product Comparison | Deal Mitra",
      description:
        "Compare products instantly using AI. Get smart insights, pros & cons, and more on Deal Mitra.",
      images: ["https://dealmitra.online/ai-compare-banner.png"],
    },
  };
}

export default async function AiComparisonPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "AI Product Comparison Tool",
              url: "https://dealmitra.online/ai-compare",
              applicationCategory: "ProductivityApplication",
              operatingSystem: "All",
              description:
                "Compare any products instantly using AI. Get smart insights, pros, cons & recommendations powered by AI.",
              creator: {
                "@type": "Organization",
                name: "Deal Mitra",
                url: "https://dealmitra.online",
              },
            }),
          }}
        />
      </Head>
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
