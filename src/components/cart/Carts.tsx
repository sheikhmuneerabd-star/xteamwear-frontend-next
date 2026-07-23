"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product, ProductVariant } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";

export default function Carts({ shirt }: { shirt: Product }) {
  const [active, setActive] = useState<ProductVariant>(shirt.variants[0]);
  const discount = Math.round(
    ((shirt.oldPrice - shirt.newPrice) / shirt.oldPrice) * 100
  );

  return (
    <Link href={`/card/${shirt.id}/${encodeURIComponent(active.color)}`}>
      <div className="group rounded-xl border border-gray-200/80 bg-white shadow-sm hover:shadow-xl transition-all duration-300 p-3.5 mb-2">
        {/* Product Image Box */}
        <div className="cursor-pointer group/img relative rounded-lg aspect-[4/5] overflow-hidden bg-gray-50">
          <Image
            src={active.images[0]}
            alt={shirt.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover opacity-100 group-hover/img:opacity-0 transition-opacity duration-500 ease-in-out"
          />
          <Image
            src={active.images[1] ?? active.images[0]}
            alt={`${shirt.name} alternate`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover absolute top-0 left-0 opacity-0 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-500 ease-out"
          />

          {/* Floating Badges Container */}
          <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1.5 z-10">
            <span className="bg-[#0B1426] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full shadow-md">
              New
            </span>
            {discount > 0 && (
              <span className="bg-amber-500 text-slate-950 text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="pt-3 px-1 space-y-1.5">
          <p className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-amber-600 transition-colors">
            {shirt.name}
          </p>

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

          {/* Color Variant Icons */}
          <div className="flex items-center gap-1.5 pt-1">
            {shirt.variants.map((variant, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActive(variant);
                }}
                className={`relative shrink-0 w-7 h-7 rounded-full cursor-pointer transition-all duration-200 p-[2px] overflow-hidden ${
                  active.color === variant.color
                    ? "ring-2 ring-amber-500 ring-offset-1 scale-105"
                    : "opacity-75 hover:opacity-100 border border-slate-300"
                }`}
              >
                <Image
                  src={variant.icon}
                  alt={variant.color}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}