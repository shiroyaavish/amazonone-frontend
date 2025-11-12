import React from "react";
import Section from "./Section";
import { useRouter } from "next/router";

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

interface Category {
  _id: string;
  name: string;
  products: Product[];
}

export default function CategorySection({ categories = [] }: { categories?: Category[] }) {

  return (
    <section className="mt-12">
      {categories.map((cat) => (
        <div key={cat._id} className="mb-10">
          <Section title={cat.name} products={cat.products.slice(0, 5)} id={cat._id} />
        </div>
      ))}
    </section>
  );
}
