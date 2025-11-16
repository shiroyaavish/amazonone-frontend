"use client";
import { useHomeStore } from "@/store/useHomeStore";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const { categories } = useHomeStore();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16 text-gray-700">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-14">

          {/* Column 1 */}
          <div>
            <Link
              href="/"
              className="font-[Poppins] font-extrabold text-black select-none tracking-[0.20em]
                text-xl sm:text-2xl lg:text-3xl"
            >
              DEALMITRA
            </Link>
            <p className="mt-4 text-sm text-gray-500 leading-6 max-w-xs">
              Discover the latest gadgets, best deals, and trending tech.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-semibold text-base mb-4 text-black">Products</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><Link className="hover:text-black transition" href="/product?isPopular=true">Popular</Link></li>
              <li><Link className="hover:text-black transition" href="/product?newRelease=true">New Releases</Link></li>
              <li><Link className="hover:text-black transition" href="/product?bestSeller=true">Best Seller</Link></li>
              {categories.map((category) => (
                <li key={category._id}>
                  <Link className="hover:text-black transition" href={`/product?category=${category._id}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-semibold text-base mb-4 text-black">Contact Info</h4>
            <p className="text-sm text-gray-600 leading-6 space-y-1">
              <span>dealmitra1111@gmail.com</span><br />
              {/* <span>+91 98765 43210</span> */}
            </p>
          </div>

          {/* Column 4 - Contact Form */}
          <div>
            <h4 className="font-semibold text-base mb-4 text-black">Contact Us</h4>

            {submitted ? (
              <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200">
                Thank you! Your message has been sent.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black/20 focus:border-black transition"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black/20 focus:border-black transition"
                />

                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black/20 focus:border-black transition"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-black text-white text-sm py-2.5 rounded-lg shadow-sm hover:bg-gray-900 transition"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 text-center text-sm text-gray-400 border-t pt-6">
          © {new Date().getFullYear()} amazonone. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
