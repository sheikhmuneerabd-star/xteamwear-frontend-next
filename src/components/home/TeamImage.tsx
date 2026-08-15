"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface HeroSlide {
  imageDesktop: string;
  imageMobile: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function HeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        setSlides(data?.settings?.heroSlides || []);
      } catch (err) {
        console.error("Failed to load hero slides", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-70px)] min-h-[420px] bg-slate-900 animate-pulse flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (slides.length === 0) return null;

  return (
    <section className="relative w-full h-[calc(100vh-70px)] xl:mt-0 mt-[56px] max-h-[750px] min-h-[700px] bg-slate-950 font-sans group overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade, Pagination]}
        loop
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        speed={1000}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{
          clickable: true,
          el: ".custom-hero-pagination",
          bulletActiveClass: "!bg-amber-500 !w-6",
          bulletClass:
            "inline-block w-2 h-2 bg-white/40 rounded-full transition-all duration-300 cursor-pointer mx-1",
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="w-full h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="relative w-full h-full overflow-hidden">
            {/* Image Wrapper */}
            <div className="absolute inset-0 w-full h-full">
              <picture className="w-full h-full">
                <source media="(min-width: 640px)" srcSet={slide.imageDesktop} />
                <img
                  src={slide.imageMobile || slide.imageDesktop}
                  alt={slide.title || `Hero Slide ${i + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
            </div>

            {/* Main Content Layer */}
            <div className="relative z-10 max-w-[1440px] h-full mx-auto px-4 sm:px-8 flex flex-col justify-end pb-10 sm:pb-12 text-center lg:text-left">
              <div className="max-w-2xl space-y-2 sm:space-y-3 mx-auto lg:mx-0">
                {/* Badge */}
                <div>
                  <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 border border-amber-500/30 px-3 py-0.5 rounded-full backdrop-blur-md">
                    {slide.badge || "NEW SEASON COLLECTION 2026"}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight uppercase">
                  {slide.title || "BUILT FOR PERFORMANCE"}
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-200 max-w-xl font-normal leading-snug mx-auto lg:mx-0 line-clamp-2 sm:line-clamp-none">
                  {slide.subtitle ||
                    "Custom engineered team kits, elite sublimated jerseys, and bespoke sportswear designed for champions."}
                </p>

                {/* Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3">
                  <Link
                    href={slide.ctaLink || "/category/all"}
                    className="w-full sm:w-auto px-6 py-2.5 sm:py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 shadow-lg text-center"
                  >
                    {slide.ctaText || "SHOP NOW"}
                  </Link>

                  <Link
                    href="/custom-kit"
                    className="w-full sm:w-auto px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs uppercase tracking-widest rounded-lg backdrop-blur-md transition-all duration-300 text-center"
                  >
                    DESIGN YOUR KIT
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Nav Controls */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/40 hover:bg-amber-500 hover:text-slate-950 border border-white/10 text-white items-center justify-center backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        <IoChevronBack className="text-lg" />
      </button>

      <button
        type="button"
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/40 hover:bg-amber-500 hover:text-slate-950 border border-white/10 text-white items-center justify-center backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        <IoChevronForward className="text-lg" />
      </button>

      {/* Dots */}
      <div className="custom-hero-pagination absolute bottom-3 left-0 right-0 z-20 flex justify-center items-center pointer-events-auto" />
    </section>
  );
}