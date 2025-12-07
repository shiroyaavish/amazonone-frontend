"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useBannerStore } from "@/store/userBannerStore";

interface Banner {
  _id: string;
  title: string;
  subtitle: string;
  media: string;
  type: "image" | "video";
  url: string;
  isActive: boolean;
}

export default function Hero() {
  const router = useRouter();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [current, setCurrent] = useState<number>(0);

  const { banners, loading, fetchBanners } = useBannerStore();

  useEffect(() => {
    if (banners.length === 0) fetchBanners();
  }, [banners.length, fetchBanners]);

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    videoRefs.current.forEach((vid, index) => {
      if (vid) {
        if (index === current) {
          vid.currentTime = 0;
          vid.play().catch(() => { });
        } else {
          vid.pause();
        }
      }
    });
  }, [current]);

  const handleRedirect = (url: string) => {
    if (url.startsWith("http")) {
      window.open(url, "_blank");
      return;
    }
    router.push(url);
  };

  if (loading)
    return (
      <div className="min-h-[480px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (banners.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl mt-6">
      {/* Slider container */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner, i) => (
          <div
            key={banner._id}
            onClick={() => handleRedirect(banner.url)}
            className="w-full shrink-0 relative cursor-pointer
            h-60 sm:h-80 md:h-[400px] lg:h-[480px] bg-black rounded-2xl"
          >
            {/* Image / Video without cropping */}
            {banner.type === "video" ? (
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                src={banner.media}
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-fill sm:object-contain bg-black rounded-2xl"
              />
            ) : (
              <img
                src={banner.media}
                alt={banner.title}
                className="w-full h-full object-fill xs:object-contain bg-black rounded-2xl"
              />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent rounded-2xl"></div>

            {/* Text */}
            <div className="absolute bottom-8 sm:bottom-12 left-5 sm:left-10 text-white max-w-xl">
              <h1 className="text-2xl sm:text-4xl font-bold drop-shadow-lg">
                {banner.title}
              </h1>
              <p className="mt-2 text-sm sm:text-base opacity-90">
                {banner.subtitle}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRedirect(banner.url);
                }}
                className="mt-4 px-5 py-2 bg-white/10 backdrop-blur-sm border border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
              >
                Learn More →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex space-x-3">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${current === i ? "bg-white" : "bg-gray-400/60"
              }`}
          ></button>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
        }
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/30 rounded-full items-center justify-center hover:bg-white/70 transition"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      <button
        onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
        className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/30 rounded-full items-center justify-center hover:bg-white/70 transition"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}