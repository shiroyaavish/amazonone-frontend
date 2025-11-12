"use client";

import { useEffect } from "react";
import { Loader2, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useProductStore } from "@/store/useProductStore";
import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4040/api";
  const searchParams = useSearchParams();

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
    setFilter,
    resetFilters,
    fetchProducts,
  } = useProductStore();

  // 🧩 Sync filters from URL when page loads
  useEffect(() => {
    const category = searchParams.get("category");
    const popular = searchParams.get("isPopular") === "true";
    const best = searchParams.get("bestSeller") === "true";
    const newest = searchParams.get("newRelease") === "true";

    if (category) setFilter("category", [category]);
    if (popular) setFilter("isPopular", true);
    if (best) setFilter("bestSeller", true);
    if (newest) setFilter("newRelease", true);

    // fetch initial products after setting filters
    fetchProducts(baseUrl, 1);
  }, [searchParams, baseUrl]);

  // 🧭 Re-fetch when filters change
  useEffect(() => {
    fetchProducts(baseUrl, currentPage);
  }, [isPopular, bestSeller, newRelease, minPrice, maxPrice, sort, currentPage]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-green-600" /> All Products
        </h1>

        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={sort}
            onChange={(e) => setFilter("sort", e.target.value)}
            className="border border-gray-300 rounded-lg text-sm px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="newest">Newest</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>

          <button
            onClick={resetFilters}
            className="text-sm text-green-600 font-semibold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-wrap gap-4 items-center">
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={isPopular}
                onChange={() => setFilter("isPopular", !isPopular)}
              />
              Popular
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={bestSeller}
                onChange={() => setFilter("bestSeller", !bestSeller)}
              />
              Best Seller
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={newRelease}
                onChange={() => setFilter("newRelease", !newRelease)}
              />
              New Release
            </label>
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min ₹"
              value={minPrice}
              onChange={(e) => setFilter("minPrice", e.target.value)}
              className="border border-gray-300 rounded-lg text-sm px-3 py-2 w-24 focus:ring-2 focus:ring-green-500"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max ₹"
              value={maxPrice}
              onChange={(e) => setFilter("maxPrice", e.target.value)}
              className="border border-gray-300 rounded-lg text-sm px-3 py-2 w-24 focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {productLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center py-20 text-gray-500">
            No products found with these filters.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10 pb-10">
            <button
              disabled={currentPage === 1}
              onClick={() => fetchProducts(baseUrl, currentPage - 1)}
              className={`px-4 py-2 rounded-lg font-medium border ${
                currentPage === 1
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-green-600 border-green-600 hover:bg-green-50"
              }`}
            >
              Prev
            </button>

            <span className="text-gray-700 font-medium">Page {currentPage}</span>

            <button
              onClick={() => fetchProducts(baseUrl, currentPage + 1)}
              className="px-4 py-2 rounded-lg font-medium border text-green-600 border-green-600 hover:bg-green-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
