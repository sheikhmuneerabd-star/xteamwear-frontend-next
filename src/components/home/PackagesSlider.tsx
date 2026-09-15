"use client";

import { useState, useEffect, useCallback } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface PackageBanner {
  title: string;
  imageDesktop: string;
  imageTablet: string;
  imageMobile: string;
}

export default function PackagesSlider() {
  const [banners, setBanners] = useState<PackageBanner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();

        setBanners(
          data?.settings?.packageBanners?.filter(
            (b: PackageBanner) => b.imageDesktop
          ) || []
        );
      } catch (err) {
        console.error("Failed to load package banners", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) =>
      banners.length
        ? prev === banners.length - 1
          ? 0
          : prev + 1
        : 0
    );
  }, [banners.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) =>
      banners.length
        ? prev === 0
          ? banners.length - 1
          : prev - 1
        : 0
    );
  }, [banners.length]);

  useEffect(() => {
    if (banners.length < 2) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [handleNext, banners.length]);

  if (loading || banners.length === 0) return null;

  return (
    <section className="relative w-full bg-slate-50 py-8 overflow-hidden select-none">
      <div className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
            <span>Exclusive Deals</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900 leading-snug">
            Save Big On{" "}
            <span className="text-amber-500">
              Team Package Bundles
            </span>
          </h2>

          <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
            All-inclusive customized uniform packages crafted at
            factory-direct rates.
          </p>
        </div>

        {/* Slider */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 bg-white">

          <div
            className="flex w-full h-full transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {banners.map((banner, idx) => (
              <div
                key={idx}
                className="relative w-full h-full shrink-0 flex items-center justify-center"
              >
                <picture className="w-full h-full block">
                  <source
                    media="(min-width: 1024px)"
                    srcSet={banner.imageDesktop}
                  />

                  <source
                    media="(min-width: 640px)"
                    srcSet={
                      banner.imageTablet || banner.imageDesktop
                    }
                  />

                  <img
                    src={
                      banner.imageMobile ||
                      banner.imageDesktop
                    }
                    alt={
                      banner.title ||
                      `Package Banner ${idx + 1}`
                    }
                    className="w-full h-full object-contain"
                  />
                </picture>
              </div>
            ))}
          </div>

          {/* Previous Button */}
          <button
            type="button"
            aria-label="Previous Slide"
            onClick={handlePrev}
            className="absolute left-3 cursor-pointer top-1/2 -translate-y-1/2 z-10 w-9 h-12 sm:w-11 sm:h-16 bg-slate-900/40 hover:bg-slate-900/80 text-white flex items-center justify-center transition-all duration-200 rounded-lg backdrop-blur-sm"
          >
            <HiChevronLeft className="text-xl sm:text-2xl" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            aria-label="Next Slide"
            onClick={handleNext}
            className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 z-10 w-9 h-12 sm:w-11 sm:h-16 bg-slate-900/40 hover:bg-slate-900/80 text-white flex items-center justify-center transition-all duration-200 rounded-lg backdrop-blur-sm"
          >
            <HiChevronRight className="text-xl sm:text-2xl" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-slate-900/30 backdrop-blur-md px-3 py-1.5 rounded-full">
            {banners.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === index
                    ? "w-6 bg-amber-500"
                    : "w-2 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}