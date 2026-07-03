import type { StaticImageData } from "next/image";

// lastCateCard.js uses variant.icon as a CSS class/color name (e.g. "white", "bg-yellow-400"),
// unlike every other data file where icon is an actual image. Kept as its own type
// instead of forcing it into the shared Product type.
export interface RecentVariant {
  color: string;
  icon: string;
  images: StaticImageData[];
}

export interface RecentProduct {
  id: number;
  name: string;
  oldPrice: number;
  newPrice: number;
  category?: string;
  variants: RecentVariant[];
}