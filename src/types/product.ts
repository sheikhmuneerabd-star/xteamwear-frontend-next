import type { StaticImageData } from "next/image";

export interface ProductVariant {
  color: string;
  icon: StaticImageData;
  images: StaticImageData[];
}

export interface Product {
  id: number;
  name: string;
  oldPrice: number;
  newPrice: number;
  variants: ProductVariant[];
  category?: string;
  available?: boolean;
}