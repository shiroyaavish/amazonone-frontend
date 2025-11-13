import React from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";

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
}

interface SectionProps {
  title: string;
  products?: Product[];
  id?: string | any
}

export default function Section({ title, products = [], id = null }: SectionProps) {
  if (!products?.length) return null;

  const handleViewBestSellers = () => {
    return `/product?bestSeller=true`
  };
  const handleViewNewReleases = () => {
    return `/product?newRelease=true`;
  };

  const handleViewPopular = () => {
    return `/product?isPopular=true`
  };

  const handleViewCategory = (categoryId: string) => {
    return `/product?category=${categoryId}`
  };
  const handleView = () => {
    if (id === "best_seller") {
      return handleViewBestSellers();
    } else if (id === "new_release") {
      return handleViewNewReleases();
    } else if (id === "popular_products") {
      return handleViewPopular();
    } else {
      return handleViewCategory(id!);
    }
  };
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link href={handleView()}>
          <p className="text-green-600 text-sm hover:underline">
            View More →
          </p>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </section>
  );
}
