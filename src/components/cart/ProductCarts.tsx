"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

import cartsProduct from "@/data/cartsProduct";
import Carts from "./Carts"; // Agar aapka Homepage Card ka alag component hai (e.g. HomepageCard), to use yahan import karen
import { useSafeScrollFade } from "@/lib/useSafeScrollFade";

export default function ProductCarts() {
  useSafeScrollFade(".bestseller-slide", []);

  return (
    <div className="mt-16">
      <div className="h-[1px] bg-gray-200"></div>
      <h2 className="font-extrabold text-2xl mt-6 tracking-wide text-gray-900 uppercase">
        BEST SELLERS
      </h2>

      <div className="mt-6 relative group/swiper">
        {/* Navigation Arrows */}
        <button
          type="button"
          aria-label="Previous Slide"
          className="custom-pre absolute -left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer bg-white/90 hover:bg-white text-gray-800 shadow-lg w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 transition-all duration-200 hover:scale-110"
        >
          <MdOutlineArrowBackIos className="ml-1 text-sm" />
        </button>

        <button
          type="button"
          aria-label="Next Slide"
          className="custom-nex absolute -right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer bg-white/90 hover:bg-white text-gray-800 shadow-lg w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 transition-all duration-200 hover:scale-110"
        >
          <MdOutlineArrowForwardIos className="text-sm" />
        </button>

        <Swiper
          modules={[Navigation]}
          className="pb-8"
          spaceBetween={20}
          slidesPerView={4}
          slidesPerGroup={4}
          navigation={{ nextEl: ".custom-nex", prevEl: ".custom-pre" }}
          breakpoints={{
            0: { slidesPerView: 1, slidesPerGroup: 1 },
            480: { slidesPerView: 2, slidesPerGroup: 2 },
            768: { slidesPerView: 3, slidesPerGroup: 3 },
            1024: { slidesPerView: 4, slidesPerGroup: 4 },
          }}
          loop
          speed={700}
        >
          {cartsProduct.map((shirt) => (
            <SwiperSlide key={shirt.id} className="bestseller-slide py-2">
              <Carts shirt={shirt} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}