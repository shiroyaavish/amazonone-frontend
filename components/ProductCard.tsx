"use client"
import Link from "next/link";
import { Heart, Star, Scale, Check } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useProductStore } from "@/store/useProductStore";
import { useCompareStore } from "@/store/useCompareStore";
import Image from "next/image";
// import { useRouter } from "next/router";

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

export default function ProductCard({ product, priority = false }: { product: Product, priority: boolean }) {
    // const router = useRouter()
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
    const { addProduct, products, removeProduct } = useCompareStore();
    const { productVisit } = useProductStore()
    const isLiked = wishlist.includes(product._id);
    const isInCompare = products.includes(product.title);
    const productIndex = products.indexOf(product.title);
    const compareCount = products.length;
    const canAddToCompare = compareCount < 4; // Limit to 4 products for comparison

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        isLiked ? removeFromWishlist(product._id) : addToWishlist(product._id);
    };

    const handleCompareToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isInCompare) {
            removeProduct(productIndex);
        } else if (canAddToCompare) {
            addProduct(product.title);
        }
    };

    const discount = Math.round(
        ((product.price.original - product.price.current) / product.price.original) * 100
    );

    const onClickhandle = async (id: string) => {
        await productVisit(id)
        // router.push(`/product/${slug}`)
    }

    return (
        <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
            <Link href={`/product/${product.slug}`} onClick={() => onClickhandle(product._id)}>
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <Image
                        src={product.imageUrls?.[0]}
                        alt={product.title}
                        fill
                        priority={priority}
                        sizes="(max-width: 640px) 50vw,
         (max-width: 1024px) 33vw,
         20vw"
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        placeholder="blur"
                        blurDataURL="/blur.png"
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

                    {/* Compare Badge - Shows when product is in comparison */}
                    {isInCompare && (
                        <div className="absolute bottom-2 left-2 z-10">
                            <span className="bg-blue-500 text-white text-[10px] font-semibold px-2 py-1 rounded-md shadow-md flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                In Compare
                            </span>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                        <button
                            onClick={handleToggle}
                            className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
                            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                        </button>
                        <button
                            onClick={handleCompareToggle}
                            disabled={!isInCompare && !canAddToCompare}
                            className={`w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md transition ${!isInCompare && !canAddToCompare
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:scale-110"
                                }`}
                            aria-label={isInCompare ? "Remove from compare" : "Add to compare"}
                            title={!isInCompare && !canAddToCompare ? "Maximum 4 products can be compared" : ""}
                        >
                            <Scale className={`w-4 h-4 ${isInCompare ? "fill-blue-500 text-blue-500" : "text-gray-600"}`} />
                        </button>
                    </div>
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
            </Link>
        </div>
    );
}