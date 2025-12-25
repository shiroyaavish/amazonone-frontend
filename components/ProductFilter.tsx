"use client";

import { useEffect, useState, useTransition, useRef } from "react";
import {
  Loader2,
  X,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useProductStore } from "@/store/useProductStore";
import { useSearchParams } from "next/navigation";
import AdBanner from "./AdBanner";

export default function ProductFilter() {
  const searchParams = useSearchParams();

  const {
    products,
    totalPages,
    currentPage,
    productLoading,
    listLoading,
    isPopular,
    bestSeller,
    newRelease,
    minPrice,
    maxPrice,
    sort,
    category,
    categories,
    search,
    setFilter,
    resetFilters,
    fetchProducts,
    fetchCategoriesData,
  } = useProductStore();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isQuickOpen, setIsQuickOpen] = useState(true);
  const [isPending, startTransition] = useTransition();

  const [localFilters, setLocalFilters] = useState({
    isPopular: false,
    bestSeller: false,
    newRelease: false,
    minPrice: "",
    maxPrice: "",
    category: [] as string[],
  });

  // ⬇️ FIX — prevent focus loss
  const minPriceRef = useRef<HTMLInputElement>(null);
  const maxPriceRef = useRef<HTMLInputElement>(null);

  const activeFiltersCount =
    [
      isPopular,
      bestSeller,
      newRelease,
      category?.length > 0,
      minPrice,
      maxPrice,
      search,
    ].filter(Boolean).length || 0;

  useEffect(() => {
    if (!searchParams) return;

    const urlPopular = searchParams.get("isPopular") === "true";
    const urlBest = searchParams.get("bestSeller") === "true";
    const urlNew = searchParams.get("newRelease") === "true";
    const urlMin = searchParams.get("minPrice") || "";
    const urlMax = searchParams.get("maxPrice") || "";
    const urlCategoryRaw = searchParams.get("category");
    const urlCategories = urlCategoryRaw ? urlCategoryRaw.split(",") : [];
    const urlSearch = searchParams.get("search") || "";

    setFilter("isPopular", urlPopular);
    setFilter("bestSeller", urlBest);
    setFilter("newRelease", urlNew);
    setFilter("minPrice", urlMin);
    setFilter("maxPrice", urlMax);
    setFilter("category", urlCategories);
    setFilter("search", urlSearch);

    setLocalFilters({
      isPopular: urlPopular,
      bestSeller: urlBest,
      newRelease: urlNew,
      minPrice: urlMin,
      maxPrice: urlMax,
      category: urlCategories,
    });

    fetchProducts(1);
    fetchCategoriesData();
  }, []);

  const PremiumCheckbox = ({ checked }: { checked: boolean }) => (
    <span
      className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${checked
        ? "bg-green-600 border-green-600 text-white"
        : "bg-white border-gray-300"
        }`}
    >
      {checked && (
        <svg
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 5L4 8L11 1" />
        </svg>
      )}
    </span>
  );

  const toggleLocalBoolean = (
    key: "isPopular" | "bestSeller" | "newRelease"
  ) => {
    setLocalFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLocalCategoryClick = (categoryId: string) => {
    setLocalFilters((prev) => {
      const already = prev.category.includes(categoryId);
      return {
        ...prev,
        category: already
          ? prev.category.filter((c) => c !== categoryId)
          : [...prev.category, categoryId],
      };
    });
  };

  // ⬇️ FIX — apply price using refs
  const applyFilters = () => {
    const min = minPriceRef.current?.value || "";
    const max = maxPriceRef.current?.value || "";

    setLocalFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
    }));

    setFilter("isPopular", localFilters.isPopular);
    setFilter("bestSeller", localFilters.bestSeller);
    setFilter("newRelease", localFilters.newRelease);
    setFilter("minPrice", min);
    setFilter("maxPrice", max);
    setFilter("category", localFilters.category);

    const params = new URLSearchParams();
    if (localFilters.isPopular) params.set("isPopular", "true");
    if (localFilters.bestSeller) params.set("bestSeller", "true");
    if (localFilters.newRelease) params.set("newRelease", "true");
    if (min) params.set("minPrice", min);
    if (max) params.set("maxPrice", max);
    if (localFilters.category.length)
      params.set("category", localFilters.category.join(","));
    if (search) params.set("search", search);

    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      query ? `/product?${query}` : `/product`
    );

    fetchProducts(1);
    setIsMobileSidebarOpen(false);
  };

  const clearFilters = () => {
    resetFilters();
    minPriceRef.current && (minPriceRef.current.value = "");
    maxPriceRef.current && (maxPriceRef.current.value = "");

    setLocalFilters({
      isPopular: false,
      bestSeller: false,
      newRelease: false,
      minPrice: "",
      maxPrice: "",
      category: [],
    });

    window.history.replaceState(null, "", `/product`);
    fetchProducts(1);
  };

  const Card = ({
    children,
    className = "",
  }: {
    children: any;
    className?: string;
  }) => (
    <div
      className={`bg-white rounded-2xl shadow-sm p-5 border border-gray-100 ${className}`}
    >
      {children}
    </div>
  );

  const FilterSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="space-y-4">
      {search && (
        <Card>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600">Search Query</p>
            <button
              onClick={() => {
                setFilter("search", "");
                window.history.replaceState(null, "", "/product");
              }}
              className="text-gray-500 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-2 bg-green-50 text-green-700 py-2 px-3 rounded-lg flex items-center justify-between text-sm">
            “{search}”
          </div>
        </Card>
      )}

      {/* Quick Filters */}
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Quick Filters</h3>
          <button onClick={() => setIsQuickOpen(!isQuickOpen)}>
            {isQuickOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>

        {isQuickOpen && (
          <div className="mt-4 space-y-3">
            {[
              ["isPopular", "Popular"],
              ["bestSeller", "Best Seller"],
              ["newRelease", "New Release"],
            ].map(([key, label]) => (
              <label
                key={key}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={(localFilters as any)[key]}
                  onChange={() => toggleLocalBoolean(key as any)}
                  className="hidden"
                />
                <PremiumCheckbox checked={(localFilters as any)[key]} />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        )}
      </Card>

      {/* Price Range */}
      <Card>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm">Price Range</h3>
          <button onClick={() => setIsPriceOpen(!isPriceOpen)}>
            {isPriceOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>

        {isPriceOpen && (
          <div className="mt-4 space-y-4">
            {/* ⬇️ FIXED INPUTS — using refs (no value binding) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500">Min</label>
                <input
                  type="number"
                  placeholder="₹ 0"
                  defaultValue={localFilters.minPrice}
                  ref={minPriceRef}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 mt-1 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">Max</label>
                <input
                  type="number"
                  placeholder="₹ 10000"
                  defaultValue={localFilters.maxPrice}
                  ref={maxPriceRef}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 mt-1 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>

            {/* Quick Price Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { min: 0, max: 499, label: "Under ₹499" },
                { min: 500, max: 999, label: "₹500 – ₹999" },
                { min: 1000, max: 1999, label: "₹1k – ₹2k" },
                { min: 2000, max: 4999, label: "₹2k – ₹5k" },
                { min: 5000, max: 9999, label: "₹5k – ₹10k" },
              ].map((range, i) => {
                const isSelected =
                  localFilters.minPrice == String(range.min) &&
                  localFilters.maxPrice == String(range.max);

                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (minPriceRef.current)
                        minPriceRef.current.value = String(range.min);
                      if (maxPriceRef.current)
                        maxPriceRef.current.value = String(range.max);

                      setLocalFilters((prev) => ({
                        ...prev,
                        minPrice: String(range.min),
                        maxPrice: String(range.max),
                      }));
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs border transition ${isSelected
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                      }`}
                  >
                    {range.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </Card>

      {/* Categories */}
      <Card>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm">Categories</h3>
          <button onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
            {isCategoryOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>

        {isCategoryOpen && (
          <div className="mt-4 space-y-2 max-h-64 overflow-y-auto pr-2">
            {categories?.map((cat: any) => (
              <label
                key={cat._id}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={localFilters.category.includes(cat._id)}
                  onChange={() => handleLocalCategoryClick(cat._id)}
                />
                <PremiumCheckbox
                  checked={localFilters.category.includes(cat._id)}
                />
                <span className="text-sm text-gray-700">{cat.name}</span>
              </label>
            ))}
          </div>
        )}
      </Card>

      {!isMobile && (
        <div className="flex gap-3 mt-3">
          <button
            onClick={applyFilters}
            className="flex-1 bg-green-600 text-white py-2 rounded-xl cursor-pointer"
          >
            Apply
          </button>
          <button
            onClick={clearFilters}
            className="px-4 py-2 border rounded-xl cursor-pointer text-red-600 bg-red-50"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );

  const goToPrev = () => {
    if (currentPage > 1) fetchProducts(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) fetchProducts(currentPage + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="w-full flex justify-between bg-white px-4 py-3 rounded-xl shadow-sm border border-gray-200"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters {activeFiltersCount > 0 && (
              <span className="ml-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </span>

          {isMobileSidebarOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {isMobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-50"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div
            className="absolute inset-0 bg-white flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-4 flex justify-between border-b">
              <h2 className="flex items-center gap-2 font-semibold text-lg">
                <SlidersHorizontal className="w-5 h-5 text-green-600" />
                Filters
              </h2>

              <button
                onClick={clearFilters}
                className="text-red-600 font-medium"
              >
                Clear
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <FilterSidebar isMobile />
            </div>

            <div className="p-4 border-t">
              <button
                onClick={applyFilters}
                className="w-full bg-green-600 text-white py-3 rounded-xl text-base font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-6">
        <aside className="hidden lg:block w-72">
          <FilterSidebar />
        </aside>

        <div className="flex-1">
          {listLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-10 h-10 animate-spin text-green-600" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <div className="text-6xl mb-4">🔍</div>
              <p className="font-semibold text-lg">No products found</p>
              <p className="text-sm mt-1">
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-4">
                Showing {products.length} products
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.map((p, i) => (
                  <>
                    {(i + 1) % 15 == 0 && <AdBanner key={i} />}
                    <ProductCard key={p._id} product={p} />
                  </>
                ))}
              </div>
            </>
          )}

          {totalPages > 1 && (
            <div className="my-12 flex flex-col items-center gap-6">

              {/* Controls */}
              <div className="flex items-center gap-2">

                {/* Previous */}
                <button
                  onClick={goToPrev}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all
          ${currentPage === 1
                      ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1 px-2">
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;

                    if (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => fetchProducts(page)}
                          className={`min-w-10 h-10 px-3 rounded-lg text-sm font-semibold transition-all
                  ${page === currentPage
                              ? "bg-green-600 text-white shadow-md scale-105"
                              : "text-gray-700 hover:bg-gray-100 border border-transparent hover:border-gray-300"
                            }`}
                        >
                          {page}
                        </button>
                      );
                    }

                    if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span
                          key={page}
                          className="px-2 text-gray-400 select-none font-bold"
                        >
                          ···
                        </span>
                      );
                    }

                    return null;
                  })}
                </div>

                {/* Next */}
                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all
          ${currentPage === totalPages
                      ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                    }`}
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Page info */}
              <div className="text-sm text-gray-600 font-medium">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
}
