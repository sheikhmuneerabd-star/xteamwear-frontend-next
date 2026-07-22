"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import SizingPShirtItem from "./SizingPShirtItem";
import type { Product } from "@/types/product";

interface ProductSecProps {
  handleClick?: () => void;
  category?: string;
  currentProductId: string | number;
}

interface DbProductResponse {
  _id: string;
  name: string;
  oldPrice: number;
  newPrice: number;
  category: string;
  available: boolean;
  variants: { color: string; icon: string; images: string[]; sku: string; stock: number }[];
}

export default function ProductSec({ handleClick, category, currentProductId }: ProductSecProps) {
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      if (!category) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/products?category=${encodeURIComponent(category)}`);
        const data = await res.json();
        const mapped: Product[] = (data.products || [])
          .filter((p: DbProductResponse) => p._id !== String(currentProductId))
          .map((p: DbProductResponse) => ({
            id: p._id,
            name: p.name,
            oldPrice: p.oldPrice,
            newPrice: p.newPrice,
            category: p.category,
            available: p.available,
            variants: p.variants,
          }));
        setRelated(mapped);
      } catch (err) {
        console.error("Failed to load related products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRelated();
  }, [category, currentProductId]);

  if (!loading && related.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-slate-200/80 font-sans px-2 sm:px-0">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <div>
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-amber-600 bg-amber-500/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-amber-500/20">
            Handpicked Suggestions
          </span>
          <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-slate-950 mt-1">
            Related Products
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="custom-related-prev w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-950 hover:text-white transition-all flex items-center justify-center shadow-sm disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Previous Products"
          >
            <HiOutlineArrowLeft className="text-xs sm:text-base" />
          </button>
          <button
            type="button"
            className="custom-related-next w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-950 hover:text-white transition-all flex items-center justify-center shadow-sm disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Next Products"
          >
            <HiOutlineArrowRight className="text-xs sm:text-base" />
          </button>
        </div>
      </div>

      {/* Swiper Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 py-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="aspect-[4/5] bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-related-next",
            prevEl: ".custom-related-prev",
          }}
          breakpoints={{
            // Mobile: Exact 2 cards side-by-side
            0: { slidesPerView: 2, spaceBetween: 8 },
            // Tablet: 3 cards
            640: { slidesPerView: 3, spaceBetween: 14 },
            // Laptop/Desktop: 4 cards
            1024: { slidesPerView: 4, spaceBetween: 18 },
          }}
          className="pb-4"
        >
          {related.map((shirt) => (
            <SwiperSlide key={shirt.id}>
              <SizingPShirtItem shirt={shirt} handleClick={handleClick} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}