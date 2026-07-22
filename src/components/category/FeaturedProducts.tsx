"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

import cateSlideData from "@/data/featuredData";
import FeaturedProductSlide from "./FeaturedProductSlide";

export default function FeaturedProducts() {
  return (
    <div className="pt-4 border-t border-gray-100 relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-xs tracking-wider text-gray-900 uppercase">
          Featured Products
        </h3>
        <div className="flex items-center gap-1 z-10">
          <button
            type="button"
            className="custom-prev w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 text-xs shadow-xs transition-colors cursor-pointer"
          >
            <MdOutlineArrowBackIos className="ml-0.5" />
          </button>
          <button
            type="button"
            className="custom-next w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 text-xs shadow-xs transition-colors cursor-pointer"
          >
            <MdOutlineArrowForwardIos />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        autoplay={{ delay: 3000, pauseOnMouseEnter: true, disableOnInteraction: false }}
        loop
        speed={600}
      >
        {cateSlideData.map((item) => (
          <SwiperSlide key={item.id}>
            <FeaturedProductSlide item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}