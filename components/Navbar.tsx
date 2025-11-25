"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  Heart,
  Camera,
  GitCompareArrows,
  Layers3,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useHomeStore } from "@/store/useHomeStore";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // mobile states
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accOpenProducts, setAccOpenProducts] = useState(false);
  const [accOpenCategories, setAccOpenCategories] = useState(false);
  const [accOpenTools, setAccOpenTools] = useState(false);

  const { categories, fetchCategoriesData } = useHomeStore();
  const wishlist = useWishlistStore((s) => s.wishlist);

  const router = useRouter();
  const searchParams = useSearchParams();
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!categories.length) fetchCategoriesData();
  }, [categories.length, fetchCategoriesData]);

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY;
      setIsScrolled(cur > 20);
      setIsVisible(cur < lastScrollY.current || cur < 120);
      lastScrollY.current = cur;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery.trim()) params.set("search", searchQuery.trim());
      else params.delete("search");
      router.push(`/product?${params.toString()}`);
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setAccOpenProducts(false);
        setAccOpenCategories(false);
        setAccOpenTools(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // 🔥 CLOSE OTHER ACCORDIONS
  const toggleProducts = () => {
    setAccOpenProducts(!accOpenProducts);
    setAccOpenCategories(false);
    setAccOpenTools(false);
  };
  const toggleCategories = () => {
    setAccOpenCategories(!accOpenCategories);
    setAccOpenProducts(false);
    setAccOpenTools(false);
  };
  const toggleTools = () => {
    setAccOpenTools(!accOpenTools);
    setAccOpenProducts(false);
    setAccOpenCategories(false);
  };

  return (
    <>
      {/* NAVBAR WRAPPER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
          ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-white"}
        `}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6">

          {/* ROW 1 */}
          <div className="flex items-center justify-between gap-4 h-16 md:h-20">

            {/* LOGO */}
            <Link
              href="/"
              className="font-[Poppins] font-extrabold text-black tracking-[0.14em] text-lg md:text-xl whitespace-nowrap"
            >
              DEALMITRA
            </Link>

            {/* MOBILE CONTROLS */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={() => setMobileOpen((s) => !s)}
                className="p-2 rounded-md hover:bg-gray-100 transition"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link href="/wishlist" className="relative p-2 rounded-md hover:bg-gray-100 transition">
                <Heart className="w-5 h-5 text-gray-700" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex justify-center items-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </div>

            {/* DESKTOP NAV + SEARCH */}
            <div className="hidden md:flex items-center gap-4 flex-1">

              {/* SEARCH */}
              <div className="relative flex-1 min-w-64 max-w-2xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKey}
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-3 py-2.5 bg-gray-50 rounded-xl outline-none text-gray-700"
                />
              </div>

              {/* DESKTOP NAV LINKS */}
              <nav className="flex items-center gap-4 whitespace-nowrap">

                {/* AI Compare */}
                <Link href="/ai-compare" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50">
                  <GitCompareArrows className="w-4 h-4" /> <span className="text-sm">AI Compare</span>
                </Link>

                {/* PRODUCTS DROPDOWN */}
                <div className="relative">
                  <button
                    onClick={toggleProducts}
                    className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-50"
                  >
                    <span className="text-sm">Products</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${accOpenProducts ? "rotate-180" : ""}`}
                    />
                  </button>

                  {accOpenProducts && (
                    <div
                      className="absolute top-full left-0 mt-2 bg-white border shadow-lg rounded-lg p-3 w-48 z-50
                      animate-dropdown"
                    >
                      <Link href="/product/popular?isPopular=true" className="block py-2 hover:text-green-600">
                        Popular
                      </Link>
                      <Link href="/product/newrelease?newRelease=true" className="block py-2 hover:text-green-600">
                        New Releases
                      </Link>
                      <Link href="/product/bestseller?bestSeller=true" className="block py-2 hover:text-green-600">
                        Best Sellers
                      </Link>
                    </div>
                  )}
                </div>

                {/* CATEGORIES DROPDOWN */}
                <div className="relative">
                  <button
                    onClick={toggleCategories}
                    className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-50"
                  >
                    <span className="text-sm">Categories</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${accOpenCategories ? "rotate-180" : ""}`}
                    />
                  </button>

                  {accOpenCategories && (
                    <div
                      className="absolute top-full left-0 mt-2 bg-white border shadow-lg rounded-lg p-3 w-56 max-h-64 overflow-y-auto z-50 animate-dropdown"
                    >
                      {categories.map((c: any) => (
                        <Link
                          key={c._id}
                          href={`/category/${c.name}?category=${c._id}`}
                          className="block py-2 hover:text-green-600"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>

          {/* MOBILE SEARCH BAR */}
          <div className="md:hidden mt-2 mb-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKey}
                placeholder="Search products..."
                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 rounded-xl outline-none"
              />
            </div>
          </div>
        </div>

        {/* MOBILE ACCORDION MENU */}
        <div
          className={`md:hidden bg-white border-t transition-all duration-300 overflow-hidden ${
            mobileOpen ? "max-h-[80vh] shadow-lg" : "max-h-0"
          }`}
        >
          <div className="px-4 py-4 space-y-3">

            {/* TOOLS */}
            <div>
              <button
                onClick={toggleTools}
                className="w-full flex items-center justify-between px-2 py-3 rounded hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <GitCompareArrows className="w-5 h-5" />
                  <span className="font-medium">Tools</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${accOpenTools ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`accordion-content ${
                  accOpenTools ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <Link href="/ai-compare" className="block py-2 hover:text-green-600 pl-6">
                  AI Compare
                </Link>
              </div>
            </div>

            {/* PRODUCTS */}
            <div>
              <button
                onClick={toggleProducts}
                className="w-full flex items-center justify-between px-2 py-3 rounded hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <Layers3 className="w-5 h-5" />
                  <span className="font-medium">Products</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${accOpenProducts ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`accordion-content ${
                  accOpenProducts ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <Link href="/product/popular?isPopular=true" className="block py-2 hover:text-green-600 pl-6">
                  Popular
                </Link>
                <Link href="/product/newrelease?newRelease=true" className="block py-2 hover:text-green-600 pl-6">
                  New Releases
                </Link>
                <Link href="/product/bestseller?bestSeller=true" className="block py-2 hover:text-green-600 pl-6">
                  Best Sellers
                </Link>
              </div>
            </div>

            {/* CATEGORIES */}
            <div>
              <button
                onClick={toggleCategories}
                className="w-full flex items-center justify-between px-2 py-3 rounded hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <ChevronDown className="w-5 h-5" />
                  <span className="font-medium">Categories</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${accOpenCategories ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`accordion-content ${
                  accOpenCategories ? "max-h-[40vh] opacity-100" : "max-h-0 opacity-0"
                } overflow-auto`}
              >
                {categories.map((c: any) => (
                  <Link
                    key={c._id}
                    href={`/category/${c.name}?category=${c._id}`}
                    className="block py-2 hover:text-green-600 pl-6"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* STATIC LINKS */}
            <div className="pt-2 border-t text-sm">
              <Link href="/deal" className="block py-2 hover:text-green-600">
                Deals
              </Link>
              <Link href="/blog" className="block py-2 hover:text-green-600">
                Blog
              </Link>
              <Link href="/contact" className="block py-2 hover:text-green-600">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="h-[120px] md:h-[100px] mb-2" />
    </>
  );
}
