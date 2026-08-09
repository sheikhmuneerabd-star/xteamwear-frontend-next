"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function PromoBanners() {
  return (
    <section className="py-6 bg-slate-50">
      <div className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* 🚀 TOP MAIN BANNER (Sirf Image + "Start Custom Order" Button) */}
        <div className="relative rounded-2xl overflow-hidden h-[220px] sm:h-[280px] shadow-lg group border border-slate-200">
          
          {/* Main Banner Image (Bina kisi dark overlay ke) */}
          <Image
            src="/home images/easy online ordering.jpeg"
            alt="Order Online Easily"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />

          {/* Akela "Start Custom Order" Button */}
          <div className="absolute bottom-6 left-6 sm:left-10 z-10">
            <Link
              href="/custom-order"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-2xl active:scale-95"
            >
              Start Custom Order <FiArrowRight className="text-sm sm:text-base" />
            </Link>
          </div>

        </div>

        {/* 🎯 BOTTOM BOX (Sirf Full Clean Image) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden h-[200px] sm:h-[220px] shadow-md border border-slate-200 group">
            <Image
              src="/home images/school discount.jpeg"
              alt="Schools & Non-Profits Discount"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

      </div>
    </section>
  );
}