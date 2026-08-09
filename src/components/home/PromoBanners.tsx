"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

// 1. TOP PAR IMAGES IMPORT KAREIN
import whiteBlackFrontImg from "@/assets/baseball/whiteBlackFront1.avif";

export default function PromoBanners() {
  const features = [
    "Instant Quote Tool",
    "Free Custom Designs",
    "Create Your Package",
    "Automated Ordering",
    "Add Team Rosters",
    "Run Your Fan Shop",
  ];

  return (
    <section className="py-6 bg-white">
      <div className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* TOP MAIN BANNER */}
        <div className="relative rounded-2xl overflow-hidden min-h-[260px] sm:min-h-[280px] flex items-center shadow-lg group">
          {/* Imported Image Object use karein */}
          <Image
            src="/home images/easy online ordering.jpeg"
            alt="Order Online"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40" />

          <div className="relative z-10 p-6 sm:p-10 w-full grid grid-cols-1 md:grid-cols-12 items-center gap-6">
            <div className="md:col-span-5 flex justify-center order-2 md:order-1">
              <div className="relative w-full max-w-[280px] h-[160px] rounded-xl overflow-hidden border border-white/20 bg-black/30 backdrop-blur-sm shadow-2xl flex items-center justify-center">
                <Image
                  src={whiteBlackFrontImg}
                  alt="Custom Order System"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>

            <div className="md:col-span-7 space-y-3 order-1 md:order-2 text-white">
              <span className="inline-block px-3 py-1 bg-amber-500 text-slate-950 rounded-full text-[11px] font-black uppercase tracking-wider">
                Seamless Custom Ordering
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight">
                Order Online <span className="text-amber-400">Easily.</span>
              </h2>

              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm font-bold text-gray-200 pt-1">
                {features.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <FiCheckCircle className="text-amber-400 shrink-0 text-sm" />
                    <span className="truncate">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <Link
                  href="/custom-order"
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  Start Custom Order <FiArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM 2x2 GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 2 */}
          <div className="relative rounded-2xl overflow-hidden min-h-[200px] sm:min-h-[220px] flex items-end p-6 group shadow-md border border-gray-100">
            <Image
              src="/home images/school discount.jpeg"
              alt="Schools & Non-Profits"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />

            <div className="relative z-10 space-y-2 text-white w-full">
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
                Special Program
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase leading-tight">
                Schools & Non-Profit Organizations
              </h3>
              <p className="text-xs text-gray-300">
                Get{" "}
                <span className="text-amber-400 font-black text-sm">
                  5% OFF
                </span>{" "}
                on all custom team apparel & orders.
              </p>
              <div className="pt-2">
                <Link
                  href="/custom-order"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-slate-950 font-black px-5 py-2 rounded-lg text-xs uppercase tracking-wider transition-all"
                >
                  Claim 5% Discount <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
