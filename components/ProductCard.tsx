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
    availability: boolean;
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
        <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
            <a href={`/product/${product.slug}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img
                        src={product.imageUrls?.[0]}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Product Tag */}
                    {(product.isPopular || product.bestSeller || product.newRelease || discount > 0) && (
                        <div className="absolute top-2 left-2 z-10">
                            {product.isPopular ? (
                                <span className="bg-linear-to-r from-emerald-500 to-green-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                                    🌿 Popular
                                </span>
                            ) : product.bestSeller ? (
                                <span className="bg-linear-to-r from-green-600 to-teal-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                                    🏆 Best Seller
                                </span>
                            ) : product.newRelease ? (
                                <span className="bg-linear-to-r from-blue-500 to-indigo-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                                    ✨ New
                                </span>
                            ) : null}
                        </div>
                    )}

                    <button
                        onClick={handleToggle}
                        className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
                    >
                        <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                    </button>
                </div>

                <div className="p-3">
                    <p className="text-[10px] font-medium text-green-600 uppercase tracking-wide mb-0.5">
                        {product.brand}
                    </p>
                    <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 mb-1.5 min-h-8 leading-tight">
                        {product.title}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3 h-3 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                                />
                            ))}
                        </div>
                        <span className="text-[10px] text-gray-500 ml-0.5">(4.0)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        {product.availability ?
                            <> <span className="text-sm font-bold text-gray-900">₹{product.price?.current}</span>
                                {product.price?.original && (
                                    <span className="text-[10px] text-gray-400 line-through">
                                        ₹{product.price.original}
                                    </span>
                                )}
                                {product.price?.discount != null && (
                                    <span className="text-[10px] font-medium text-red-600 bg-red-50 rounded-full px-1.5 py-0.5">
                                        {product.price.discount}% off
                                    </span>
                                )}
                            </>
                            :
                            <span className="text-sm font-bold text-gray-900">Unavailable</span>
                        }
                    </div>
                </div>
            </a>
        </div>
    );
}
