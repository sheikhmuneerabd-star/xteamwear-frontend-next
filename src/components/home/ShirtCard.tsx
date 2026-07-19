"use client";

import ShirtItem from "./ShirtItem";
import type { Product } from "@/types/product";
import { useSafeScrollFade } from "@/lib/useSafeScrollFade";

interface ShirtCardProps {
  showMore: number;
  products: Product[];
}

export default function ShirtCard({ showMore, products }: ShirtCardProps) {
  useSafeScrollFade(".shirt", [showMore, products]);

  return (
    <div className="grid grid-cols-1 min-[375px]:grid-cols-2 min-[475px]:grid-cols-2 min-[768px]:grid-cols-3 min-[1024px]:grid-cols-4 min-[1440px]:grid-cols-4 w-full gap-4">
      {products.slice(0, showMore).map((shirt) => (
        <ShirtItem key={shirt.id} shirt={shirt} />
      ))}
    </div>
  );
}