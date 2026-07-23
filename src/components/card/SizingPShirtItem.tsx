"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product, ProductVariant } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";

interface SizingPShirtItemProps {
  shirt: Product;
  handleClick?: () => void;
}

export default function SizingPShirtItem({ shirt, handleClick }: SizingPShirtItemProps) {
  const [activeVariant, setActiveVariant] = useState<ProductVariant>(
    shirt.variants[0] || { color: "", icon: "", images: [], sku: "", stock: 0 }
  );

  const handleVariantClick = (e: React.MouseEvent, variant: ProductVariant) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveVariant(variant);
  };

  const discount = Math.round(
    ((shirt.oldPrice - shirt.newPrice) / shirt.oldPrice) * 100
  );

  return (
    <Link
      href={`/card/${shirt.id}/${encodeURIComponent(activeVariant.color)}`}
      onClick={handleClick}
      className="group block bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 hover:border-slate-300 p-1.5 sm:p-3 transition-all duration-300 hover:shadow-lg"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full bg-slate-100 rounded-lg sm:rounded-xl overflow-hidden">
        {activeVariant.images?.[0] && (
          <Image
            src={activeVariant.images[0]}
            alt={shirt.name}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
            className="object-cover transition-opacity duration-500 ease-in-out hover:opacity-0"
          />
        )}
        {activeVariant.images?.[1] && (
          <Image
            src={activeVariant.images[1]}
            alt={`${shirt.name} alternate view`}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
            className="object-cover absolute inset-0 opacity-0 hover:opacity-100 hover:scale-105 transition-all duration-500 ease-out"
          />
        )}

        {/* Badges */}
        <div className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 flex flex-col gap-1 items-end z-10">
          {discount > 0 && (
            <span className="bg-red-600 text-white font-black text-[8px] sm:text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="pt-2 sm:pt-3 px-0.5 space-y-1">
        <h3 className="text-[11px] sm:text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1 leading-tight">
          {shirt.name}
        </h3>

        {/* Price Row */}
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-xs sm:text-sm font-black text-slate-950">
            {formatPrice(shirt.newPrice)}
          </span>
          {shirt.oldPrice > shirt.newPrice && (
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 line-through">
              {formatPrice(shirt.oldPrice)}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-1 pt-1 overflow-x-auto no-scrollbar">
          {shirt.variants.map((variant, idx) => {
            const isSelected = activeVariant.color === variant.color;
            return (
              <button
                key={idx}
                type="button"
                onClick={(e) => handleVariantClick(e, variant)}
                className={`relative cursor-pointer w-4 h-4 sm:w-5 sm:h-5 rounded-full border shrink-0 transition-all ${
                  isSelected
                    ? "border-amber-500 ring-2 ring-amber-500/20 scale-105"
                    : "border-slate-300"
                }`}
                title={variant.color}
              >
                <Image
                  src={variant.icon}
                  alt={variant.color}
                  fill
                  sizes="16px"
                  className="rounded-full object-cover p-[1px]"
                />
              </button>
            );
          })}
        </div>
      </div>
    </Link>
  );
}