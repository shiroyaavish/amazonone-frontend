"use client";

import {
    Heart,
    Star,
    ShoppingCart,
    Share2,
    ChevronLeft,
    ChevronRight,
    Check,
    ArrowLeft,
    Scale,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/store/useProductStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCompareStore } from "@/store/useCompareStore";
import AccordionGroup from "./AccordionGroup";
import SuggestionCarousel from "./SuggestionCarousel";

export default function ProductDetailPage({ slug }: { slug: string }) {
    const router = useRouter();

    const { product, productLoading, findOne: fetchProduct } = useProductStore();
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
    const { addProduct, removeProduct, products } = useCompareStore();

    const isLiked = product ? wishlist.includes(product._id) : false;
    const [selectedImage, setSelectedImage] = useState(0);

    // 🔁 Compare logic (same as ProductCard)
    const isInCompare = product ? products.includes(product.title) : false;
    const productIndex = product ? products.indexOf(product.title) : -1;
    const canAddToCompare = products.length < 4;

    useEffect(() => {
        if (slug) fetchProduct(slug);
    }, [slug, fetchProduct]);

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!product) return;
        isLiked
            ? removeFromWishlist(product._id)
            : addToWishlist(product._id);
    };

    const handleCompareToggle = () => {
        if (!product) return;

        if (isInCompare) {
            removeProduct(productIndex);
        } else if (canAddToCompare) {
            addProduct(product.title);
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: product?.title,
            text: "Take a look at this product on DealMitra",
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log(err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    if (productLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                Product not found
            </div>
        );
    }

    const discount =
        product.price.discount ||
        Math.round(
            ((product.price.original - product.price.current) /
                product.price.original) *
            100
        );

    return (
        <div className="min-h-screen bg-white">
            {/* Back */}
            <div className="max-w-6xl mx-auto px-4 py-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                </button>
            </div>

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* 🖼️ Images (UNCHANGED) */}
                    <div className="space-y-3">
                        <div className="relative bg-gray-50 rounded-lg overflow-hidden aspect-square border border-gray-200">
                            <img
                                src={product.imageUrls[selectedImage]}
                                alt={product.title}
                                className="w-full h-full object-contain"
                            />
                            {discount > 0 && product.availability && (
                                <div className="absolute top-3 left-3">
                                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                        {product.availability ? `${discount} % OFF` : "Unavailable"}
                                    </span>
                                </div>
                            )}
                            {!product.availability && (
                                <div className="absolute top-3 left-3">
                                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                        Unavailable
                                    </span>
                                </div>
                            )}
                            {product.imageUrls.length > 1 && (
                                <>
                                    <button
                                        onClick={() =>
                                            setSelectedImage((prev) =>
                                                prev === 0 ? product.imageUrls.length - 1 : prev - 1
                                            )
                                        }
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            setSelectedImage((prev) => (prev + 1) % product.imageUrls.length)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {product.imageUrls.length > 1 && (
                            <div className="flex gap-2">
                                {product.imageUrls.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition ${selectedImage === idx
                                            ? "border-green-600"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 🧾 Details */}
                    <div className="space-y-5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-green-600 uppercase">
                                {product.brand}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleToggleWishlist}
                                    className="w-9 h-9 border rounded-lg flex items-center justify-center"
                                >
                                    <Heart
                                        className={`w-4 h-4 ${isLiked
                                            ? "fill-red-500 text-red-500"
                                            : "text-gray-500"
                                            }`}
                                    />
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="w-9 h-9 border rounded-lg flex items-center justify-center"
                                >
                                    <Share2 className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        <h1 className="text-2xl font-semibold text-gray-900">
                            {product.title}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i <
                                        Math.round(product.rating.average)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-gray-200 text-gray-200"
                                        }`}
                                />
                            ))}
                            <span className="text-sm text-gray-600">
                                {product.rating.average} (
                                {product.rating.count.toLocaleString()} ratings)
                            </span>
                        </div>

                        {/* Pricing */}
                        <div className="bg-gray-50 rounded-lg p-4 border">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-bold">
                                    ₹{product.price.current.toLocaleString()}
                                </span>
                                <span className="text-lg text-gray-400 line-through">
                                    ₹{product.price.original.toLocaleString()}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500">
                                Inclusive of all taxes
                            </p>
                        </div>

                        {/* Buy */}
                        <a
                            href={product.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-green-600 text-white text-center py-3 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Buy Now
                        </a>

                        {/* ⚖️ Compare Button */}
                        <div>
                            <button
                                onClick={handleCompareToggle}
                                disabled={!isInCompare && !canAddToCompare}
                                className={`w-full border rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition
                                    ${isInCompare
                                        ? "border-blue-600 text-blue-600 bg-blue-50"
                                        : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600"
                                    }
                                    ${!isInCompare && !canAddToCompare
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }
                                `}
                            >
                                {isInCompare ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Added to Compare
                                    </>
                                ) : (
                                    <>
                                        <Scale className="w-4 h-4" />
                                        Add to Compare
                                    </>
                                )}
                            </button>

                            {!isInCompare && !canAddToCompare && (
                                <p className="text-xs text-red-500 mt-1 text-center">
                                    You can compare up to 4 products only
                                </p>
                            )}
                        </div>
                        <h2 className="text-sm font-semibold text-gray-900 mb-3">Key Features</h2>
                        <div className="space-y-2.5">
                            {product.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-600 leading-relaxed">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {product.specifications?.length ? (
                    <div className="mt-12 border-t pt-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Specifications</h2>

                        <div className="space-y-4">
                            {product.specifications.map((specGroup, groupIdx) => (
                                <AccordionGroup key={groupIdx} title={specGroup.key} details={specGroup.details} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="mt-12 border-t pt-8 text-center text-gray-500">
                        No specifications available
                    </div>
                )}

                <SuggestionCarousel slug={slug} />
            </div>
        </div>
    );
}
