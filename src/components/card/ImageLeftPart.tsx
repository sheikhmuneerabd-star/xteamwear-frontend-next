"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import type { Product } from "@/types/product";

interface ImageLeftPartProps {
  product: Product;
  selectedColor: string;
}

export default function ImageLeftPart({ product, selectedColor }: ImageLeftPartProps) {
  const selectedVariant =
    product.variants.find(
      (v) => v.color.trim().toLowerCase() === selectedColor.trim().toLowerCase()
    ) || product.variants[0];

  const images = selectedVariant?.images || [];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);

  // Sync image selection when variant color changes
  useEffect(() => {
    setActiveImageIndex(0);
    if (swiperRef) {
      swiperRef.slideTo(0);
    }
  }, [selectedColor, swiperRef]);

  const discount = Math.round(
    ((product.oldPrice - product.newPrice) / product.oldPrice) * 100
  );

  const handleNext = () => {
    if (activeImageIndex < images.length - 1) {
      const newIdx = activeImageIndex + 1;
      setActiveImageIndex(newIdx);
      swiperRef?.slideTo(newIdx);
    }
  };

  const handlePrev = () => {
    if (activeImageIndex > 0) {
      const newIdx = activeImageIndex - 1;
      setActiveImageIndex(newIdx);
      swiperRef?.slideTo(newIdx);
    }
  };

  return (
    <div className="w-full lg:w-[48%] md:w-[45%] md:sticky md:top-6 self-start space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-[4/5] w-full bg-slate-100 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm">
        {images[activeImageIndex] && (
          <Image
            src={images[activeImageIndex]}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
            className="object-cover object-center transition-all duration-300 ease-out"
          />
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-red-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md z-10">
            SAVE {discount}%
          </span>
        )}
      </div>

      {/* Gallery Slider Carousel */}
      <div className="relative px-8">
        <Swiper
          onSwiper={setSwiperRef}
          modules={[Navigation]}
          slidesPerView={4}
          spaceBetween={10}
          onSlideChange={(swiper) => setActiveImageIndex(swiper.activeIndex)}
          breakpoints={{
            320: { slidesPerView: 3, spaceBetween: 8 },
            640: { slidesPerView: 4, spaceBetween: 10 },
          }}
          className="w-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <button
                type="button"
                onClick={() => {
                  setActiveImageIndex(i);
                  swiperRef?.slideTo(i);
                }}
                className={`relative cursor-pointer aspect-square w-full rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  activeImageIndex === i
                    ? "border-amber-500 ring-2 ring-amber-500/20 scale-95"
                    : "border-slate-200 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Previous Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={activeImageIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white border cursor-pointer border-slate-200 shadow-md p-1.5 sm:p-2 rounded-full text-slate-800 transition-all z-20 ${
            activeImageIndex === 0
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-amber-500 hover:text-slate-950 active:scale-90"
          }`}
          aria-label="Previous image"
        >
          <IoIosArrowBack className="text-sm sm:text-base" />
        </button>

        {/* Next Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={activeImageIndex === images.length - 1}
          className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white border cursor-pointer border-slate-200 shadow-md p-1.5 sm:p-2 rounded-full text-slate-800 transition-all z-20 ${
            activeImageIndex === images.length - 1
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-amber-500 hover:text-slate-950 active:scale-90"
          }`}
          aria-label="Next image"
        >
          <IoIosArrowForward className="text-sm sm:text-base" />
        </button>
      </div>
    </div>
  );
}