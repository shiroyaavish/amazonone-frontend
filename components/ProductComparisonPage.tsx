"use client";
import { useCompareStore } from "@/store/useCompareStore";
import { X, Plus, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import AdBanner from "@/components/AdBanner";

export default function ProductComparisonPage() {
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
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-14">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-slate-900">
            AI Product Comparison
          </h1>
          <p className="text-slate-600 mt-3 text-lg">
            Compare multiple products instantly — specs, pros, cons & best choice.
          </p>
        </div>

        {/* HOW TO USE TRACKER */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10 text-center">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <p className="text-slate-500 text-xs mb-2">STEP 1</p>
            <p className="font-medium text-slate-800">Enter product names</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <p className="text-slate-500 text-xs mb-2">STEP 2</p>
            <p className="font-medium text-slate-800">Click Compare</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <p className="text-slate-500 text-xs mb-2">STEP 3</p>
            <p className="font-medium text-slate-800">
              View detailed comparison table
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden p-8">

          {/* Product Inputs */}
          <div className="space-y-4 mb-8">
            {products.map((val, index) => (
              <div
                key={index}
                className="relative group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all px-4 py-3"
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

          {/* Add Product Button */}
          {products.length < 5 && (
            <button
              onClick={() => addProduct("")}
              className="w-full py-2.5 border border-slate-300 rounded-xl text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition font-medium flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add product
            </button>
          )}

          {/* Error */}
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
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-lg font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
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
                You must enter at least 2 products
              </p>
            )}
          </div>

          {/* Google Ad */}
          {showAd && (
            <div className="mt-6">
              <AdBanner />
            </div>
          )}
        </div>

        {/* Results */}
        {resultHtml && (
          <div className="mt-10 bg-white rounded-2xl shadow-md border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              🔍 Comparison Results
            </h2>

            <div className="overflow-auto max-h-[550px] border border-slate-300 rounded-lg bg-white shadow-inner p-2">
              <div
                className="prose prose-slate max-w-none [&_table]:w-full [&_th]:bg-slate-100 [&_td]:p-3 [&_th]:p-3 [&_tr:nth-child(even)_td]:bg-slate-50"
                dangerouslySetInnerHTML={{ __html: resultHtml }}
              />
            </div>
          </div>
        )}

        {/* SEO Section */}
        <div className="mt-16 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How this tool works</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            This AI Product Comparison Tool helps you compare two or more products
            instantly. Simply enter the names of the items and our AI analyzes
            available specifications, features, performance scores, reviews, pros
            and cons — then recommends the best option for you.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Perfect for comparing:
          </h3>
          <div className="grid sm:grid-cols-2 gap-2 text-slate-700">
            <p>• Smartphones / iPhones</p>
            <p>• Laptops / Tablets / PC</p>
            <p>• Earbuds / Headphones / Speakers</p>
            <p>• Smartwatches / Fitness Bands</p>
            <p>• TVs / Cameras / Gaming devices</p>
            <p>• Home & kitchen appliances</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-10">
          🚀 Powered by AI — Comparison accuracy may vary based on data availability
        </p>
      </div>
    </div>
  );
}
