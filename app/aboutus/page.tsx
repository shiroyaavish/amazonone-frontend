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
        DealMitra is built to make online shopping smarter, more affordable, and
        completely hassle-free for every Indian shopper.
      </p>

      {/* Section 1 - Story */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Our Story</h2>
        <p className="text-gray-700 leading-relaxed">
          DealMitra began with a simple idea — to help users shop online with
          confidence. Instead of spending hours comparing products across
          websites, we wanted to create a trusted platform where buyers can
          discover the right products with transparency and value.
        </p>
      </section>

      {/* Section 2 - What We Offer */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">What We Offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border rounded-xl p-6 bg-gray-50 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Wide Product Range</h3>
            <p className="text-gray-600">
              Explore thousands of products across multiple categories.
            </p>
          </div>
          <div className="border rounded-xl p-6 bg-gray-50 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Smart Shopping Tools</h3>
            <p className="text-gray-600">
              From AI product comparison to trending picks and buying guides.
            </p>
          </div>
          <div className="border rounded-xl p-6 bg-gray-50 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Trusted Information</h3>
            <p className="text-gray-600">
              Honest and transparent product details to help you decide better.
            </p>
          </div>
          <div className="border rounded-xl p-6 bg-gray-50 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Better Prices</h3>
            <p className="text-gray-600">
              Get the best deals available without endless searching.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 - Mission & Values */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Our Mission & Values</h2>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to simplify online shopping and help customers make
          smarter, more confident purchasing decisions.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><b>Transparency</b> — Honest and accurate product information.</li>
          <li><b>Customer-First</b> — You always come before sales.</li>
          <li><b>Integrity</b> — Ethical, unbiased and fair at every step.</li>
          <li><b>Innovation</b> — We constantly build smarter shopping tools.</li>
        </ul>
      </section>

      {/* Section 4 - Why Choose Us */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Why Choose DealMitra?</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Top picks curated by experts & smart algorithms</li>
          <li>Better prices and honest comparison before buying</li>
          <li>User-friendly, clean, and mobile-first experience</li>
          <li>A platform made for the Indian audience</li>
        </ul>
      </section>

      {/* Final CTA Box */}
      <section className="bg-blue-50 p-8 text-center rounded-xl space-y-4">
        <h3 className="text-2xl font-semibold text-blue-700">
          We're happy to have you here 🤝
        </h3>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Explore products, compare smartly using AI and enjoy shopping like never before.
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
