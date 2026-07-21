"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import { HiStar, HiCheckBadge, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { FaQuoteLeft } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Static Imports
import bluebg from "@/assets/SlideImages/blueBackground.jpg";
import dads from "@/assets/SlideImages/dads.jpg";
import childrens from "@/assets/SlideImages/children.jpg";
import shirt29 from "@/assets/SlideImages/shirt29.jpg";

interface Review {
  id: number;
  name: string;
  role: string;
  team: string;
  rating: number;
  comment: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Karen G.",
    role: "Team Manager",
    team: "Metro Strikers FC",
    rating: 5,
    comment:
      "We had a last-minute player transfer just days before our jerseys were supposed to ship! Amazing responsive service and lightning-fast delivery.",
  },
  {
    id: 2,
    name: "Marcus Vance",
    role: "Head Coach",
    team: "Apex Basketball League",
    rating: 5,
    comment:
      "The sublimation quality on these jerseys is top-tier. Fabric stays breathable during high-intensity games and colors stay vibrant after dozens of washes.",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Equipment Director",
    team: "Canberra Youth Academy",
    rating: 5,
    comment:
      "Custom sizing was spot on for all our junior and senior squads. The design tool made full customisation seamless from start to finish.",
  },
];

const galleryImages: { src: StaticImageData; caption: string }[] = [
  { src: bluebg, caption: "Pro Sublimated Match Kit" },
  { src: dads, caption: "Custom Club Tournament Wear" },
  { src: childrens, caption: "Youth Academy Training Gear" },
  { src: shirt29, caption: "Custom Athlete Apparel" },
];

export default function TestimonialSlider() {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <section className="py-20 bg-[#070D18] text-white font-sans overflow-hidden border-t border-slate-800/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full">
              <HiCheckBadge className="text-amber-400 text-sm" />
              VERIFIED TEAM REVIEWS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              TRUSTED BY ATHLETES & COACHES
            </h2>
          </div>

          {/* Custom Slider Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous Slide"
              className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer"
            >
              <HiChevronLeft className="text-xl" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next Slide"
              className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer"
            >
              <HiChevronRight className="text-xl" />
            </button>
          </div>
        </div>

        {/* Main Grid: Reviews Card + Image Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Testimonial Card Slider (4 Columns) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/90 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-md shadow-2xl">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <FaQuoteLeft className="text-4xl text-amber-500/30" />
                
                {/* Rating Stars */}
                <div className="flex items-center gap-1 bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-full">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <HiStar key={i} className="text-amber-400 text-sm" />
                  ))}
                  <span className="text-xs font-bold text-slate-300 ml-1">5.0</span>
                </div>
              </div>

              {/* Dynamic Review Swiper */}
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop
                className="w-full"
              >
                {reviews.map((rev) => (
                  <SwiperSlide key={rev.id}>
                    <div className="space-y-4 py-2">
                      <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal italic">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                      
                      <div className="pt-4 border-t border-slate-800/80">
                        <h4 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-1.5">
                          {rev.name}
                          <HiCheckBadge className="text-amber-400 text-base" />
                        </h4>
                        <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                          {rev.role} &bull; <span className="text-slate-400">{rev.team}</span>
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Bottom Status Tag */}
            <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-slate-500">
              <span>Verified Buyer Review</span>
              <span className="text-amber-500">100% Satisfaction</span>
            </div>
          </div>

          {/* Right Side: Showcase Team Image Carousel (7 Columns) */}
          <div className="lg:col-span-7">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1.2}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 2.2 },
              }}
              loop
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              className="w-full h-full rounded-3xl"
            >
              {galleryImages.map((item, i) => (
                <SwiperSlide key={i} className="h-full">
                  <div className="relative group rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 h-[380px] sm:h-[420px] transition-all duration-500 hover:border-amber-500/50">
                    <Image
                      src={item.src}
                      alt={`Customer team photo ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Bottom Tag */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-xs font-black uppercase text-amber-400 tracking-wider">
                        {item.caption}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-0.5">
                        Custom Sublimated Series
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>

      </div>
    </section>
  );
}