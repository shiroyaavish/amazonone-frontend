"use client";

import { useEffect, useState } from "react";
import { Heart, ArrowLeft, Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface Product {
  _id: string;
  slug: string;
  title: string;
  brand: string;
  imageUrls: string[];
  price: {
    current: number;
    original: number;
  };
}

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);

  const PAGE_SIZE = 25;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  // ✅ Load wishlist IDs from localStorage
  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistIds(ids);
    setTotalPages(Math.ceil(ids.length / PAGE_SIZE));
  }, []);

  // ✅ Fetch products for current page
  useEffect(() => {
    if (wishlistIds.length === 0) return;

    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const currentIds = wishlistIds.slice(start, end);

    setLoading(true);
    fetch(`${baseUrl}/product/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: currentIds }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) setProducts(data.data);
        else setProducts([]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching wishlist:", err);
        setLoading(false);
      });
  }, [page, wishlistIds, baseUrl]);

  // ✅ Remove item from wishlist
  const handleRemove = (id: string) => {
    const updated = wishlistIds.filter((itemId) => itemId !== id);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlistIds(updated);
    if (products.length === 1 && page > 1) setPage(page - 1);
  };

  // ✅ Empty Wishlist View
  if (wishlistIds.length === 0) {
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

  // ✅ Wishlist with Products
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h6 className="text-2xl font-bold text-gray-800">My Wishlist</h6>
          <p className="text-gray-500 text-sm">
            Showing {products.length} of {wishlistIds.length} items
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
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`px-4 py-2 rounded-lg font-medium border ${
                page === 1
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-green-600 border-green-600 hover:bg-green-50"
              }`}
            >
              Prev
            </button>

            <span className="text-gray-700 font-medium">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className={`px-4 py-2 rounded-lg font-medium border ${
                page === totalPages
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
