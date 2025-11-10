import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Product {
    _id: string;
    slug: string;
    title: string;
    brand: string;
    imageUrls: string[];
    price: { current: number; original: number };
}

export default function ProductCard({ product }: { product: Product }) {
    const [isLiked, setIsLiked] = useState(false);

    const discount = Math.round(
        ((product.price.original - product.price.current) / product.price.original) * 100
    );

    const handleLikeToggle = () => {
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

    useEffect(() => {
        const likedItems: string[] = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setIsLiked(likedItems.includes(product._id));
    }, [product._id]);

    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-xl">
            <Link href={`/product/${product.slug}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img
                        src={product.imageUrls?.[0]}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {discount > 0 && (
                        <div className="absolute top-3 left-3">
                            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-md">
                                {discount}% OFF
                            </span>
                        </div>
                    )}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleLikeToggle();
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
                </div>
            </Link>
        </div>
    );
}
