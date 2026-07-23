"use client";

import { useEffect, useState } from "react";
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
  image: any;
  link: string;
  tag?: string;
}

const defaultCategories: CategoryItem[] = [
  { id: "football", title: "Football Kits", itemCount: "48+ Products", image: yellow1.src || yellow1, link: "/category/football", tag: "Popular" },
  { id: "basketball", title: "Basketball Wear", itemCount: "32+ Products", image: white2.src || white2, link: "/category/basketball" },
  { id: "baseball", title: "Baseball Jerseys", itemCount: "24+ Products", image: green3.src || green3, link: "/category/baseball" },
  { id: "winterwear", title: "Outerwear & Vests", itemCount: "18+ Products", image: black4.src || black4, link: "/category/Winter Wear" },
  { id: "training", title: "Athletic Training", itemCount: "50+ Products", image: blue5.src || blue5, link: "/category/training", tag: "New" },
];

export default function CategoryShowcase() {
  const [categories, setCategories] = useState<CategoryItem[]>(defaultCategories);
  const [activeCategory, setActiveCategory] = useState<string>("football");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          const fetchedCats = data.settings?.categoriesShowcase;

          if (fetchedCats && fetchedCats.length > 0) {
            const formatted = fetchedCats.map((cat: any, index: number) => ({
              id: cat.id || `cat-${index}`,
              title: cat.title || defaultCategories[index]?.title || "Category",
              itemCount: cat.itemCount || "0+ Products",
              image: cat.image && cat.image.trim() !== "" ? cat.image : defaultCategories[index]?.image,
              link: cat.link || "/category/all",
              tag: cat.tag || "",
            }));
            setCategories(formatted);
            if (formatted[0]?.id) setActiveCategory(formatted[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to load category showcase", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="py-12 max-w-[1440px] mx-auto px-4">
        <div className="w-full h-[480px] bg-slate-200/60 rounded-2xl animate-pulse" />
      </div>
    );
  }

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
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat.id;
            const imgSrc = typeof cat.image === "string" ? cat.image : cat.image?.src;

            return (
              <Link
                key={cat.id || idx}
                href={cat.link}
                onMouseEnter={() => setActiveCategory(cat.id)}
                className={`relative group rounded-2xl overflow-hidden border border-slate-200 transition-all duration-300 ease-out flex flex-col justify-end p-5 h-[260px] lg:h-full shadow-sm ${
                  isActive ? "lg:flex-[2.2] border-amber-500 shadow-md" : "lg:flex-1 opacity-90 hover:opacity-100"
                }`}
              >
                <img
                  src={imgSrc}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    const fallback = defaultCategories[idx]?.image;
                    if (fallback) {
                      (e.target as HTMLImageElement).src = typeof fallback === "string" ? fallback : fallback.src;
                    }
                  }}
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