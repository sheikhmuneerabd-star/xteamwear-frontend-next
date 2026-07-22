"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import type { Product, ProductVariant } from "@/types/product";

interface ShirtItemProps {
  shirt: Product;
}

export default function ShirtItem({ shirt }: ShirtItemProps) {
  const [active, setActive] = useState<ProductVariant>(
    shirt.variants[0] || {}
  );

  const handleVariantClick = (
    e: React.MouseEvent<HTMLDivElement>,
    variant: ProductVariant
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(variant);
  };

  // Calculate discount percentage dynamically if old price exists
  const discountPercent =
    shirt.oldPrice && shirt.newPrice
      ? Math.round(((shirt.oldPrice - shirt.newPrice) / shirt.oldPrice) * 100)
      : null;

  const mainImage = active.images?.[0] || active.images?.[0] || "/placeholder.jpg";
  const hoverImage = active.images?.[1] || mainImage;

  return (
    <Link
      href={`/card/${shirt.id}/${encodeURIComponent(active.color || "default")}`}
      className="group block h-full font-sans"
    >
      <div className="h-full rounded-2xl bg-white border border-slate-100 p-3 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
        <div>
          {/* Product Image Stage */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-slate-100">
            {/* Main Image */}
            <Image
              src={mainImage}
              alt={shirt.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-opacity duration-500 hover:opacity-0"
            />

            {/* Hover Image */}
            <Image
              src={hoverImage}
              alt={`${shirt.name} - view`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover absolute inset-0 opacity-0 hover:opacity-100 hover:scale-105 transition-all duration-500 ease-out"
            />

            {/* Floating Badges Container */}
            <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1.5 z-10">
              <span className="bg-[#0B1426] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full shadow-md">
                New
              </span>
              {discountPercent && (
                <span className="bg-amber-500 text-slate-950 text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
                  -{discountPercent}%
                </span>
              )}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="pt-4 px-1 pb-1">
            {/* Title */}
            <h3 className="text-sm md:text-base font-semibold text-[#0B1426] line-clamp-1 group-hover:text-amber-600 transition-colors duration-200">
              {shirt.name}
            </h3>

            {/* Price Section */}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="text-base sm:text-lg font-bold text-[#0B1426]">
                {formatPrice(shirt.newPrice)}
              </span>

              {shirt.oldPrice && (
                <span className="text-xs sm:text-sm text-slate-400 line-through font-medium">
                  {formatPrice(shirt.oldPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Color Swatches Selection */}
        {shirt.variants && shirt.variants.length > 0 && (
          <div className="pt-2 pb-1 px-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {shirt.variants.map((variant, index) => {
              const isSelected = active.color === variant.color;
              return (
                <div
                  key={index}
                  title={variant.color}
                  onClick={(e) => handleVariantClick(e, variant)}
                  className={`relative shrink-0 w-7 h-7 rounded-full cursor-pointer transition-all duration-200 p-[2px] ${
                    isSelected
                      ? "ring-2 ring-amber-500 ring-offset-1 scale-105"
                      : "opacity-75 hover:opacity-100 border border-slate-300"
                  }`}
                >
                  <Image
                    src={variant.icon || variant.images?.[0] || "/placeholder.jpg"}
                    alt={variant.color}
                    fill
                    sizes="28px"
                    className="rounded-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Link>
  );
}