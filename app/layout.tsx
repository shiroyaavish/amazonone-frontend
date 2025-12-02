import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode, Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deal Mitra - Best Product, Best Deals",
  description: "Shop products at the best prices.",
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
  openGraph: {
    title: "Deal Mitra - Best Product, Best Deals",
    description: "Shop products at the best prices.",
    url: "https://dealmitra.online",
    siteName: "Deal Mitra",
    images: [
      {
        url: "https://dealmitra.online/logo.png",
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16614757025"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-16614757025');
        </script>

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8569782505338512"
          crossOrigin="anonymous"></script>
        <meta name="google-adsense-account" content="ca-pub-8569782505338512"></meta>
        <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
        <meta name="google-site-verification" content="7KKI_7V1_ER8U4BCRYDtWTzR542aWACXMSueVhn5e5k" />
        {/* Google Logo Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Deal Mitra",
              url: "https://dealmitra.online",
              logo: "https://dealmitra.online/logo.png",
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
      </body>
    </html>
  );
}
