"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  Heart,
  GitCompareArrows,
  Layers3,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  TrendingUp,
  Package,
  Grid3x3,
  FileText,
  Mail,
  User,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useHomeStore } from "@/store/useHomeStore";
import { useProductStore } from "@/store/useProductStore";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Desktop dropdown states
  const [productsOpen, setProductsOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  // Mobile accordion states
  const [accOpenProducts, setAccOpenProducts] = useState(false);
  const [accOpenCategories, setAccOpenCategories] = useState(false);
  const [accOpenInfo, setAccOpenInfo] = useState(false);

  const { fetchProducts, setFilter } = useProductStore();
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

  const handleSearchKey = async (e: any) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery.trim()) params.set("search", searchQuery.trim());
      else params.delete("search");

      router.push(`/product?${params.toString()}`);
      setFilter("search", searchQuery.trim());
      setMobileOpen(false);
      await fetchProducts(1);
    }
  };

  useEffect(() => {
    const onKey = (e: any) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setProductsOpen(false);
        setCategoriesOpen(false);
        setInfoOpen(false);
        setAccOpenProducts(false);
        setAccOpenCategories(false);
        setAccOpenInfo(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setProductsOpen(false);
      setCategoriesOpen(false);
      setInfoOpen(false);
    };

    if (productsOpen || categoriesOpen || infoOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [productsOpen, categoriesOpen, infoOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
          ${isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-white shadow-sm"}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4 h-16 lg:h-18">
            {/* LOGO */}
            <Link
              href="/"
              className="font-[Poppins] font-extrabold text-black tracking-[0.14em] text-lg md:text-xl whitespace-nowrap"
            >
              DEALMITRA
            </Link>

            {/* SEARCH BAR DESKTOP */}
            <div className="hidden lg:flex items-center gap-6 flex-1 max-w-3xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKey}
                  placeholder="Search for products..."
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full"
                />
              </div>
            </div>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-1">

              {/* AI Compare */}
              <Link
                href="/ai-compare"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 text-gray-700"
              >
                <GitCompareArrows className="w-4 h-4" />
                <span className="text-sm font-medium">AI Compare</span>
              </Link>

              {/* PRODUCTS DROPDOWN */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProductsOpen(!productsOpen);
                    setCategoriesOpen(false);
                    setInfoOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 text-gray-700"
                >
                  <Package className="w-4 h-4" />
                  <span className="text-sm font-medium">Products</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${productsOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {productsOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white shadow-xl rounded-xl p-2">
                    <Link
                      href="/product/popular?isPopular=true"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-50"
                      onClick={() => setProductsOpen(false)}
                    >
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                      Popular
                    </Link>

                    <Link
                      href="/product/newrelease?newRelease=true"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-50"
                      onClick={() => setProductsOpen(false)}
                    >
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      New Releases
                    </Link>

                    <Link
                      href="/product/bestseller?bestSeller=true"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-50"
                      onClick={() => setProductsOpen(false)}
                    >
                      <Package className="w-4 h-4 text-green-500" />
                      Best Sellers
                    </Link>
                  </div>
                )}
              </div>

              {/* CATEGORIES DROPDOWN */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCategoriesOpen(!categoriesOpen);
                    setProductsOpen(false);
                    setInfoOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 text-gray-700"
                >
                  <Grid3x3 className="w-4 h-4" />
                  <span className="text-sm font-medium">Categories</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${categoriesOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {categoriesOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white shadow-xl rounded-xl p-3 max-h-80 overflow-y-auto">
                    {categories.map((c) => (
                      <Link
                        key={c._id}
                        href={`/category/${c.name}?category=${c._id}`}
                        className="block px-4 py-2 rounded-lg hover:bg-green-50 text-gray-700"
                        onClick={() => setCategoriesOpen(false)}
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* BLOG */}
              <Link
                href="/blog"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 text-gray-700"
              >
                <FileText className="w-4 h-4" />
                Blog
              </Link>

              {/* INFO DROPDOWN (About + Privacy + FAQ) */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setInfoOpen(!infoOpen);
                    setProductsOpen(false);
                    setCategoriesOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 text-gray-700"
                >
                  <Layers3 className="w-4 h-4" />
                  <span className="text-sm font-medium">Info</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${infoOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {infoOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-xl p-2">
                    <Link
                      href="/aboutus"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-50"
                      onClick={() => setInfoOpen(false)}
                    >
                      <User className="w-4 h-4" /> About Us
                    </Link>

                    <Link
                      href="/privacy-policy"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-50"
                      onClick={() => setInfoOpen(false)}
                    >
                      <FileText className="w-4 h-4" /> Privacy Policy
                    </Link>

                    <Link
                      href="/faq"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-50"
                      onClick={() => setInfoOpen(false)}
                    >
                      <HelpCircle className="w-4 h-4" /> FAQ
                    </Link>
                  </div>
                )}
              </div>

              {/* WISHLIST */}
              <Link
                href="/wishlist"
                className="relative flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 text-gray-700"
              >
                <Heart className="w-4 h-4" />
                Wishlist
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex justify-center items-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </nav>

            {/* MOBILE ACTIONS */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/wishlist"
                className="relative p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Heart className="w-5 h-5 text-gray-700" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex justify-center items-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 rounded-lg hover:bg-gray-100"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* MOBILE SEARCH BAR */}
          <div className="lg:hidden pb-3">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKey}
                placeholder="Search products..."
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden bg-white border-t transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-[calc(100vh-140px)] shadow-xl" : "max-h-0"
            }`}
        >
          <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-140px)] overflow-y-auto">

            {/* AI Compare */}
            <Link
              href="/ai-compare"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-50"
              onClick={() => setMobileOpen(false)}
            >
              <GitCompareArrows className="w-5 h-5" /> AI Compare
            </Link>

            {/* MOBILE - PRODUCTS ACCORDION */}
            <div>
              <button
                onClick={() => setAccOpenProducts(!accOpenProducts)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5" />
                  <span className="font-medium text-gray-700">Products</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${accOpenProducts ? "rotate-180" : ""
                    }`}
                />
              </button>

              <div
                className={`transition-all overflow-hidden ${accOpenProducts ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="space-y-1 pl-4">
                  <Link
                    href="/product/popular?isPopular=true"
                    className="block px-4 py-2.5 hover:bg-green-50 text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    Popular
                  </Link>
                  <Link
                    href="/product/newrelease?newRelease=true"
                    className="block px-4 py-2.5 hover:bg-green-50 text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    New Releases
                  </Link>
                  <Link
                    href="/product/bestseller?bestSeller=true"
                    className="block px-4 py-2.5 hover:bg-green-50 text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    Best Sellers
                  </Link>
                </div>
              </div>
            </div>

            {/* MOBILE - CATEGORIES ACCORDION */}
            <div>
              <button
                onClick={() => setAccOpenCategories(!accOpenCategories)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <Grid3x3 className="w-5 h-5" />
                  <span className="font-medium text-gray-700">Categories</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${accOpenCategories ? "rotate-180" : ""
                    }`}
                />
              </button>

              <div
                className={`transition-all overflow-hidden ${accOpenCategories ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="space-y-1 pl-4 max-h-64 overflow-y-auto">
                  {categories.map((c) => (
                    <Link
                      key={c._id}
                      href={`/category/${c.name}?category=${c._id}`}
                      className="block px-4 py-2.5 hover:bg-green-50 text-sm"
                      onClick={() => setMobileOpen(false)}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* BLOG */}
            <Link
              href="/blog"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-50"
              onClick={() => setMobileOpen(false)}
            >
              <FileText className="w-5 h-5" /> Blog
            </Link>

            {/* MOBILE - INFO ACCORDION */}
            <div>
              <button
                onClick={() => setAccOpenInfo(!accOpenInfo)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <Layers3 className="w-5 h-5" />
                  <span className="font-medium text-gray-700">Info</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${accOpenInfo ? "rotate-180" : ""
                    }`}
                />
              </button>

              <div
                className={`transition-all overflow-hidden ${accOpenInfo ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="space-y-1 pl-4">
                  <Link
                    href="/aboutus"
                    className="block px-4 py-2.5 hover:bg-green-50 text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    About Us
                  </Link>

                  <Link
                    href="/privacy-policy"
                    className="block px-4 py-2.5 hover:bg-green-50 text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    Privacy Policy
                  </Link>

                  <Link
                    href="/faq"
                    className="block px-4 py-2.5 hover:bg-green-50 text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    FAQ
                  </Link>
                </div>
              </div>
            </div>

            {/* CONTACT */}
            <Link
              href="/contact"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-50"
              onClick={() => setMobileOpen(false)}
            >
              <Mail className="w-5 h-5" /> Contact
            </Link>
          </div>
        </div>
      </header>

      {/* SPACER */}
      <div className="h-[132px] lg:h-[88px]" />
    </>
  );
}
