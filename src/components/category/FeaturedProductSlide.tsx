"use client";

import HomePageProductCard from "@/components/common/HomePageProductCard";
import type { Product } from "@/types/product";

export default function FeaturedProductSlide({ item }: { item: Product }) {
  return <HomePageProductCard product={item} layout="grid" />;
}