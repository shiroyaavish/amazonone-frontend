import React from "react";
import ProductCard from "./ProductCard";

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
}

export default function Section({ title, products = [] }: SectionProps) {
  if (!products?.length) return null;

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">{title}</h2>
        <a href="#" className="text-green-600 text-sm hover:underline">
          View More →
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </section>
  );
}
