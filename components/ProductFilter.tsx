"use client";

import { useEffect, useState } from "react";
import { Loader2, X, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useProductStore } from "@/store/useProductStore";
import { useHomeStore } from "@/store/useHomeStore";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export default function ProductFilter() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4040/api";
  const searchParams = useSearchParams();
  const params = new URLSearchParams(useSearchParams());
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  const {
    products,
    totalPages,
    currentPage,
    productLoading,
    isPopular,
    bestSeller,
    newRelease,
    minPrice,
    maxPrice,
    sort,
    category,
    search,
    setFilter,
    resetFilters,
    fetchProducts,
  } = useProductStore();

  const { categories } = useHomeStore();

  // ✅ Sync filters from URL once
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    const popular = searchParams.get("isPopular") === "true";
    const best = searchParams.get("bestSeller") === "true";
    const newest = searchParams.get("newRelease") === "true";
    const searchQuery = searchParams.get("search");

    if (urlCategory) setFilter("category", [urlCategory]);
    if (popular) setFilter("isPopular", true);
    if (best) setFilter("bestSeller", true);
    if (newest) setFilter("newRelease", true);
    if (searchQuery) setFilter("search", searchQuery);

    fetchProducts(baseUrl, 1);
  }, [searchParams]);

  const resetFilterHandler = () => {
    resetFilters();
    params.delete("category");
    params.delete("isPopular");
    params.delete("bestSeller");
    params.delete("newRelease");
    params.delete("search");
    const queryString = params.toString();
    const newUrl = queryString ? `/product?${queryString}` : `/product`;
    window.history.replaceState(null, "", newUrl);
  }

  // ✅ Re-fetch when filters change
  useEffect(() => {
    fetchProducts(baseUrl, currentPage);
  }, [isPopular, bestSeller, newRelease, minPrice, maxPrice, sort, category, search, currentPage]);

  const handleCategoryClick = (categoryName: string) => {
    const currentCategories = category || [];
    const isSelected = currentCategories.includes(categoryName);

    if (isSelected) {
      setFilter("category", currentCategories.filter(c => c !== categoryName));
    } else {
      setFilter("category", [categoryName]); // Single category selection
    }
  };

  const activeFiltersCount = [
    isPopular,
    bestSeller,
    newRelease,
    (category && category.length > 0),
    minPrice,
    maxPrice,
    search
  ].filter(Boolean).length;

  const FilterSidebar = () => (
    <div className="bg-white rounded-xl shadow-sm p-5 h-fit sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-green-600" />
          Filters
        </h2>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilterHandler}
            className="text-xs text-red-600 font-semibold hover:text-red-700 flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Clear ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Search Query Display */}
      {search && (
        <div className="mb-5 pb-4 border-b border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-2">Search Query</p>
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm">
            <span className="flex-1 truncate">"{search}"</span>
            <button
              onClick={() => setFilter("search", "")}
              className="hover:bg-green-100 rounded-full p-1 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Quick Filters */}
      <div className="mb-5 pb-4 border-b border-gray-100 space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Filters</h3>

        <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer hover:text-green-600 transition">
          <input
            type="checkbox"
            checked={isPopular}
            onChange={() => setFilter("isPopular", !isPopular)}
            className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
          />
          Popular Products
        </label>

        <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer hover:text-green-600 transition">
          <input
            type="checkbox"
            checked={bestSeller}
            onChange={() => setFilter("bestSeller", !bestSeller)}
            className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
          />
          Best Sellers
        </label>

        <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer hover:text-green-600 transition">
          <input
            type="checkbox"
            checked={newRelease}
            onChange={() => setFilter("newRelease", !newRelease)}
            className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
          />
          New Releases
        </label>
      </div>

      {/* Price Range */}
      <div>
        <button
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="text-sm font-semibold text-gray-900">Price Range</h3>
          {isPriceOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {isPriceOpen && (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Min Price</label>
              <input
                type="number"
                placeholder="₹ 0"
                value={minPrice}
                onChange={(e) => setFilter("minPrice", e.target.value)}
                className="w-full border border-gray-300 rounded-lg text-sm px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Max Price</label>
              <input
                type="number"
                placeholder="₹ 10000"
                value={maxPrice}
                onChange={(e) => setFilter("maxPrice", e.target.value)}
                className="w-full border border-gray-300 rounded-lg text-sm px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        )}


        {/* Categories */}
        <div className="mb-5 pb-4 border-b mt-3 border-gray-100">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center justify-between w-full mb-3"
          >
            <h3 className="text-sm font-semibold text-gray-900">Categories</h3>
            {isCategoryOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {isCategoryOpen && categories && categories.length > 0 && (
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => handleCategoryClick(cat._id)}
                  className={`w-full text-left px-1 py-1 rounded-lg text-sm font-medium transition-all ${category?.includes(cat._id)
                    ? "underline text-black"
                    : "text-gray-700 hover:underline"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="w-full bg-white rounded-lg shadow-sm px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-900"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </span>
          {isMobileSidebarOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileSidebarOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4">
              <FilterSidebar />
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <FilterSidebar />
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {productLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Showing {products.length} {products.length === 1 ? 'product' : 'products'}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-10 pb-10">
              <button
                disabled={currentPage === 1}
                onClick={() => fetchProducts(baseUrl, currentPage - 1)}
                className={`px-5 py-2.5 rounded-lg font-medium border transition-all ${currentPage === 1
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-green-600 border-green-600 hover:bg-green-50"
                  }`}
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
              </div>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => fetchProducts(baseUrl, currentPage + 1)}
                className={`px-5 py-2.5 rounded-lg font-medium border transition-all ${currentPage >= totalPages
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-green-600 border-green-600 hover:bg-green-50"
                  }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}