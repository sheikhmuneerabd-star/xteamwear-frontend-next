"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSafeScrollFade } from "@/lib/useSafeScrollFade";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

import SizingPShirtItem from "./SizingPShirtItem";
import type { Product } from "@/types/product";
import { useGSAP } from "@gsap/react";

interface ProductSecProps {
  handleClick: () => void;
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

  useSafeScrollFade(".related-slide", [related]);

  if (!loading && related.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <div className="h-[1px] border"></div>
      <h2 className="font-semibold text-center text-xl mt-6">RELATED PRODUCTS</h2>
      <div className="mt-6 relative">
        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading...</p>
        ) : (
          <>
            <div className="custom-pre absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full">
              <MdOutlineArrowBackIos />
            </div>
            <div className="custom-nex absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full">
              <MdOutlineArrowForwardIos />
            </div>

            <Swiper
              modules={[Navigation]}
              className="pb-10"
              spaceBetween={16}
              slidesPerView={4}
              slidesPerGroup={4}
              navigation={{ nextEl: ".custom-nex", prevEl: ".custom-pre" }}
              breakpoints={{
                0: { slidesPerView: 1, slidesPerGroup: 1 },
                375: { slidesPerView: 2, slidesPerGroup: 2 },
                768: { slidesPerView: 3, slidesPerGroup: 3 },
                1024: { slidesPerView: 4, slidesPerGroup: 4 },
              }}
              loop={related.length > 4}
              speed={700}
            >
              {related.map((shirt) => (
                <SwiperSlide key={shirt.id} className="related-slide">
                  <SizingPShirtItem shirt={shirt} handleClick={handleClick} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </div>
  );
}