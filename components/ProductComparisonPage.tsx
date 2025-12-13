"use client";

import { useCompareStore } from "@/store/useCompareStore";
import { X, Plus, ArrowRight, Loader2, Search } from "lucide-react";
import { use, useState } from "react";
import AdBanner from "@/components/AdBanner";
import { useRouter } from "next/navigation";

export default function ProductComparisonPage() {
  const router = useRouter();
  const {
    products,
    updateProduct,
    addProduct,
    removeProduct,
    resultHtml,
    loading,
    error,
    compareProducts,
  } = useCompareStore();
  const [showAd, setShowAd] = useState(false);
  const canCompare = products.filter((p) => p.trim()).length >= 2;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 pt-10">
      <div className="max-w-5xl mx-auto px-4 pb-20">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            AI Product Comparison Tool
          </h1>
          <p className="text-slate-600 mt-3 text-lg max-w-2xl mx-auto leading-relaxed">
            Type the products you want to compare and let our AI instantly analyse
            specs, performance, price, reviews, pros & cons — all in one beautifully
            structured comparison table. Perfect for finding the right product without
            hours of research.
          </p>
        </div>



        {/* ================= MAIN INPUT CARD ================= */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">

          {/* Input Fields */}
          <h2 className="text-xl font-semibold text-slate-900 mb-5">
            Enter the products you want to compare
          </h2>

          <div className="space-y-4 mb-8">
            {products.map((val, index) => (
              <div
                key={index}
                className="relative flex items-center gap-3 rounded-xl border border-slate-200 
                bg-slate-50 hover:bg-white px-4 py-3 focus-within:ring-2 
                focus-within:ring-blue-500 transition-all"
              >
                <span className="font-semibold text-slate-600">{index + 1}.</span>

                <input
                  type="text"
                  value={val}
                  onChange={(e) => updateProduct(index, e.target.value)}
                  placeholder={`Enter product name ${index + 1}`}
                  className="flex-1 bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                />

                {products.length > 2 && (
                  <button
                    onClick={() => removeProduct(index)}
                    className="text-slate-400 hover:text-red-500 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add More Button */}
          {products.length < 5 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Add Product */}
              <button
                onClick={() => addProduct("")}
                className="w-full py-2.5 border border-slate-300 rounded-xl 
      text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 
      transition font-medium flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add product
              </button>

              {/* Search Product */}
              <button
                onClick={() => router.push("/product")}
                className="w-full py-2.5 border border-slate-300 rounded-xl 
      text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 
      transition font-medium flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search product
              </button>
            </div>
          )}


          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-50 text-red-700 border border-red-200 p-3 text-sm rounded-lg">
              {error}
            </div>
          )}

          {/* Compare Button */}
          <div className="mt-10">
            <button
              onClick={() => {
                setShowAd(true);
                compareProducts();
              }}
              disabled={loading || !canCompare}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 
                disabled:cursor-not-allowed text-white text-lg font-semibold rounded-xl 
                flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Comparing...
                </>
              ) : (
                <>
                  Compare Products
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {!canCompare && !loading && (
              <p className="text-center text-sm text-slate-500 mt-2">
                Enter at least 2 products to begin comparison
              </p>
            )}
          </div>

          {/* Show Ad */}
          {showAd && (
            <div className="mt-8">
              <AdBanner />
            </div>
          )}
        </div>

        {/* ================= HOW TO USE ================= */}
        <div className="grid sm:grid-cols-3 gap-4 mt-14 text-center">
          {[
            { step: "STEP 1", title: "Enter product names", desc: "Example: iPhone 15, Samsung S23" },
            { step: "STEP 2", title: "Click Compare", desc: "AI starts analysing instantly" },
            { step: "STEP 3", title: "View detailed results", desc: "Table, pros, cons & verdict" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow hover:shadow-md transition"
            >
              <p className="text-slate-500 text-xs mb-1">{item.step}</p>
              <p className="font-semibold text-slate-800">{item.title}</p>
              <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ================= RESULTS SECTION ================= */}
        {resultHtml && (
          <div className="mt-12 bg-white rounded-2xl shadow-md border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              🔍 Comparison Results
            </h2>

            <div className="overflow-auto max-h-[600px] border border-slate-300 rounded-lg 
            bg-white shadow-inner p-2">
              <div
                className="prose prose-slate max-w-none 
                [&_table]:w-full [&_th]:bg-slate-100 [&_td]:p-3 [&_th]:p-3 
                [&_tr:nth-child(even)_td]:bg-slate-50"
                dangerouslySetInnerHTML={{ __html: resultHtml }}
              />
            </div>
          </div>
        )}

        {/* ================= HUMANIZED SEO SECTION ================= */}
        <div className="mt-16 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How This AI Comparison Tool Works</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Instead of opening dozens of tabs and checking reviews one by one,
            our AI tool brings everything together in a clean and easy-to-read format.
            It analyses features, specifications, pricing, performance scores,
            long-term reviews, and even user satisfaction trends to help you make
            the best possible decision in seconds.
          </p>

          <p className="text-slate-700 leading-relaxed mb-4">
            Whether you’re comparing two smartphones, laptops, earbuds,
            appliances, or gadgets — this tool helps you save time,
            avoid confusion, and choose confidently.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">What You Can Compare</h3>

          <div className="grid sm:grid-cols-2 gap-3 text-slate-700">
            <p>• Smartphones & iPhones</p>
            <p>• Laptops, Tablets & PCs</p>
            <p>• Earbuds, Headphones & Speakers</p>
            <p>• Smartwatches & Fitness Bands</p>
            <p>• TVs, Cameras & Gaming Consoles</p>
            <p>• Home & Kitchen Appliances</p>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-2">Why users love this tool ❤️</h3>
          <ul className="list-disc ml-6 text-slate-700 space-y-2">
            <li>Saves hours of research time</li>
            <li>Clear & easy-to-read comparison table</li>
            <li>Shows unbiased pros & cons</li>
            <li>Helps find the best value for money</li>
            <li>No technical knowledge required</li>
          </ul>
        </div>

        {/* ================= RELATED IDEAS ================= */}
        <div className="mt-16 bg-blue-50 border border-blue-200 p-6 rounded-xl">
          <h2 className="text-xl font-bold text-blue-900 mb-3">Popular Comparison Ideas</h2>
          <ul className="text-blue-800 space-y-1">
            <li>• iPhone 15 vs Samsung S23</li>
            <li>• Realme 12 Pro vs Redmi Note 13 Pro</li>
            <li>• Boat Airdopes 141 vs Boult Z40</li>
            <li>• HP Victus vs Lenovo IdeaPad Gaming</li>
            <li>• Sony WH-1000XM5 vs Bose 700</li>
          </ul>
        </div>

        {/* ================= FOOTER NOTE ================= */}
        <p className="text-center text-sm text-slate-500 mt-10">
          🚀 Powered by AI — results depend on available online data.
        </p>
      </div>
    </div>
  );
}
