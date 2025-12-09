import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCompareButton from "@/components/FloatingCompareButton";
import { ReactNode, Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deal Mitra - AI-Powered Product Comparison Tool",
  description: "Compare products intelligently with our AI-powered comparison tool. Make smarter buying decisions by comparing features, prices, and reviews across multiple products instantly.",
  icons: {
    icon: "https://dealmitra.online/favicon.ico",
    shortcut: "https://dealmitra.online/favicon.png",
    apple: [
      { url: "https://dealmitra.online/apple-touch-icon-60x60.png", sizes: "60x60" },
      { url: "https://dealmitra.online/apple-touch-icon-76x76.png", sizes: "76x76" },
      { url: "https://dealmitra.online/apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "https://dealmitra.online/apple-touch-icon-152x152.png", sizes: "152x152" },
      { url: "https://dealmitra.online/apple-touch-icon-180x180.png", sizes: "180x180" }
    ],
  },
  keywords: [
    "product comparison tool",
    "AI product compare",
    "compare products online",
    "product comparison AI",
    "smart shopping tool",
    "compare prices and features",
    "product analyzer",
    "buying decision tool"
  ],
  openGraph: {
    title: "Deal Mitra - AI-Powered Product Comparison Tool",
    description: "Compare products intelligently with AI. Make smarter buying decisions by comparing features, prices, and reviews instantly.",
    url: "https://dealmitra.online",
    siteName: "Deal Mitra",
    images: [
      {
        url: "https://dealmitra.online/logo.png",
        width: 512,
        height: 512,
        alt: "Deal Mitra - AI Product Comparison Tool"
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deal Mitra - AI-Powered Product Comparison Tool",
    description: "Compare products intelligently with AI. Make smarter buying decisions instantly.",
    images: ["https://dealmitra.online/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-4DP9DF5MG8"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4DP9DF5MG8');
            `,
          }}
        />

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8569782505338512"
          crossOrigin="anonymous"></script>
        <meta name="google-adsense-account" content="ca-pub-8569782505338512"></meta>
        <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
        <meta name="google-site-verification" content="7KKI_7V1_ER8U4BCRYDtWTzR542aWACXMSueVhn5e5k" />

        {/* Enhanced Schema for Product Comparison Tool */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Deal Mitra - AI Product Comparison Tool",
              url: "https://dealmitra.online",
              logo: "https://dealmitra.online/logo.png",
              description: "AI-powered product comparison tool to help consumers make informed buying decisions",
              applicationCategory: "Shopping",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
              },
              featureList: [
                "AI-powered product comparison",
                "Multi-product analysis",
                "Price comparison",
                "Feature comparison",
                "Smart recommendations"
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "1250"
              }
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Deal Mitra",
              url: "https://dealmitra.online",
              logo: "https://dealmitra.online/logo.png",
              description: "AI-powered product comparison platform",
              sameAs: []
            }),
          }}
        />
      </head>

      <body className="bg-gray-50 min-h-screen">
        <Suspense fallback={<p>Loading...</p>}>
          <Navbar />
        </Suspense>
        <main className="mx-auto px-2">{children}</main>
        <Footer />

        {/* Floating Compare Button */}
        <FloatingCompareButton />
      </body>
    </html>
  );
}