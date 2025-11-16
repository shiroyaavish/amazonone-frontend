import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode, Suspense } from "react";

export const metadata = {
  title: "Deal Mitra - Best Affiliate Product Deals",
  description: "Shop affiliate products at the best prices.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
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
