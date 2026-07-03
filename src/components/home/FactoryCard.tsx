"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { type StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import imageShirt from "@/assets/factoryCardImage/shirt.webp";
import qsp from "@/assets/factoryCardImage/quick-sample-production.webp";
import osm from "@/assets/factoryCardImage/one-set-minimum.webp";
import wwd from "@/assets/factoryCardImage/world-wide-delivery.webp";
import ed from "@/assets/factoryCardImage/expert-designers.webp";

gsap.registerPlugin(ScrollTrigger);

interface FactoryFeature {
  img: StaticImageData;
  title: string;
}

const features: FactoryFeature[] = [
  { img: imageShirt, title: "Sublimation printing and dyeing . No fading" },
  { img: qsp, title: "Quick sample production in 2-3 days" },
  { img: osm, title: "One-set minimum order for flexibility" },
  { img: wwd, title: "Worldwide delivery . 7-15 days" },
  { img: ed, title: "Expert designers for diverse needs" },
];

export default function FactoryCard() {
  useGSAP(() => {
    ScrollTrigger.batch(".swiper-slide", {
      start: "top 85%",
      once: true,
      onEnter: (elements) => {
        gsap.from(elements, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
        });
      },
    });
  }, []);

  return (
    <div className="p-10 relative">
      <Swiper
        modules={[Navigation]}
        navigation
        observer
        observeParents
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {features.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="border group hover:border-black cursor-pointer transition-all overflow-hidden duration-200 rounded-md space-y-2 text-center">
              <Image
                className="pt-2 hover:scale-105 transition-all duration-700 w-full h-auto"
                src={item.img}
                alt={item.title}
              />
              <div className="pb-2">
                <h2 className="text-[17.5px] group-hover:text-blue-600 transition-all duration-200 group-hover:underline">
                  {item.title}
                </h2>
                <span className="text-gray-700 text-[13px]">
                  Vibrant one-piece molding, washable, high-frequency jerseys
                  stay looking brand new for longer.
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}