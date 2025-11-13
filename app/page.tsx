"use client";

import { useEffect } from "react";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import CategorySection from "@/components/CategorySection";
import { useHomeStore } from "@/store/useHomeStore";

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  const {
    popular,
    newRelease,
    bestSeller,
    categoryWithProducts: categories,
    loading,
    fetchHomeData,
  } = useHomeStore();

  useEffect(() => {
    if (
      popular.length === 0 &&
      newRelease.length === 0 &&
      bestSeller.length === 0 &&
      categories.length === 0
    ) {
      fetchHomeData(baseUrl);
    }
  }, [baseUrl, fetchHomeData, popular.length, newRelease.length, bestSeller.length, categories.length]);
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );

  return (
    <>
      <Hero />
      <Section title="Popular Products" products={popular.slice(0,6)} id="popular_products" />
      <Section title="New Releases" products={newRelease.slice(0,6)} id="new_release" />
      <Section title="Best Sellers" products={bestSeller.slice(0,6)} id="best_seller" />
      <CategorySection categories={categories} />
    </>
  );
}
