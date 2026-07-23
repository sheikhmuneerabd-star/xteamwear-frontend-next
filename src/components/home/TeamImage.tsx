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

  // Premium Skeleton Loader
  if (loading) {
    return (
      <div className="w-full h-[70vh] lg:h-[88vh] bg-slate-900 animate-pulse flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (slides.length === 0) return null;

  return (
    <section className="relative w-full h-[75vh] sm:h-[85vh] lg:h-[90vh] bg-slate-950 font-sans group overflow-hidden">
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
          bulletActiveClass: "!bg-amber-500 !w-8",
          bulletClass: "inline-block w-2.5 h-2.5 bg-white/40 rounded-full transition-all duration-300 cursor-pointer mx-1",
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="w-full h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="relative w-full h-full overflow-hidden">
            {/* Responsive Background Images */}
            <div className="absolute inset-0 w-full h-full">
              <picture>
                <source media="(min-width: 1024px)" srcSet={slide.imageDesktop} />
                <img
                  src={slide.imageMobile || slide.imageDesktop}
                  alt={slide.title || `Bespoke Wear Hero Slide ${i + 1}`}
                  className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                />
              </picture>
              
              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/20" />
            </div>

            {/* Hero Content Layer */}
            <div className="relative z-10 max-w-[1440px] h-full mx-auto px-6 sm:px-12 flex flex-col justify-end pb-16 sm:pb-20 lg:pb-24 text-center lg:text-left">
              <div className="max-w-2xl space-y-4 mx-auto lg:mx-0">
                
                {/* Badge */}
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                  {slide.badge || "NEW SEASON COLLECTION 2026"}
                </span>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
                  {slide.title || "BUILT FOR PERFORMANCE"}
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl font-normal leading-relaxed mx-auto lg:mx-0">
                  {slide.subtitle || "Custom engineered team kits, elite sublimated jerseys, and bespoke sportswear designed for champions."}
                </p>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link
                    href={slide.ctaLink || "/category/all"}
                    className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl shadow-amber-500/10 hover:-translate-y-0.5 text-center"
                  >
                    {slide.ctaText || "SHOP NOW"}
                  </Link>
                  
                  <Link
                    href="/custom-kit"
                    className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 text-center"
                  >
                    DESIGN YOUR KIT
                  </Link>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Controls */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-950/40 hover:bg-amber-500 hover:text-slate-950 border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer shadow-2xl"
      >
        <IoChevronBack className="text-xl" />
      </button>

      <button
        type="button"
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-950/40 hover:bg-amber-500 hover:text-slate-950 border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer shadow-2xl"
      >
        <IoChevronForward className="text-xl" />
      </button>

      {/* Slide Pagination Bullets */}
      <div className="custom-hero-pagination absolute bottom-6 left-0 right-0 z-20 flex justify-center items-center pointer-events-auto" />
    </section>
  );
}