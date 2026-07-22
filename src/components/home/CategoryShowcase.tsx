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
  { id: "football", title: "Football Kits", itemCount: "48+ Products", image: yellow1, link: "/categories/football", tag: "Popular" },
  { id: "basketball", title: "Basketball Wear", itemCount: "32+ Products", image: white2, link: "/categories/basketball" },
  { id: "baseball", title: "Baseball Jerseys", itemCount: "24+ Products", image: green3, link: "/categories/baseball" },
  { id: "winterwear", title: "Outerwear & Vests", itemCount: "18+ Products", image: black4, link: "/categories/winter-wear" },
  { id: "training", title: "Athletic Training", itemCount: "50+ Products", image: blue5, link: "/categories/training", tag: "New" },
];

export default function CategoryShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("football");

  return (
    <section className="py-12 bg-slate-50 text-slate-900 font-sans overflow-hidden border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-amber-700 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            EXPLORE BY SPORT
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
            CURATED CATEGORIES
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Engineered for performance. Choose your discipline for custom sublimated team apparel.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 h-auto lg:h-[480px] w-full">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <Link
                key={cat.id}
                href={cat.link}
                onMouseEnter={() => setActiveCategory(cat.id)}
                className={`relative group rounded-2xl overflow-hidden border border-slate-200 transition-all duration-300 ease-out flex flex-col justify-end p-5 h-[260px] lg:h-full shadow-sm ${
                  isActive ? "lg:flex-[2.2] border-amber-500 shadow-md" : "lg:flex-1 opacity-90 hover:opacity-100"
                }`}
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {cat.tag && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-950 bg-amber-400 px-2.5 py-0.5 rounded-full shadow">
                      {cat.tag}
                    </span>
                  </div>
                )}

                <div className="relative z-10 space-y-1">
                  <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    {cat.itemCount}
                  </p>

                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight group-hover:text-amber-300 transition-colors line-clamp-1">
                      {cat.title}
                    </h3>

                    <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 group-hover:bg-amber-500 group-hover:text-slate-950 text-white flex items-center justify-center shrink-0 backdrop-blur-md transition-colors">
                      <HiArrowUpRight className="text-base" />
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