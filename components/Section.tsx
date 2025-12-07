import React from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import AdBanner from "./AdBanner";

interface Product {
  _id: string;
  slug: string;
  title: string;
  brand: string;
  imageUrls: string[];
  price: {
    current: number;
    original: number;
  };
  availability: boolean;
}

interface SectionProps {
  title: string;
  products?: Product[];
  id?: string | any
}

export default function Section({ title, products = [], id = null }: SectionProps) {
  if (!products?.length) return null;

  const handleViewBestSellers = () => {
    return `/product/bestseller?bestSeller=true`
  };
  const handleViewNewReleases = () => {
    return `/product/newrelease?newRelease=true`;
  };

  const handleViewPopular = () => {
    return `/product/popular?isPopular=true`
  };

  const handleViewCategory = (name: string, categoryId: string) => {
    return `/category/${name.replaceAll(" ", "-")}?category=${categoryId}`
  };
  const handleView = () => {
    if (id === "best_seller") {
      return handleViewBestSellers();
    } else if (id === "new_release") {
      return handleViewNewReleases();
    } else if (id === "popular_products") {
      return handleViewPopular();
    } else {
      return handleViewCategory(title, id);
    }
  };
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">{title[0].toUpperCase()}{title.slice(1)}</h2>
        <Link href={handleView()}>
          <p className="text-green-600 text-sm hover:underline">
            View More →
          </p>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((p, i) => (
          <>
            <ProductCard key={p._id} product={p} />
          </>
        ))}
      </div>
    </section>
  );
}
