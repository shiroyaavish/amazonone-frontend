"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import ProductCard from "./ProductCard";

export default function SuggestionCarousel({ slug }: { slug: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });

  const { suggestions, getSuggestions, suggestionLoading } = useProductStore();

  useEffect(() => {
    if (slug) getSuggestions(slug);
  }, [slug]);

  // Auto-slider
  const startAutoScroll = useCallback(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 2500);
    return () => clearInterval(interval);
  }, [emblaApi]);

  useEffect(() => {
    const cleanup = startAutoScroll();
    return cleanup;
  }, [startAutoScroll]);

  if (suggestionLoading)
    return <p className="text-center py-8 text-gray-500">Loading suggestions...</p>;

  if (!suggestions?.length)
    return <p className="text-center py-8 text-gray-500">No suggestions found</p>;

  return (
    <div className="mt-12">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Recommended For You
      </h2>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {suggestions.map((product) => (
            <div
              key={product._id}
              className="min-w-[50%] sm:min-w-[35%] md:min-w-[25%] lg:min-w-[19%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
