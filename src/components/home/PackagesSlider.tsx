"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const packageBanners = [
  {
    id: 1,
    title: "Soccer Packages",
    image: "/home images/first package.jpeg",
  },
  {
    id: 2,
    title: "Volleyball Packages",
    image: "/home images/2nd package.jpeg",
  },
  {
    id: 3,
    title: "Football Packages",
    image: "/home images/3rd package.jpeg",
  },
];

export default function PackagesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === packageBanners.length - 1 ? 0 : prev + 1));
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? packageBanners.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section className="relative w-full bg-slate-50 py-8 overflow-hidden select-none">
      <div className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Improved Heading & Header Container */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
            <span>Exclusive Deals</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900 leading-snug">
            Save Big On <span className="text-amber-500">Team Package Bundles</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
            All-inclusive customized uniform packages crafted at factory-direct rates.
          </p>
        </div>

        {/* Banner Container */}
        <div className="relative w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[320px] rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 bg-white">
          
          {/* Images Slider Track */}
          <div
            className="flex w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {packageBanners.map((banner) => (
              <div
                key={banner.id}
                className="relative w-full h-full shrink-0"
              >
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  priority={banner.id === 1}
                  className="object-contain md:object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            aria-label="Previous Slide"
            onClick={handlePrev}
            className="absolute left-3 cursor-pointer top-1/2 -translate-y-1/2 z-10 w-9 h-12 sm:w-11 sm:h-16 bg-slate-900/40 hover:bg-slate-900/80 text-white flex items-center justify-center transition-all duration-200 rounded-lg backdrop-blur-sm"
          >
            <HiChevronLeft className="text-xl sm:text-2xl" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            aria-label="Next Slide"
            onClick={handleNext}
            className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 z-10 w-9 h-12 sm:w-11 sm:h-16 bg-slate-900/40 hover:bg-slate-900/80 text-white flex items-center justify-center transition-all duration-200 rounded-lg backdrop-blur-sm"
          >
            <HiChevronRight className="text-xl sm:text-2xl" />
          </button>

          {/* Bottom Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-slate-900/30 backdrop-blur-md px-3 py-1.5 rounded-full">
            {packageBanners.map((_, index) => (
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