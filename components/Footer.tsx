import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 text-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-semibold text-green-600">amazonone</h3>
            <p className="mt-2 text-sm text-gray-500">
              Discover the latest gadgets, best deals, and trending tech.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-semibold mb-2">Products</h4>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>Earphones</li>
              <li>Smart Watches</li>
              <li>Headphones</li>
              <li>Shoes</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <p className="text-sm text-gray-500">
              support@amazonone.com <br /> +91 98765 43210
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} amazonone. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
