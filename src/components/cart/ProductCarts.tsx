"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

import Carts from "./Carts";
import { useSafeScrollFade } from "@/lib/useSafeScrollFade";
import type { Product } from "@/types/product";

interface DbProductResponse {
  _id: string;
  name: string;
  oldPrice: number;
  newPrice: number;
  category: string;
  subCategory?: string;
  item?: string;
  available: boolean;
  variants: { color: string; icon: string; images: string[]; sku: string; stock: number }[];
}

export default function ProductCarts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useSafeScrollFade(".bestseller-slide", [products]);

  useEffect(() => {
    async function fetchBestSellers() {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        
        // MongoDB Data mapping to Product Interface
        const mapped: Product[] = (data.products || []).map((p: DbProductResponse) => ({
          id: p._id,
          name: p.name,
          oldPrice: p.oldPrice,
          newPrice: p.newPrice,
          category: p.category,
          subCategory: p.subCategory,
          item: p.item,
          available: p.available,
          variants: p.variants,
        }));

        setProducts(mapped);
      } catch (err) {
        console.error("Failed to load best sellers products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBestSellers();
  }, []);

  return (
    <div className="mt-16">
      <div className="h-[1px] bg-gray-200"></div>
      <h2 className="font-extrabold text-2xl mt-6 tracking-wide text-gray-900 uppercase">
        BEST SELLERS
      </h2>

      <div className="mt-6 relative group/swiper">
        {/* Navigation Arrows */}
        <button
          type="button"
          aria-label="Previous Slide"
          className="custom-pre absolute -left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer bg-white/90 hover:bg-white text-gray-800 shadow-lg w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 transition-all duration-200 hover:scale-110"
        >
          <MdOutlineArrowBackIos className="ml-1 text-sm" />
        </button>

        <button
          type="button"
          aria-label="Next Slide"
          className="custom-nex absolute -right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer bg-white/90 hover:bg-white text-gray-800 shadow-lg w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 transition-all duration-200 hover:scale-110"
        >
          <MdOutlineArrowForwardIos className="text-sm" />
        </button>

        {loading ? (
          /* Simple Loading Skeleton */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-72 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <Swiper
            modules={[Navigation]}
            className="pb-8"
            spaceBetween={20}
            slidesPerView={4}
            slidesPerGroup={4}
            navigation={{ nextEl: ".custom-nex", prevEl: ".custom-pre" }}
            breakpoints={{
              0: { slidesPerView: 1, slidesPerGroup: 1 },
              480: { slidesPerView: 2, slidesPerGroup: 2 },
              768: { slidesPerView: 3, slidesPerGroup: 3 },
              1024: { slidesPerView: 4, slidesPerGroup: 4 },
            }}
            loop={products.length > 4}
            speed={700}
          >
            {products.map((shirt) => (
              <SwiperSlide key={shirt.id} className="bestseller-slide py-2">
                <Carts shirt={shirt} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-sm text-gray-500 py-4">No best sellers available.</p>
        )}
      </div>
    </div>
  );
}