"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import TeamBackgroundImage from "@/assets/3manTeam.jpg";
import TeamImageScr from "@/assets/teamImageScr.webp";

gsap.registerPlugin(ScrollTrigger);

export default function TeamImage() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const animation = gsap.to(imgRef.current, {
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  return (
    <div>
      <div className="h-[95vh] relative overflow-hidden hidden xl:flex">
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            ref={imgRef}
            className="object-cover"
            src={TeamBackgroundImage}
            alt="Team of soccer players wearing custom Xteamwear jerseys"
            fill
            priority
            sizes="100vw"
          />
          <div className="w-[46%] flex flex-col items-center gap-6 absolute top-[78px] right-[10%] z-10">
            <h1 className="font-medium text-white border-b w-fit">
              CREATE TEAM UNIFORMS
            </h1>
            <span className="font-bold text-[30px] text-center text-white">
              Trusted by more than 1 million teams worldwide | Focusing on
              customized jerseys for 10 years
            </span>
            <p className="text-white text-sm font-medium">
              「2-3 days for sample → 6-14 days for quick delivery | Minimum
              order quantity: 1 set」
            </p>
            <button className="border-[2px] rounded text-white text-sm px-7 mt-2 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 font-medium transition-all duration-200 cursor-pointer hover:-translate-y-2 py-3 border-white">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>

      <div className="relative xl:hidden block">
        <Image
          className="w-full h-auto"
          src={TeamImageScr}
          alt="Team of soccer players wearing custom Xteamwear jerseys"
          priority
        />
        <div className="lg:w-[60%] w-[87%] flex flex-col items-center gap-4 absolute bottom-[120px] lg:right-[200px] md:right-[50px] right-[23px]">
          <h1 className="font-medium text-white w-fit">
            CREATE TEAM UNIFORMS
          </h1>
          <span className="font-medium lg:text-[20px] md:text-[25px] text-[20px] text-center text-white">
            Trusted by more than 1 million teams worldwide | Focusing on
            customized jerseys for 10 years
          </span>
          <p className="text-white text-sm font-medium">
            「2-3 days for sample → 6-14 days for quick delivery | Minimum
            order quantity: 1 set」
          </p>
          <button className="border-[2px] rounded text-white text-sm px-7 mt-2 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 font-medium transition-all duration-200 hover:-translate-y-2 py-3 border-white">
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  );
}