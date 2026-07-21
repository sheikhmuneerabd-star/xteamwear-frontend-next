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
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.slice(0, showMore).map((shirt) => (
        <div key={shirt.id} className="shirt">
          <ShirtItem shirt={shirt} />
        </div>
      ))}
    </div>
  );
}