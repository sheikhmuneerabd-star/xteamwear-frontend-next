"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Product } from "@/types/product";
import CateShirtCard from "./CateShirtCard";

gsap.registerPlugin(ScrollTrigger);

interface CardCateSecProps {
  categoryCardImg: Product[];
  stockOpen: boolean;
  outStockOpen: boolean;
  grid: number;
  itemPerPageCard: number;
  activeCategory: string;
  subActiveCategory?: string;
}

export default function CardCateSec({ categoryCardImg, stockOpen, outStockOpen, grid, itemPerPageCard, activeCategory, subActiveCategory }: CardCateSecProps) {
  useGSAP(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".shirt2", {
        start: "top 90%",
        once: true,
        onEnter: (elements) => {
          gsap.from(elements, { y: 80, opacity: 0, duration: 0.8, stagger: 0.15 });
        },
      });

      // Elements jo already viewport mein hain unke liye ScrollTrigger
      // ka onEnter fire nahi hota — is liye ek forced refresh + fallback
      ScrollTrigger.refresh();
    });

    // Safety net: agar kisi wajah se animation trigger na ho,
    // 1 second baad sab kuch visible force kar do
    const fallback = setTimeout(() => {
      gsap.set(".shirt2", { opacity: 1, y: 0, clearProps: "opacity,transform" });
    }, 1000);

    return () => {
      ctx.revert();
      clearTimeout(fallback);
    };
  }, [activeCategory, grid, itemPerPageCard]);

  const filteredData = categoryCardImg
    .filter((item) => item.category === activeCategory)
    .filter((item) => !subActiveCategory || item.subCategory === subActiveCategory)
    .filter((item) => {
      if (stockOpen && outStockOpen) return true;
      if (stockOpen) return item.available;
      if (outStockOpen) return !item.available;
      return true;
    });

  return (
    <div className="mt-10">
      <div
        className={`grid ${grid === 1 ? "grid-cols-1" : ""} ${grid === 2 ? "grid-cols-2" : ""} ${
          grid === 3 ? "grid-cols-3" : ""
        } w-full gap-4`}
      >
        {filteredData.slice(0, itemPerPageCard).map((shirt) => (
          <CateShirtCard key={shirt.id} shirt={shirt} grid={grid} />
        ))}
      </div>
    </div>
  );
}