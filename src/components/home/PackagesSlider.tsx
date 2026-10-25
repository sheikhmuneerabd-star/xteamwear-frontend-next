"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { HiChevronLeft, HiChevronRight, HiXMark } from "react-icons/hi2";

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
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Swipe detection (slider + lightbox dono ke liye)
  const touchStartX = useRef<number | null>(null);
  const touchMoved = useRef(false);

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
      banners.length ? (prev === banners.length - 1 ? 0 : prev + 1) : 0
    );
  }, [banners.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) =>
      banners.length ? (prev === 0 ? banners.length - 1 : prev - 1) : 0
    );
  }, [banners.length]);

  // Auto slide (lightbox khula ho to pause)
  useEffect(() => {
    if (banners.length < 2 || lightboxOpen) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [handleNext, banners.length, lightboxOpen]);

  // Scroll lock + keyboard (Esc / arrows)
  useEffect(() => {
    if (!lightboxOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, handleNext, handlePrev]);

  // Slider par tap vs swipe farq karne ke liye
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchMoved.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    if (Math.abs(e.touches[0].clientX - touchStartX.current) > 10) {
      touchMoved.current = true;
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      diff < 0 ? handleNext() : handlePrev();
    }
    touchStartX.current = null;
  };

  // Sirf mobile/tablet par (lg se neeche) lightbox khule
  const handleBannerClick = () => {
    if (touchMoved.current) return; // swipe tha, tap nahi
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    setLightboxOpen(true);
  };

  if (loading || banners.length === 0) return null;

  const current = banners[currentIndex];

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
            <span className="text-amber-500">Team Package Bundles</span>
          </h2>

          <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
            All-inclusive customized uniform packages crafted at
            factory-direct rates.
          </p>
        </div>

        {/* Slider */}
        <div
          className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 bg-white lg:cursor-default cursor-zoom-in"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={handleBannerClick}
        >
          <div
            className="flex w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
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
                    srcSet={banner.imageTablet || banner.imageDesktop}
                  />
                  <img
                    src={banner.imageMobile || banner.imageDesktop}
                    alt={banner.title || `Package Banner ${idx + 1}`}
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                </picture>
              </div>
            ))}
          </div>

          {/* Previous Button */}
          <button
            type="button"
            aria-label="Previous Slide"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 cursor-pointer top-1/2 -translate-y-1/2 z-10 w-9 h-12 sm:w-11 sm:h-16 bg-slate-900/40 hover:bg-slate-900/80 text-white flex items-center justify-center transition-all duration-200 rounded-lg backdrop-blur-sm"
          >
            <HiChevronLeft className="text-xl sm:text-2xl" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            aria-label="Next Slide"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === index
                    ? "w-6 bg-amber-500"
                    : "w-2 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile hint */}
        <p className="lg:hidden text-center text-[11px] text-slate-400 -mt-2">
          Tap on the banner to view full size
        </p>
      </div>

      {/* Mobile Lightbox */}
      {lightboxOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[9999] bg-black/95 flex flex-col"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <span className="text-sm font-semibold truncate pr-4">
              {current.title || `Package ${currentIndex + 1}`}
              <span className="ml-2 text-white/50 font-normal">
                {currentIndex + 1}/{banners.length}
              </span>
            </span>
            <button
              type="button"
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
              className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm"
            >
              <HiXMark className="text-2xl" />
            </button>
          </div>

          {/* Zoomable image area:
              overflow-auto + touch-action pinch-zoom => user pinch karke zoom aur drag kar sakta hai */}
          <div
            className="flex-1 overflow-auto flex items-center justify-center"
            style={{ touchAction: "pan-x pan-y pinch-zoom" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={currentIndex}
              src={current.imageMobile || current.imageDesktop}
              alt={current.title || `Package Banner ${currentIndex + 1}`}
              className="w-full h-auto max-h-full object-contain"
              draggable={false}
            />
          </div>

          {/* Bottom controls */}
          <div className="flex items-center justify-center gap-6 py-4">
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="w-12 h-12 rounded-full bg-white/15 text-white flex items-center justify-center backdrop-blur-sm"
            >
              <HiChevronLeft className="text-2xl" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="w-12 h-12 rounded-full bg-white/15 text-white flex items-center justify-center backdrop-blur-sm"
            >
              <HiChevronRight className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}