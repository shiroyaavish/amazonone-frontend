"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import CategorySection from "@/components/CategorySection";

export default function Home() {
  const [popular, setPopular] = useState<any[]>([]);
  const [newRelease, setNewRelease] = useState<any[]>([]);
  const [bestSeller, setBestSeller] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popularRes, newRes, bestRes, catRes] = await Promise.all([
          fetch(`${baseUrl}/product?page=1&limit=10&isPopular=true`),
          fetch(`${baseUrl}/product?page=1&limit=10&newRelease=true`),
          fetch(`${baseUrl}/product?page=1&limit=10&bestSeller=true`),
          fetch(`${baseUrl}/category/products`),
        ]);

        const popularData = await popularRes.json();
        const newData = await newRes.json();
        const bestData = await bestRes.json();
        const catData = await catRes.json();

        setPopular(popularData.data || []);
        setNewRelease(newData.data || []);
        setBestSeller(bestData.data || []);
        setCategories(catData.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Hero />
      <Section title="Popular Products" products={popular} />
      <Section title="New Releases" products={newRelease} />
      <Section title="Best Sellers" products={bestSeller} />
      <CategorySection categories={categories} />
    </>
  );
}
