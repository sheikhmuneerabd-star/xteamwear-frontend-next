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
    <div className="p-4 mt-6 relative">
      <div className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-50 cursor-pointer bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full">
        <MdOutlineArrowBackIos />
      </div>
      <div className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-50 cursor-pointer bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full">
        <MdOutlineArrowForwardIos />
      </div>

      <h1 className="font-medium text-[15px] border-b pb-2 border-gray-600">FEATURED PRODUCTS</h1>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        autoplay={{ delay: 2000, pauseOnMouseEnter: true, disableOnInteraction: false }}
        loop
        speed={700}
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