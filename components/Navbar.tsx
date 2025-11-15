"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useProductStore } from "@/store/useProductStore";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    isPopular,
    bestSeller,
    newRelease,
    minPrice,
    maxPrice,
    sort,
    category,
    search,
    setFilter,
    fetchProducts
  } = useProductStore()

  const lastScrollY = useRef(0);
  const wishlist = useWishlistStore((s) => s.wishlist);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  // Load search term from URL
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  // Scroll Hide Nav Logic (Optimized)
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      setIsScrolled(current > 20);
      setIsVisible(current < lastScrollY.current || current < 100);

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());

      if (searchQuery.trim()) {
        params.set("search", searchQuery.trim());
      } else {
        params.delete("search");
      }
      if (pathname !== "/product") {
        router.push(`/product?${params.toString()}`);
      } else {
        setFilter("search", searchQuery.trim());
        if (isPopular) params.set("isPopular", "true");
        if (bestSeller) params.set("bestSeller", "true");
        if (newRelease) params.set("newRelease", "true");
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        if (category.length)
          params.set("category", category.join(","));
        const query = params.toString();
        window.history.replaceState(
          null,
          "",
          query ? `/product?${query}` : `/product`
        );

        fetchProducts(baseUrl, 1);
      }
    }
  };


  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transform transition-all duration-300 
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
        ${isScrolled ? "bg-white/80 backdrop-blur-xl shadow-md" : "bg-white"}
        `}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between gap-2 h-16 md:h-20">

            <Link href="/" className="text-2xl font-bold text-green-600">
              amazone<span className="text-black">one.</span>
            </Link>

            <div className="flex-1 flex justify-center">
              <form className="relative w-full max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-3 py-3 bg-gray-50 rounded-2xl outline-none text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-green-100"
                />
              </form>
            </div>

            <Link href="/wishlist" className="relative">
              <Heart className="w-6 h-6 text-gray-600 hover:text-green-600 transition" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

          </div>
        </div>
      </header>

      <div className="h-16 md:h-20"></div>
    </>
  );
}