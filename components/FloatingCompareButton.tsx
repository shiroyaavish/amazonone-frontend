"use client"
import { useState } from "react";
import { Scale, X, ArrowRight } from "lucide-react";
import { useCompareStore } from "@/store/useCompareStore";
import { useRouter } from "next/navigation";

export default function FloatingCompareButton() {
    const { products, removeProduct, reset } = useCompareStore();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const compareCount = products.length;

    if (compareCount === 0) return null;

    const handleCompare = () => {
        setIsOpen(false);
        router.push("/ai-compare");
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Compact Dropdown */}
                    <div className="absolute bottom-16 right-0 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                        {/* Header */}
                        <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-blue-50">
                            <div className="flex items-center gap-2">
                                <Scale className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-semibold text-gray-900">Compare ({compareCount})</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-gray-200 rounded transition"
                            >
                                <X className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>

                        {/* Product List */}
                        <div className="max-h-48 overflow-y-auto p-2">
                            {products.map((productTitle, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between gap-2 p-2 hover:bg-gray-50 rounded transition group"
                                >
                                    <p className="text-xs text-gray-700 line-clamp-1 flex-1">
                                        {productTitle}
                                    </p>
                                    <button
                                        onClick={() => removeProduct(index)}
                                        className=" p-1 hover:bg-red-100 rounded transition"
                                    >
                                        <X className="w-3 h-3 text-red-500" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="p-2 border-t border-gray-200 space-y-1">
                            <button
                                onClick={handleCompare}
                                disabled={compareCount < 2}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-xs font-semibold py-2 rounded transition flex items-center justify-center gap-1"
                            >
                                Compare Now
                                <ArrowRight className="w-3 h-3" />
                            </button>
                            <button
                                onClick={() => {
                                    reset();
                                    setIsOpen(false);
                                }}
                                className="w-full text-xs text-red-600 hover:bg-red-50 py-1 rounded transition"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all relative"
            >
                <Scale className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {compareCount}
                </span>
            </button>
        </div>
    );
}