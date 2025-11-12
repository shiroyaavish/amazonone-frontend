import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";

interface Product {
    _id: string;
    slug: string;
    title: string;
    brand: string;
    imageUrls: string[];
    price: { current: number; original: number, discount?: number };
    isPopular?: boolean;
    bestSeller?: boolean;
    newRelease?: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
    const isLiked = wishlist.includes(product._id);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        isLiked ? removeFromWishlist(product._id) : addToWishlist(product._id);
    };

    const discount = Math.round(
        ((product.price.original - product.price.current) / product.price.original) * 100
    );

    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-xl">
            <Link href={`/product/${product.slug}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img
                        src={product.imageUrls?.[0]}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* 🏷️ Product Tag — with improved UX */}
                    {(product.isPopular || product.bestSeller || product.newRelease || discount > 0) && (
                        <div className="absolute top-3 left-3 z-10">
                            {product.isPopular ? (
                                <span className="bg-linear-to-r from-emerald-500 to-green-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                                    🌿 Popular Pick
                                </span>
                            ) : product.bestSeller ? (
                                <span className="bg-linear-to-r from-green-600 to-teal-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                                    🏆 Best Seller
                                </span>
                            ) : product.newRelease ? (
                                <span className="bg-linear-to-r from-green-600 to-teal-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                                    🏆 Best Seller
                                </span>
                            )
                                : null
                                //  (
                                //     <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-md">
                                //         {discount}% OFF
                                //     </span>
                                // )
                            }
                        </div>
                    )}



                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleToggle(e);
                        }}
                        className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
                    >
                        <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                    </button>
                </div>
                <div className="p-4">
                    <p className="text-xs font-medium text-green-600 uppercase tracking-wide mb-1">
                        {product.brand}
                    </p>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 min-h-10">
                        {product.title}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200"}`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                        <div style={{ fontWeight: 700 }}>₹{product.price?.current}</div>
                        {product.price?.original && (
                            <div
                                style={{
                                    color: '#6b7280',
                                    textDecoration: 'line-through',
                                    fontSize: 12,
                                }}
                            >
                                ₹{product.price.original}
                            </div>
                        )}
                        {product.price?.discount != null && (
                            <div
                                style={{
                                    color: '#16a34a',
                                    backgroundColor: '#d1fae5',
                                    borderRadius: 999,
                                    padding: '2px 8px',
                                    fontSize: 12,
                                }}
                            >
                                {product.price.discount}% off
                            </div>
                        )}
                    </div>
                </div>
            </Link >
        </div >
    );
}
