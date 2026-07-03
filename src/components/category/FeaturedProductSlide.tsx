"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product, ProductVariant } from "@/types/product";

export default function FeaturedProductSlide({ item }: { item: Product }) {
  const [active, setActive] = useState<ProductVariant>(item.variants[0]);
  const discount = Math.round(((item.oldPrice - item.newPrice) / item.oldPrice) * 100);

  return (
    <Link href={`/card/${item.id}/${encodeURIComponent(active.color)}`}>
      <div className="group rounded-md shadow-lg shadow-gray-300 p-4 mb-8 mt-3">
        <div>
          <div className="cursor-pointer group/img group-hover:-translate-y-2 transition-all duration-300 relative rounded aspect-[4/5] overflow-hidden">
            <Image
              src={active.images[0]}
              alt={item.name}
              fill
              sizes="220px"
              className="object-cover opacity-100 group-hover/img:opacity-0 transition-opacity duration-700 ease-in-out"
            />
            <Image
              src={active.images[1] ?? active.images[0]}
              alt={`${item.name} alternate`}
              fill
              sizes="220px"
              className="object-cover absolute top-0 left-0 opacity-0 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-700 ease-out"
            />
            <div className="absolute flex flex-col items-end gap-1 right-0 top-0">
              <p className="bg-red-600 text-white text-center xl:text-[13px] lg:text-[13px] text-[11px] py-[1px] xl:w-[70px] lg:w-[78px] w-[62px]">
                Sale {discount}%
              </p>
            </div>
          </div>

          <div className="md:pt-3 pt-3 pl-2 pb-0">
            <p className="text-sm md:text-base lg:text-md line-clamp-2 text-gray-700 hover:text-blue-600 cursor-pointer transition-all duration-300">
              {item.name}
            </p>
            <p className="text-gray-600 text-sm md:text-base lg:text-[14px] mt-2 line-through cursor-pointer">
              Rs.{item.oldPrice.toLocaleString("en-PK")} PKR
            </p>
            <div className="text-red-600 flex items-center cursor-pointer text-sm md:text-base lg:text-[14px] font-medium gap-1">
              Rs.{item.newPrice.toLocaleString("en-PK")} PKR
              <p className="bg-red-600 text-white xl:px-2 lg:px-3 px-2 xl:text-[13px] lg:text-[15px] text-[10px] py-[2px] rounded cursor-text hidden md:flex">
                (-{discount}%)
              </p>
            </div>
            <div className="flex gap-1">
              {item.variants.map((variant, index) => (
                <div
                  key={index}
                  className="relative w-[30px] h-[30px] mt-3 rounded-full cursor-pointer border-[1.4px] p-[2px] border-gray-300 overflow-hidden"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActive(variant);
                  }}
                >
                  <Image src={variant.icon} alt={variant.color} fill sizes="30px" className="rounded-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}