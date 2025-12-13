"use client";

import { ArrowRight, Sparkles, IndianRupee, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomeBanner() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

        {/* Left Content */}
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Compare Products.
            <br />
            <span className="text-blue-600">Find the Best Deals.</span>
            <br />
            Buy Smarter in India 🇮🇳
          </h1>

          <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-700 max-w-xl">
            DealMitra helps you compare products, find the best prices, and buy
            smarter from trusted online stores in India.
          </p>

          {/* Feature List */}
          <div className="mt-5 md:mt-8 space-y-2 md:space-y-3">
            <Feature
              icon={<Search className="w-5 h-5 text-blue-600" />}
              text="Smart AI Product Comparison"
            />
            <Feature
              icon={<IndianRupee className="w-5 h-5 text-green-600" />}
              text="Best Price & Deals Updated Daily"
            />
            <Feature
              icon={<Sparkles className="w-5 h-5 text-orange-500" />}
              text="100% India-Focused Shopping"
            />
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 md:mt-10 flex flex-wrap gap-3 md:gap-4">
            <button
              onClick={() => router.push("/ai-compare")}
              className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Compare Products
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => router.push("/product")}
              className="px-5 py-2.5 md:px-6 md:py-3 rounded-xl border border-gray-300 text-gray-800 font-semibold hover:bg-gray-100 transition"
            >
              View Today’s Deals
            </button>
          </div>
        </div>

        {/* Right Visual (Desktop Only) */}
        <div className="relative hidden md:block">
          <div className="absolute -top-12 -right-12 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-60" />
          <div className="relative bg-white rounded-3xl shadow-xl p-6 border">
            <div className="text-sm text-gray-500 mb-2">
              AI Comparison Preview
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
            <div className="mt-6 bg-blue-50 p-4 rounded-xl text-blue-700 font-semibold text-center">
              Best Price Found ✔
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* Feature Item */
function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-gray-800 font-medium">
      <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white shadow">
        {icon}
      </div>
      <span className="text-sm md:text-base">{text}</span>
    </div>
  );
}
