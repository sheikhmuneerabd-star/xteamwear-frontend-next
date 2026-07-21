import type { StaticImageData } from "next/image";

export type ImageSource = StaticImageData | string;

export interface ProductVariant {
  color: string;
  icon: ImageSource;
  images: ImageSource[];
  sku?: string;
  stock?: number;
}

export interface Product {
  id: number | string;
  name: string;
  oldPrice: number;
  newPrice: number;
  variants: ProductVariant[];
  category?: string;
  subCategory?: string;
  item?: string;
  available?: boolean;
}