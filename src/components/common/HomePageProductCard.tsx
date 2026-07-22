"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import type { Product, ProductVariant } from "@/types/product";

interface HomePageProductCardProps {
  product: Product;
  layout?: "grid" | "list";
}

export default function HomePageProductCard({ product, layout = "grid" }: HomePageProductCardProps) {
  const [active, setActive] = useState<ProductVariant>(product.variants?.[0]);

  const discount =
    product.oldPrice > product.newPrice
      ? Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)
      : 0;

  // Clean single currency formatting
  const formattedNew = formatPrice(product.newPrice);
  const formattedOld = formatPrice(product.oldPrice);

  const displayNewPrice = formattedNew.includes("USD") ? formattedNew : `${formattedNew} USD`;
  const displayOldPrice = formattedOld.includes("USD") ? formattedOld : `${formattedOld} USD`;

  return (
    <div className="group bg-white rounded-[16px] border border-gray-200/80 p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
      <div className={layout === "list" ? "flex flex-col md:flex-row gap-5 items-center" : "block"}>
        
        {/* IMAGE CONTAINER */}
        <div
          className={`group/img relative overflow-hidden rounded-[12px] bg-[#f2f3f5] aspect-[4/5] block shrink-0 ${
            layout === "list" ? "w-full md:w-[260px]" : "w-full"
          }`}
        >
          <Link href={`/card/${product.id}/${encodeURIComponent(active?.color || "")}`}>
            {/* Front Image */}
            <Image
              src={active?.images?.[0] || product.variants?.[0]?.images?.[0] || "/placeholder.png"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover opacity-100 group-hover/img:opacity-0 transition-opacity duration-500"
            />

            {/* Back Image (Hover on image container only) */}
            <Image
              src={active?.images?.[1] || active?.images?.[0] || "/placeholder.png"}
              alt={`${product.name} back view`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover opacity-0 group-hover/img:opacity-100 transition-opacity hover:scale-105 duration-500 ease-out absolute inset-0"
            />
          </Link>

          {/* BADGES */}
          <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1.5 pointer-events-none z-10">
            <span className="bg-[#0c1427] text-white font-semibold text-[11px] px-2.5 py-0.5 rounded-md">
              New
            </span>
            {discount > 0 && (
              <span className="bg-[#ff9900] text-black font-extrabold text-[11px] px-2 py-0.5 rounded-md">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className={`flex-1 flex flex-col justify-start ${layout === "list" ? "w-full h-full" : "mt-3.5"}`}>
          <div>
            <Link href={`/card/${product.id}/${encodeURIComponent(active?.color || "")}`}>
              <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-1 group-hover:text-amber-600 transition-colors">
                {product.name}
              </h3>
            </Link>

            {layout === "list" && (
              <p className="text-sm text-gray-500 mt-1.5 line-clamp-2">
                Custom activewear engineered with athletic performance materials.
              </p>
            )}

            {/* PRICING */}
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-[17px] font-extrabold text-gray-900">
                {displayNewPrice}
              </span>
              {product.oldPrice > product.newPrice && (
                <span className="text-xs font-medium text-gray-400 line-through">
                  {displayOldPrice}
                </span>
              )}
            </div>
          </div>

          {/* COLOR SWATCH */}
          {product.variants?.length > 0 && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              {product.variants.map((variant, index) => {
                const isSelected = active?.color === variant.color;
                return (
                  <button
                    key={index}
                    type="button"
                    title={variant.color}
                    onClick={(e) => {
                      e.preventDefault();
                      setActive(variant);
                    }}
                    className={`relative w-7 h-7 rounded-full overflow-hidden transition-all ${
                      isSelected
                        ? "border-2 border-[#ff9900] scale-105"
                        : "border border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={variant.icon || variant.images?.[0]}
                      alt={variant.color}
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}