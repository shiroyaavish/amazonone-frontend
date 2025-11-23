import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode, Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deal Mitra - Best Product, Best Deals",
  description: "Shop products at the best prices.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: [
      { url: "/apple-touch-icon-60x60.png", sizes: "60x60" },
      { url: "/apple-touch-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-touch-icon-180x180.png", sizes: "180x180" }
    ],
  },
  openGraph: {
    title: "Deal Mitra - Best Product, Best Deals",
    description: "Shop products at the best prices.",
    url: "https://dealmirta.online",
    siteName: "Deal Mitra",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
      },
    ],
    type: "website",
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

        {/* Google Logo Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Deal Mitra",
              url: "https://dealmirta.online",
              logo: "https://dealmirta.online/logo.png",
            }),
          }}
        />
      </head>

      <body className="bg-gray-50 min-h-screen">
        <Suspense fallback={<p>Loading...</p>}>
          <Navbar />
        </Suspense>
        <main className="max-w-7xl mx-auto px-2">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
