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
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
    _id: string;
    slug: string;
    title: string;
    brand: string;
    features: string[];
    affiliateUrl: string;
    imageUrls: string[];
    price: {
        original: number;
        current: number;
        discount?: number;
    };
    rating: {
        average: number;
        count: number;
    };
    specifications?: { key: string; value: string }[];
}

export default function ProductDetailPage({ slug }: { slug: string }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const router = useRouter();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

    useEffect(() => {
        console.log("Fetching product details for slug:", slug);
        if (!slug) return;
        fetch(`${baseUrl}/product/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.statusCode === 200) setProduct(data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching product:", err);
                setLoading(false);
            });
    }, [slug, baseUrl]);

    // ✅ Check if product is already liked
    useEffect(() => {
        if (product?._id) {
            const likedItems: string[] = JSON.parse(localStorage.getItem("wishlist") || "[]");
            setIsLiked(likedItems.includes(product._id));
        }
    }, [product]);

    // ✅ Toggle like
    const handleLikeToggle = () => {
        if (!product?._id) return;
        const likedItems: string[] = JSON.parse(localStorage.getItem("wishlist") || "[]");

        if (isLiked) {
            const updated = likedItems.filter((id) => id !== product._id);
            localStorage.setItem("wishlist", JSON.stringify(updated));
            setIsLiked(false);
        } else {
            likedItems.push(product._id);
            localStorage.setItem("wishlist", JSON.stringify(likedItems));
            setIsLiked(true);
        }

        window.dispatchEvent(new Event("wishlistUpdated"));
    };

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading product...</p>
                </div>
            </div>
        );

    if (!product)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Product not found</p>
            </div>
        );

    const discount =
        product.price.discount ||
        Math.round(
            ((product.price.original - product.price.current) / product.price.original) * 100
        );

    return (
        <div className="min-h-screen bg-white">
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
                    {/* 🖼️ Image Section */}
                    <div className="space-y-3">
                        <div className="relative bg-gray-50 rounded-lg overflow-hidden aspect-square border border-gray-200">
                            <img
                                src={product.imageUrls[selectedImage]}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                            {discount > 0 && (
                                <div className="absolute top-3 left-3">
                                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                        {discount}% OFF
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

                        {/* 📸 Image Thumbnails */}
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
                                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 🧾 Details Section */}
                    <div className="space-y-5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">
                                {product.brand}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleLikeToggle}
                                    className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center hover:border-gray-300 transition"
                                >
                                    <Heart
                                        className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-500"
                                            }`}
                                    />
                                </button>
                                <button className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center hover:border-gray-300 transition">
                                    <Share2 className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <h6 className="text-2xl font-semibold text-gray-900 mb-2">
                                {product.title}
                            </h6>
                            <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.round(product.rating.average)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "fill-gray-200 text-gray-200"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                    {product.rating.average} ({product.rating.count.toLocaleString()} ratings)
                                </span>
                            </div>
                        </div>

                        {/* 💰 Pricing Section */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                            <div className="flex items-center gap-3 flex-wrap mb-1">
                                <span className="text-3xl font-bold text-gray-900">
                                    ₹{product.price.current.toLocaleString()}
                                </span>
                                <span className="text-lg text-gray-400 line-through">
                                    ₹{product.price.original.toLocaleString()}
                                </span>
                                <span className="text-sm font-medium text-green-600">
                                    Save ₹{(product.price.original - product.price.current).toLocaleString()}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500">Inclusive of all taxes</p>
                        </div>

                        {/* ✨ Key Features */}
                        <div>
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

                        {/* 🛒 Buy Button */}
                        <div className="flex gap-3 pt-2">
                            <a
                                href={product.affiliateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-green-600 text-white text-center py-3 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-4 h-4 text-white" />
                                <p className="text-white">Buy Now</p>
                            </a>
                        </div>
                    </div>
                </div>

                {/* ⚙️ Specifications Section */}
                {product.specifications && product.specifications.length > 0 && (
                    <div className="mt-12 border-t pt-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Specifications
                        </h2>
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {product.specifications.map((spec, idx) => (
                                    <div
                                        key={idx}
                                        className="flex justify-between py-2 border-b border-gray-200 last:border-0"
                                    >
                                        <span className="text-sm font-medium text-gray-700">{spec.key}</span>
                                        <span className="text-sm text-gray-600">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
