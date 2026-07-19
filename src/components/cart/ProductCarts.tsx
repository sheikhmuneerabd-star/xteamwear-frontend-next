"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

import cartsProduct from "@/data/cartsProduct";
import Carts from "./Carts";
import { useSafeScrollFade } from "@/lib/useSafeScrollFade";

export default function ProductCarts() {
  useSafeScrollFade(".bestseller-slide", []);

  return (
    <div className="mt-16">
      <div className="h-[1px] border"></div>
      <h2 className="font-semibold text-xl mt-6">BEST SELLERS</h2>
      <div className="mt-6 relative">
        <div className="custom-pre absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full">
          <MdOutlineArrowBackIos />
        </div>
        <div className="custom-nex absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full">
          <MdOutlineArrowForwardIos />
        </div>

        <Swiper
          modules={[Navigation]}
          className="pb-10"
          spaceBetween={16}
          slidesPerView={4}
          slidesPerGroup={4}
          navigation={{ nextEl: ".custom-nex", prevEl: ".custom-pre" }}
          breakpoints={{
            0: { slidesPerView: 1, slidesPerGroup: 1 },
            375: { slidesPerView: 2, slidesPerGroup: 2 },
            768: { slidesPerView: 3, slidesPerGroup: 3 },
            1024: { slidesPerView: 4, slidesPerGroup: 4 },
          }}
          loop
          speed={700}
        >
          {cartsProduct.map((shirt) => (
            <SwiperSlide key={shirt.id} className="bestseller-slide">
              <Carts shirt={shirt} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}