"use client"
import { useCompareStore } from "@/store/useCompareStore";
import { X, Plus, ArrowRight, Loader2 } from 'lucide-react';

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

  const canCompare = products.filter(p => p.trim()).length >= 2;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Compare Products
          </h1>
          <p className="text-slate-600">
            Add products below and let AI analyze the differences
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8">
            {/* Product Inputs */}
            <div className="space-y-3 mb-6">
              {products.map((val, index) => (
                <div
                  key={index}
                  className="group relative flex items-center gap-3 transition-all"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-medium text-slate-600">
                    {index + 1}
                  </div>

                  <input
                    type="text"
                    value={val}
                    onChange={(e) => updateProduct(index, e.target.value)}
                    placeholder={`Enter product ${index + 1} name`}
                    className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                  />

                  {products.length > 2 && (
                    <button
                      onClick={() => removeProduct(index)}
                      className="shrink-0 w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
                      aria-label="Remove product"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Product Button */}
            {products.length < 5 && (
              <button
                onClick={(e) => addProduct("")}
                className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add another product
              </button>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Compare Button */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <button
                onClick={compareProducts}
                disabled={loading || !canCompare}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Compare Products
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {!canCompare && !loading && (
                <p className="text-center text-sm text-slate-500 mt-2">
                  Add at least 2 products to compare
                </p>
              )}
            </div>
          </div>

          {/* Results Section */}
          {resultHtml && (
            <div className="border-t border-slate-200 bg-slate-50/50">
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Comparison Results
                  </h2>
                </div>

                {/* Scrollable container */}
                <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 overflow-scroll">
                  <div
                    className="
            overflow-auto
            max-h-[500px]
            border border-slate-300
            rounded-lg
            shadow-sm
            [&_table]:w-full
            [&_th]:bg-slate-100
            [&_td]:p-3
            [&_th]:p-3
            [&_tr:nth-child(even)_td]:bg-slate-50
          "
                    dangerouslySetInnerHTML={{ __html: resultHtml }}
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Powered by AI • Results may vary based on available data
        </p>
      </div>
    </div>
  );
}