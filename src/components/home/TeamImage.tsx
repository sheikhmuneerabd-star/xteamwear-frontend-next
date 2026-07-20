"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface HeroSlide {
  imageDesktop: string;
  imageMobile: string;
}

export default function TeamImage() {
  const swiperRef = useRef<SwiperType | null>(null);
  const mobileSwiperRef = useRef<SwiperType | null>(null);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSlides(data.settings.heroSlides || []);
      setLoading(false);
    }
    fetchSettings();
  }, []);

  if (loading || slides.length === 0) {
    return <div className="h-[95vh] bg-gray-200 animate-pulse hidden xl:block" />;
  }

  return (
    <div className="relative group">
      {/* Desktop */}
      <div className="h-[95vh] relative overflow-hidden hidden xl:block">
        <Swiper
          modules={[Navigation, Autoplay, EffectFade]}
          navigation={false}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={900}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="h-full w-full"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="absolute top-0 left-0 w-full h-full">
                <Image
                  className="object-cover"
                  src={slide.imageDesktop}
                  alt={`Hero slide ${i + 1}`}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                />
                <div className="flex flex-col items-center absolute bottom-[80px] left-1/2 -translate-x-1/2 z-10">
                  <button className="border-[2px] rounded text-white text-sm px-7 hover:bg-[#C6FF00] hover:text-[#0B1E3D] hover:border-[#C6FF00] font-medium transition-all duration-200 cursor-pointer hover:-translate-y-2 py-3 border-white">
                    SHOP NOW
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 hover:bg-[#0B1E3D] text-white flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <IoChevronBack className="text-2xl" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 hover:bg-[#0B1E3D] text-white flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <IoChevronForward className="text-2xl" />
        </button>
      </div>

      {/* Mobile */}
      <div className="relative xl:hidden block">
        <Swiper
          modules={[Navigation, Autoplay, EffectFade]}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={900}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          onSwiper={(swiper) => {
            mobileSwiperRef.current = swiper;
          }}
          className="w-full h-auto"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative">
                <Image
                  className="w-full h-auto"
                  src={slide.imageMobile}
                  alt={`Hero slide ${i + 1}`}
                  width={800}
                  height={1000}
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-black/15" />
                <div className="flex flex-col items-center absolute bottom-[60px] left-1/2 -translate-x-1/2 z-10">
                  <button className="border-[2px] rounded text-white text-sm px-7 hover:bg-[#C6FF00] hover:text-[#0B1E3D] hover:border-[#C6FF00] font-medium transition-all duration-200 hover:-translate-y-2 py-3 border-white">
                    SHOP NOW
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => mobileSwiperRef.current?.slidePrev()}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 active:bg-[#0B1E3D] text-white flex items-center justify-center transition-all duration-200"
        >
          <IoChevronBack className="text-xl" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => mobileSwiperRef.current?.slideNext()}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 active:bg-[#0B1E3D] text-white flex items-center justify-center transition-all duration-200"
        >
          <IoChevronForward className="text-xl" />
        </button>
      </div>
    </div>
  );
}