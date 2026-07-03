"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

interface InfoCard {
  title: string;
  text: string;
}

const infoCards: InfoCard[] = [
  { title: "Free Standard Delivery", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { title: "Secure Shopping", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { title: "Shop With Confidence", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { title: "24/7 Help Center", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
];

export default function LatestCards() {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".swiperClass1", {
      y: 50,
      duration: 0.6,
      opacity: 0,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".swiperClass1",
        scroller: "body",
        scrub: 2,
        once: true,
        start: "top 100%",
        end: "top 30%",
      },
    });
  }, []);

  return (
    <div className="border-t postCard xl:px-[50px] px-[16px]">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2, enabled: true },
          1024: { slidesPerView: 4, enabled: false },
          1440: { slidesPerView: 4, enabled: false },
        }}
      >
        {infoCards.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="xl:p-6 py-12 border swiperClass1">
              <div className="text-center cursor-pointer space-y-2">
                <h2 className="font-medium text-[17px]">{item.title}</h2>
                <p className="md:text-sm text-[13px]">{item.text}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}