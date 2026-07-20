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
  const [active, setActive] = useState<ProductVariant>(shirt.variants[0]);

  const handleVariantClick = (
    e: React.MouseEvent<HTMLDivElement>,
    variant: ProductVariant
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(variant);
  };

  return (
    <Link
      href={`/card/${shirt.id}/${encodeURIComponent(active.color)}`}
      className="shirt"
    >
      <div className="group rounded-md shadow-lg shadow-gray-300 p-4">
        <div>
          <div className="cursor-pointer group/img group-hover:-translate-y-2 transition-all duration-300 relative rounded aspect-[4/5] overflow-hidden">
            <Image
              src={active.images[0]}
              alt={shirt.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover opacity-100 group-hover/img:opacity-0 transition-opacity duration-700 ease-in-out"
            />
            <Image
              src={active.images[1]}
              alt={`${shirt.name} - alternate view`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover absolute top-0 left-0 opacity-0 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-700 ease-out"
            />
            <div className="absolute flex flex-col items-end gap-1 right-0 top-0">
              <p className="bg-[#C6FF00] text-[#0B1E3D] rounded text-center xl:text-[13px] lg:text-[13px] text-[10px] xl:py-[1px] lg:py-[1px] py-0 xl:w-[42px] lg:w-[42px] w-[34px]">
                New
              </p>
              <p className="bg-[#FF5A36] text-white rounded text-center xl:text-[13px] lg:text-[13px] text-[11px] py-[1px] xl:w-[78px] lg:w-[78px] w-[62px]">
                Sale 20%
              </p>
            </div>
          </div>

          <div className="md:pt-4 md:pl-4 md:pr-4 pt-3 pl-2 pb-0">
            <p className="text-sm md:text-base lg:text-lg line-clamp-2 text-gray-700 hover:text-[#0B1E3D] cursor-pointer transition-all duration-300">
              {shirt.name}
            </p>
            <p className="text-gray-600 text-sm md:text-base lg:text-lg mt-2 line-through cursor-pointer">
              {formatPrice(shirt.oldPrice)}
            </p>
            <div className="text-[#FF5A36] flex items-center gap-2 cursor-pointer text-sm md:text-base lg:text-lg font-medium">
              {formatPrice(shirt.newPrice)}
              <p className="bg-[#FF5A36] text-white xl:px-3 lg:px-3 px-2 xl:text-[15px] lg:text-[15px] text-[10px] xl:pt-1 lg:pt-1 pt-[2px] xl:pb-[5px] lg:pb-[5px] pb-[2px] rounded cursor-text hidden md:flex">
                (-20%)
              </p>
            </div>
            <div className="flex gap-1">
              {shirt.variants.map((variant, index) => (
                <div
                  key={index}
                  className="relative w-[30px] h-[30px] mt-3 rounded-full cursor-pointer border-[1.4px] p-[2px] border-gray-300 overflow-hidden"
                  onClick={(e) => handleVariantClick(e, variant)}
                >
                  <Image
                    src={variant.icon}
                    alt={variant.color}
                    fill
                    sizes="30px"
                    className="rounded-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}