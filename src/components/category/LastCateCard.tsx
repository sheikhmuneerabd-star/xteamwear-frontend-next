"use client";

import HomePageProductCard from "@/components/common/HomePageProductCard";
import type { RecentProduct } from "@/types/recentProduct";

export default function LastCateCard({ shirt }: { shirt: RecentProduct }) {
  // Mapping RecentProduct to Product type compatibility
  const productData = {
    id: shirt.id,
    name: shirt.name,
    oldPrice: shirt.oldPrice,
    newPrice: shirt.newPrice,
    category: "",
    available: true,
    variants: shirt.variants,
  };

  return (
    <div className="shirt2">
      <HomePageProductCard product={productData} layout="grid" />
    </div>
  );
}