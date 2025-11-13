"use client";

import { useEffect, useState } from "react";
import { Search, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const wishlist = useWishlistStore((s) => s.wishlist);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize search query from URL params
  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setIsScrolled(current > 20);
      setIsVisible(current < lastScrollY || current < 100);
      setLastScrollY(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleInputFocus = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/product?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transform transition-all duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
          } ${isScrolled ? "bg-white/80 backdrop-blur-xl shadow-md" : "bg-white"}`}
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
                  onChangeCapture={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputFocus}
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