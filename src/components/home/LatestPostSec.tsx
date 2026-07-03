"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import planningImg from "@/assets/latestPostImg/planningImg.webp";
import sportChildrenImg from "@/assets/latestPostImg/sportChildrenImg.webp";

gsap.registerPlugin(ScrollTrigger);

const cards = [{ img: planningImg }, { img: sportChildrenImg }];

export default function LatestPostSec() {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".postPlan", {
      y: 50,
      duration: 0.6,
      opacity: 0,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".postPlan",
        scroller: "body",
        scrub: 2,
        once: true,
        start: "top 100%",
        end: "top 30%",
      },
    });
  }, []);

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const line = e.currentTarget.querySelectorAll(".line");
    gsap.fromTo(
      line,
      { scaleX: 0, transformOrigin: "left", backgroundColor: "black" },
      { scaleX: 1, duration: 0.4, ease: "power2.out", backgroundColor: "black" }
    );
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const line = e.currentTarget.querySelectorAll(".line");
    gsap.to(line, {
      scaleX: 0,
      transformOrigin: "right",
      duration: 0.4,
      ease: "power2.out",
      backgroundColor: "black",
    });
  };

  return (
    <div className="mt-8 postPlan">
      <div className="xl:w-[92%] w-[97%] mx-auto md:flex-row hidden md:flex flex-col justify-between">
        <div className="xl:w-[50%] md:w-[49.2%] border group">
          <div className="overflow-hidden group-hover:-translate-y-3 transition-all duration-500 cursor-pointer">
            <Image
              className="transition-all duration-500 hover:scale-105 w-full h-auto"
              src={planningImg}
              alt="Team planning 2026 summer tournament kits"
            />
          </div>
          <div className="p-5 space-y-3">
            <div className="relative cursor-pointer" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
              <h3 className="font-medium text-[19px] leading-[35px]">
                News: Planing Your 2026 Summer Tournament Kits? Start Now To Beat The Rush!
              </h3>
              <span className="line absolute left-0 top-[34px] h-[2px] w-[99%]"></span>
              <span className="line absolute left-0 top-[64px] h-[2px] w-[29%]"></span>
            </div>
            <p className="text-gray-400 text-sm">AlexWear Feb 02, 2026</p>
            <p className="text-gray-800 text-sm line-clamp-2">
              With the 2026 Spring Season already in motion, Xteamwear is officially opening our early-bird production Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, dolorum!
            </p>
            <p className="text-gray-800 text-sm hover:underline cursor-pointer">View details</p>
          </div>
        </div>

        <div className="xl:w-[50%] md:w-[49.2%] border group">
          <div className="overflow-hidden group-hover:-translate-y-3 transition-all duration-500 cursor-pointer">
            <Image
              className="transition-all duration-500 hover:scale-105 w-full h-auto"
              src={sportChildrenImg}
              alt="Children playing soccer in custom jerseys"
            />
          </div>
          <div className="p-5 space-y-3">
            <div className="relative cursor-pointer" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
              <h3 className="font-medium text-[19px] leading-[35px]">
                News: Planing Your 2026 Summer Tournament Kits? Start Now To Beat The Rush!
              </h3>
              <span className="line absolute left-0 top-[34px] h-[2px] w-[99%]"></span>
              <span className="line absolute left-0 top-[64px] h-[2px] w-[29%]"></span>
            </div>
            <p className="text-gray-400 text-sm">AlexWear Feb 02, 2026</p>
            <p className="text-gray-800 text-sm line-clamp-2">
              With the 2026 Spring Season already in motion, Xteamwear is officially opening our early-bird production Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, dolorum!
            </p>
            <p className="text-gray-800 text-sm hover:underline cursor-pointer">View details</p>
          </div>
        </div>
      </div>

      <div className="md:hidden w-[97%] mx-auto p-2">
        <Swiper modules={[Pagination]} pagination={{ clickable: true }} spaceBetween={16} slidesPerView={1}>
          {cards.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="border">
                <Image src={item.img} alt="Latest post" className="w-full h-auto" />
                <div className="p-5 space-y-3">
                  <h3 className="font-medium text-[19px] leading-[35px]">
                    News: Planing Your 2026 Summer Tournament Kits?
                  </h3>
                  <p className="text-gray-400 text-sm">AlexWear Feb 02, 2026</p>
                  <p className="text-gray-800 text-sm">With the 2026 Spring Season already in motion...</p>
                  <p className="text-gray-800 text-sm underline">View details</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}