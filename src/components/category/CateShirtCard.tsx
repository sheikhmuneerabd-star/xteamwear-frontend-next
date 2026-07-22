"use client";

import HomePageProductCard from "@/components/common/HomePageProductCard";
import type { Product } from "@/types/product";

interface CateShirtCardProps {
  shirt: Product;
  grid: number;
}

export default function CateShirtCard({ shirt, grid }: CateShirtCardProps) {
  return (
    <div className="shirt2">
      <HomePageProductCard product={shirt} layout={grid === 1 ? "list" : "grid"} />
    </div>
  );
}