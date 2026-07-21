"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";

import yellow1 from "@/assets/yellow1.webp";
import white2 from "@/assets/white2.webp";
import green3 from "@/assets/green3.webp";
import black4 from "@/assets/black4.webp";
import blue5 from "@/assets/blue5.webp";

interface CategoryItem {
  id: string;
  title: string;
  itemCount: string;
  image: StaticImageData | string;
  link: string;
  tag?: string;
}

const categories: CategoryItem[] = [
  {
    id: "football",
    title: "Football Kits",
    itemCount: "48+ Products",
    image: yellow1,
    link: "/categories/football",
    tag: "Popular",
  },
  {
    id: "basketball",
    title: "Basketball Wear",
    itemCount: "32+ Products",
    image: white2,
    link: "/categories/basketball",
  },
  {
    id: "baseball",
    title: "Baseball Jerseys",
    itemCount: "24+ Products",
    image: green3, // Public folder path
    link: "/categories/baseball",
  },
  {
    id: "winterwear",
    title: "Outerwear & Vests",
    itemCount: "18+ Products",
    image: black4,
    link: "/categories/winter-wear",
  },
  {
    id: "training",
    title: "Athletic Training",
    itemCount: "50+ Products",
    image: blue5,
    link: "/categories/training",
    tag: "New Arrivals",
  },
];

export default function CategoryShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("football");

  return (
    <section className="py-20 bg-[#070D18] text-white font-sans overflow-hidden border-t border-slate-800/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full">
            EXPLORE BY SPORT
          </span>
          
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            CURATED CATEGORIES
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Engineered for durability and performance. Choose your discipline to view custom sublimated team kits and apparel.
          </p>
        </div>

        {/* Dynamic Interactive Expanding Grid */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[550px] w-full">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <Link
                key={cat.id}
                href={cat.link}
                onMouseEnter={() => setActiveCategory(cat.id)}
                className={`relative group rounded-3xl overflow-hidden border border-slate-800 transition-all duration-500 ease-out flex flex-col justify-end p-6 h-[350px] lg:h-full ${
                  isActive ? "lg:flex-[2.5] border-amber-500/50 shadow-2xl shadow-amber-500/10" : "lg:flex-1 opacity-90 lg:opacity-75 hover:opacity-100"
                }`}
              >
                {/* Background Image */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent transition-opacity duration-300" />

                {/* Top Badge (If Available) */}
                {cat.tag && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-950 bg-amber-400 px-3 py-1 rounded-full shadow-md">
                      {cat.tag}
                    </span>
                  </div>
                )}

                {/* Bottom Content Area */}
                <div className="relative z-10 space-y-1 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {cat.itemCount}
                  </p>

                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight group-hover:text-amber-300 transition-colors line-clamp-1">
                      {cat.title}
                    </h3>

                    {/* Circular Action Button */}
                    <div className="w-10 h-10 rounded-full bg-slate-900/80 border border-white/10 group-hover:bg-amber-500 group-hover:text-slate-950 text-white flex items-center justify-center shrink-0 backdrop-blur-md transition-all duration-300">
                      <HiArrowUpRight className="text-lg" />
                    </div>
                  </div>
                </div>

              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}