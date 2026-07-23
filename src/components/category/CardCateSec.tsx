"use client";

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

export default function CardCateSec({
  categoryCardImg,
  stockOpen,
  outStockOpen,
  grid,
  itemPerPageCard,
  activeCategory,
  subActiveCategory,
}: CardCateSecProps) {
  useSafeScrollFade(".shirt2", [activeCategory, grid, itemPerPageCard]);

  const normalize = (str?: string) => (str || "").trim().toLowerCase();

  const filteredData = categoryCardImg
    // Fix: "all" word condition handled here
    .filter((item) => {
      const activeCat = normalize(activeCategory);
      if (!activeCat || activeCat === "all") return true;
      return normalize(item.category) === activeCat;
    })
    .filter((product) => {
      const subCat = normalize(subActiveCategory);
      if (!subCat || subCat === "all") return true;
      return (
        normalize(product.subCategory) === subCat ||
        normalize(product.item) === subCat
      );
    })
    .filter((item) => {
      if (stockOpen && outStockOpen) return true;
      if (stockOpen) return item.available;
      if (outStockOpen) return !item.available;
      return true;
    });

  if (filteredData.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-gray-900">No products found</h3>
        <p className="text-sm text-gray-500 mt-1 max-w-sm">
          Try adjusting your filter or category selections to find what you are looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div
        className={`grid gap-6 ${
          grid === 1
            ? "grid-cols-1"
            : grid === 2
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {filteredData.slice(0, itemPerPageCard).map((shirt) => (
          <CateShirtCard key={shirt.id} shirt={shirt} grid={grid} />
        ))}
      </div>
    </div>
  );
}