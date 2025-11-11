"use client";

import { useEffect } from "react";
import { Heart, ArrowLeft, Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function WishlistPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  const {
    wishlist,
    products,
    loading,
    totalPages,
    currentPage,
    fetchWishlistProducts,
    removeFromWishlist,
  } = useWishlistStore();

  useEffect(() => {
    console.log("💾 Wishlist from store:", wishlist);
    if (wishlist.length > 0) {
      fetchWishlistProducts(baseUrl, currentPage);
    } else {
      console.warn("⚠️ Wishlist empty in Zustand.");
    }
  }, [baseUrl, wishlist.length, currentPage]);


  // ✅ Empty Wishlist View
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <Heart className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-lg font-medium">Your wishlist is empty</p>
        <Link
          href="/"
          className="mt-4 text-green-600 font-semibold hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h6 className="text-2xl font-bold text-gray-800">My Wishlist</h6>
          <p className="text-gray-500 text-sm">
            Showing {products.length} of {wishlist.length} items
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
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
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                fetchWishlistProducts(baseUrl, currentPage - 1)
              }
              className={`px-4 py-2 rounded-lg font-medium border ${currentPage === 1
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-green-600 border-green-600 hover:bg-green-50"
                }`}
            >
              Prev
            </button>

            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                fetchWishlistProducts(baseUrl, currentPage + 1)
              }
              className={`px-4 py-2 rounded-lg font-medium border ${currentPage === totalPages
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
  );
}
