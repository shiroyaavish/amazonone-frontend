export const dynamic = "force-static";

export default function AboutUsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center">
        About <span className="text-blue-600">DealMitra</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
        At DealMitra, we want to make online shopping simple, smart, and budget-friendly
        for every Indian shopper — no confusion, no endless scrolling, just clear choices.
      </p>

      {/* Section 1 - Story */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Our Story</h2>
        <p className="text-gray-700 leading-relaxed">
          DealMitra started with a simple thought — <b>shopping online shouldn’t feel overwhelming.</b>
          With thousands of products, confusing specs, and different prices everywhere, we saw how
          easy it was for shoppers to feel lost.
        </p>
        <p className="text-gray-700 leading-relaxed">
          So we created DealMitra, a friendly “mitra” (friend) that helps you compare products easily
          and find exactly what fits your needs — without wasting hours researching.
        </p>
      </section>

      {/* Section 2 - What We Offer */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">What We Offer</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div className="border rounded-xl p-6 bg-gray-50 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Wide Product Range</h3>
            <p className="text-gray-600">
              Browse thousands of products across categories — all in one place.
            </p>
          </div>

          <div className="border rounded-xl p-6 bg-gray-50 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Smart Shopping Tools</h3>
            <p className="text-gray-600">
              AI-powered comparisons, trending picks, and helpful guides make choosing easier.
            </p>
          </div>

          <div className="border rounded-xl p-6 bg-gray-50 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Honest & Clear Information</h3>
            <p className="text-gray-600">
              No confusion — just simple and transparent product details.
            </p>
          </div>

          <div className="border rounded-xl p-6 bg-gray-50 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Better Prices</h3>
            <p className="text-gray-600">
              We help you find the best available deals without searching everywhere.
            </p>
          </div>

        </div>
      </section>

      {/* Section 3 - Mission & Values */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Our Mission & Values</h2>
        <p className="text-gray-700 leading-relaxed">
          Our mission is simple — <b>make online shopping effortless and trustworthy.</b>
          We want every user to feel confident and informed before clicking “Buy Now.”
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <b>Transparency</b> — We present straightforward and honest product info.
          </li>
          <li>
            <b>Customer-First</b> — Every feature we build is designed with YOU in mind.
          </li>
          <li>
            <b>Integrity</b> — We stay unbiased, honest, and fair.
          </li>
          <li>
            <b>Innovation</b> — We keep improving with smarter tools and better features.
          </li>
        </ul>
      </section>

      {/* Section 4 - Why Choose Us */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Why Choose DealMitra?</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Expert and AI-powered recommendations tailored for Indian shoppers</li>
          <li>Simple, honest product comparisons without hidden agendas</li>
          <li>Fast, clean, and user-friendly browsing experience</li>
          <li>A platform built specifically for Indian needs and preferences</li>
        </ul>
      </section>

      {/* Final CTA Box */}
      <section className="bg-blue-50 p-8 text-center rounded-xl space-y-4">
        <h3 className="text-2xl font-semibold text-blue-700">
          We're happy to have you here 🤝
        </h3>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Explore our tools, compare products smartly with AI, and enjoy a simpler,
          more confident shopping experience with DealMitra.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition"
        >
          Start Shopping Now
        </a>
      </section>
    </div>
  );
}