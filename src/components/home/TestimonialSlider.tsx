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
      "The sublimation quality on these jerseys is top-tier. Fabric stays breathable during high-intensity games and colors stay vibrant.",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Equipment Director",
    team: "Canberra Youth Academy",
    rating: 5,
    comment:
      "Custom sizing was spot on for all our junior and senior squads. The design tool made full customisation seamless.",
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
    <section className="py-12 bg-slate-50 text-slate-900 font-sans overflow-hidden border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-700 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              <HiCheckBadge className="text-amber-600 text-sm" />
              VERIFIED REVIEWS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">
              TRUSTED BY ATHLETES & COACHES
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous Slide"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm hover:border-amber-500 hover:bg-amber-500 hover:text-slate-950 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <HiChevronLeft className="text-lg" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next Slide"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm hover:border-amber-500 hover:bg-amber-500 hover:text-slate-950 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <HiChevronRight className="text-lg" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          <div className="lg:col-span-5 bg-white border border-slate-200 shadow-sm rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <FaQuoteLeft className="text-3xl text-amber-500/20" />
                <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <HiStar key={i} className="text-amber-500 text-xs" />
                  ))}
                  <span className="text-[11px] font-bold text-amber-800 ml-1">5.0</span>
                </div>
              </div>

              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop
                className="w-full"
              >
                {reviews.map((rev) => (
                  <SwiperSlide key={rev.id}>
                    <div className="space-y-3 py-1">
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal italic">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                      
                      <div className="pt-3 border-t border-slate-100">
                        <h4 className="text-base font-black uppercase text-slate-900 tracking-wide flex items-center gap-1">
                          {rev.name}
                          <HiCheckBadge className="text-amber-600 text-sm" />
                        </h4>
                        <p className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
                          {rev.role} &bull; <span className="text-slate-500">{rev.team}</span>
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <span>Verified Buyer Review</span>
              <span className="text-amber-700">100% Satisfaction</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[Navigation, Autoplay]}
              spaceBetween={16}
              slidesPerView={1.2}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 2.2 },
              }}
              loop
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              className="w-full h-full rounded-2xl"
            >
              {galleryImages.map((item, i) => (
                <SwiperSlide key={i} className="h-full">
                  <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 h-[280px] sm:h-[340px] shadow-sm transition-colors hover:border-amber-500">
                    <Image
                      src={item.src}
                      alt={`Customer team photo ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    <div className="absolute bottom-3 left-3 right-3 z-10 p-2.5 rounded-xl bg-white/90 border border-slate-200 backdrop-blur-md shadow-md">
                      <p className="text-[11px] font-black uppercase text-slate-900 tracking-wider">
                        {item.caption}
                      </p>
                      <p className="text-[9px] text-amber-700 font-semibold uppercase tracking-widest">
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