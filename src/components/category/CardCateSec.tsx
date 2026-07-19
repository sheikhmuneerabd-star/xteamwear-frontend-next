"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Product } from "@/types/product";
import CateShirtCard from "./CateShirtCard";
import { useSafeScrollFade } from "@/lib/useSafeScrollFade";

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
  useSafeScrollFade(".shirt2", [activeCategory, grid, itemPerPageCard]);

  const normalize = (str?: string) => (str || "").trim().toLowerCase();

    const filteredData = categoryCardImg
      .filter((item) => normalize(item.category) === normalize(activeCategory))
      .filter((item) => !subActiveCategory || normalize(item.subCategory) === normalize(subActiveCategory))
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