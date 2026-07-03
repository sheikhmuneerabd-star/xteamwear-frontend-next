"use client";

import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TeamImage from "@/components/home/TeamImage";
import FactoryCard from "@/components/home/FactoryCard";
import ShirtCard from "@/components/home/ShirtCard";
import TestimonialSlider from "@/components/home/TestimonialSlider";
import LatestPostSec from "@/components/home/LatestPostSec";
import LatestCards from "@/components/home/LatestCards";
import shirtData from "@/data/shirtData";

export default function HomePage() {
  const [showMore, setShowMore] = useState(4);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".xteamwearA", {
      y: 60, duration: 0.7, opacity: 0, stagger: 0.2,
      scrollTrigger: { trigger: ".xteamwearA", scroller: "body", scrub: 2, once: true, start: "top 100%", end: "top 30%" },
    });
    tl.from(".showMore", {
      y: 50, duration: 0.7, opacity: 0, stagger: 0.2,
      scrollTrigger: { trigger: ".showMore", scroller: "body", scrub: 2, once: true, start: "top 100%", end: "top 30%" },
    });
    tl.from(".latestP", {
      y: 50, duration: 0.6, opacity: 0, stagger: 0.2,
      scrollTrigger: { trigger: ".latestP", scroller: "body", scrub: 2, once: true, start: "top 100%", end: "top 30%" },
    });
    tl.from(".latestT", {
      y: 50, duration: 0.6, opacity: 0, stagger: 0.2,
      scrollTrigger: { trigger: ".latestT", scroller: "body", scrub: 2, once: true, start: "top 100%", end: "top 30%" },
    });
  }, []);

  return (
    <div>
      <TeamImage />

      <h3 className="text-center text-2xl font-medium xl:mt-9 mt-5 xteamwearA">
        XTEAMWEAR ADVANTAGES
      </h3>
      <FactoryCard />

      <div className="bg-gray-100">
        <h3 className="ml-[40px] text-2xl font-medium pt-10 pb-8">LATEST HOT PRODUCTS</h3>
        <div className="w-[93.8%] mx-auto">
          <ShirtCard showMore={showMore} />
        </div>
        <div className="flex justify-center pb-10 showMore">
          {showMore < shirtData.length && (
            <button
              type="button"
              onClick={() => setShowMore(showMore + 4)}
              className="bg-white text-center text-[14px] font-medium w-[300px] h-[42px] rounded-md shadow-md mt-10 transition-all duration-200 cursor-pointer hover:border-black border-[1.3px] hover:-translate-y-2"
            >
              SHOW MORE
            </button>
          )}
        </div>
      </div>

      <TestimonialSlider />

      <div className="latest">
        <h1 className="text-center text-2xl font-medium latestP">LATEST POSTS</h1>
        <p className="text-center text-[15px] text-gray-600 font-medium latestT">
          Phasellus lorem malesuada ligula pulvinar cosmo
        </p>
        <LatestPostSec />
        <LatestCards />
      </div>
    </div>
  );
}