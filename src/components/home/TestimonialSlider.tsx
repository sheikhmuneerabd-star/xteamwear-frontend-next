"use client";

import Image, { type StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import bluebg from "@/assets/SlideImages/blueBackground.jpg";
import dads from "@/assets/SlideImages/dads.jpg";
import childrens from "@/assets/SlideImages/children.jpg";
import shirt29 from "@/assets/SlideImages/shirt29.jpg";

const images: StaticImageData[] = [bluebg, dads, childrens, shirt29];

export default function TestimonialSlider() {
  const handleSwiperInit = (swiper: SwiperType) => {
    if (swiper.navigation?.nextEl) {
      (swiper.navigation.nextEl as HTMLElement).style.color = "lightgray";
    }
    if (swiper.navigation?.prevEl) {
      (swiper.navigation.prevEl as HTMLElement).style.color = "lightgray";
    }
  };

  return (
    <div className="md:flex-row flex flex-col gap-8 justify-center max-w-6xl mx-auto lg:px-0 px-5 py-10">
      <div className="bg-[#e8e1db] p-8 rounded-3xl lg:w-[350px] md:w-[370px] sm:w-[320px] w-full relative">
        <p className="text-5xl text-amber-700">&ldquo;</p>

        <div className="flex text-orange-400 my-3">⭐⭐⭐⭐⭐</div>

        <p className="text-gray-700">
          We had a last-minute player transfer just days before our jerseys
          were supposed to ship! Amazing service and fast delivery.
        </p>

        <p className="mt-4 font-semibold">Karen G.</p>
      </div>

      <div className="md:w-[70%] w-full">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={2.2}
          navigation
          pagination={{ clickable: true }}
          loop
          onSwiper={handleSwiperInit}
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <Image
                src={img}
                alt={`Customer team photo ${i + 1}`}
                className="rounded-3xl h-[320px] w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}