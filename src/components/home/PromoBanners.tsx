"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

interface PromoMainBanner {
  title: string;
  highlight: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  imageMobile: string;
}

interface PromoBottomBanner {
  badge: string;
  title: string;
  tags: string[];
  imageMobile: string;
}

interface PromoBannersData {
  mainBanner: PromoMainBanner;
  bottomBanner: PromoBottomBanner;
}

export default function PromoBanners() {
  const [data, setData] = useState<PromoBannersData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const json = await res.json();
        setData(json?.settings?.promoBanners || null);
      } catch (err) {
        console.error("Failed to load promo banners", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  if (loading || !data) return null;

  const main = data.mainBanner;
  const bottom = data.bottomBanner;

  return (
    <section className="py-6 bg-slate-50 relative mt-[30px]">
      {/* Right Image column (static, hardcoded — pops out above & below the box) */}
      <div className="hidden md:block shrink-0 absolute -top-[182px] lg:-top-[260px] -right-[153] lg:-right-[154] z-50 w-[150px] md:w-[555px] lg:w-[770px]">
        <img
          src="/home images/promo-right-shirt.png"
          alt="Right"
          className="w-full h-[380px] md:h-[520px] lg:h-[620px] object-contain object-bottom drop-shadow-2xl pointer-events-none"
        />
      </div>

      {/* Left Image column (static, hardcoded — pops out above & below the box) */}
      <div className="hidden md:block shrink-0 w-[150px] md:w-[465px] lg:w-[600px] absolute -top-[175] lg:-top-[246px] bottom-[216px] left-[29px] lg:left-[38px] z-[100]">
        <img
          src="/home images/promo-left-shirt.png"
          alt="Left"
          className="w-full h-[380px] md:h-[520px] lg:h-[620px] object-contain object-bottom drop-shadow-2xl pointer-events-none"
        />
      </div>

      <div className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* 🚀 TOP MAIN BANNER */}
        {/* Mobile: image */}
        {main?.imageMobile && (
          <div className="relative rounded-2xl overflow-hidden h-[220px] shadow-lg group border border-slate-200 sm:hidden">
            <img
              src={main.imageMobile}
              alt="Order Online Easily"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 z-10">
              <Link
                href={main.buttonLink || "/custom-order"}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-2xl active:scale-95"
              >
                {main.buttonText || "START CUSTOM ORDER"} <FiArrowRight className="text-sm" />
              </Link>
            </div>
          </div>
        )}

        {/* Desktop/Tablet: coded design */}
        <div className="relative hidden sm:flex rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-gradient-to-br from-[#0B1E3D] via-[#122a52] to-[#1a3568] px-8 md:px-14 py-10 md:py-14 items-center justify-center text-center">
          {/* Decorative diagonal lines */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
            backgroundImage: "repeating-linear-gradient(115deg, transparent, transparent 40px, rgba(245,158,11,0.5) 40px, rgba(245,158,11,0.5) 42px)"
          }} />

          <div className="relative z-[100] max-w-2xl space-y-5">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              {main.title} <span className="text-amber-500">{main.highlight}</span>
            </h2>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-left max-w-lg mx-auto">
              {main.features?.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-white/90 text-xs md:text-sm font-medium">
                  <FiCheckCircle className="text-amber-500 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <Link
              href={main.buttonLink || "/custom-order"}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-3.5 rounded-xl text-sm uppercase tracking-wider transition-all shadow-2xl active:scale-95"
            >
              {main.buttonText || "START CUSTOM ORDER"} <FiArrowRight />
            </Link>
          </div>
        </div>

        {/* 🎯 BOTTOM BOX */}
        <div className="grid grid-cols-1 gap-4">
          {/* Mobile: image */}
          {bottom?.imageMobile && (
            <div className="relative rounded-2xl overflow-hidden h-[200px] shadow-md border border-slate-200 sm:hidden">
              <img
                src={bottom.imageMobile}
                alt={bottom.title || "Schools & Non-Profits Discount"}
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-6 left-6 z-10">
                <Link
                  href={"/getDiscount"}
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-2xl active:scale-95"
                >
                  {"GET YOUR DISCOUNT"} <FiArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
          )}

          {/* Desktop/Tablet: coded design */}
          <div className="relative hidden sm:flex rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-gradient-to-r from-[#0B1E3D] to-[#1a3568]">
            <div className="flex-1 px-6 md:px-10 py-8 md:py-10 flex flex-col justify-center z-10">
              <span className="inline-block w-fit text-[10px] md:text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full mb-3">
                EXCLUSIVE FOR
              </span>

              <h3 className="text-lg md:text-2xl font-extrabold text-white leading-snug mb-4">
                Schools | Colleges | High Schools | Non-Profit Organizations
              </h3>

              <div className="mb-4">
                <span className="inline-block text-3xl md:text-5xl font-black text-white bg-white/10 border border-amber-400/40 px-5 py-2 rounded-xl">
                  10% EXTRA DISCOUNT
                </span>
              </div>

              <p className="text-sm md:text-base text-slate-300 mb-1">
                Special 10% Extra Discount for Schools, Colleges, High Schools & Non-Profit Organizations.
              </p>
              <p className="text-sm md:text-base text-slate-300 mb-6">
                Make your teamwear order more affordable with our special organization discount.
              </p>

              <button className="w-fit bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm md:text-base px-6 py-3 rounded-lg transition-colors">
                GET YOUR DISCOUNT →
              </button>

              <div className="flex flex-wrap gap-4 mt-6 text-xs md:text-sm text-slate-300">
                <span>Credit Card</span>
                <span>Company Check</span>
                <span>Other Approved Payment Methods</span>
              </div>
            </div>
            {/* Right side image placeholder - apni image yaha lagayen */}
            <div className="hidden md:block lg:w-[50%] w-[56%] absolute right-[20px] lg:top-0 top-[111px] shrink-0">
              <img
                src="/home images/imageSchoolDis.png"
                alt="Team jerseys and hoodies"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}