"use client";

import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import TeamImage from "@/components/home/TeamImage";
import FactoryCard from "@/components/home/FactoryCard";
import ShirtCard from "@/components/home/ShirtCard";
import TestimonialSlider from "@/components/home/TestimonialSlider";
import ImagesSection from "@/components/home/ImagesSection";
import type { Product } from "@/types/product";
import PromiseSection from "@/components/home/PromiseSection";

export default function HomePage() {
  const [showMore, setShowMore] = useState(4);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        const mapped: Product[] = (data.products || []).map((p: {
          _id: string;
          name: string;
          oldPrice: number;
          newPrice: number;
          category: string;
          available: boolean;
          variants: { color: string; icon: string; images: string[]; sku: string; stock: number }[];
        }) => ({
          id: p._id,
          name: p.name,
          oldPrice: p.oldPrice,
          newPrice: p.newPrice,
          category: p.category,
          available: p.available,
          variants: p.variants,
        }));
        setProducts(mapped);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".xteamwearA", {
      y: 60, duration: 0.7, opacity: 0, stagger: 0.2,
      scrollTrigger: { trigger: ".xteamwearA", scroller: "body", scrub: 2, once: true, start: "top 100%", end: "top 30%" },
    });
    tl.from(".showMore", {
      y: 50, duration: 0.7, opacity: 0, stagger: 0.2,
      scrollTrigger: { trigger: ".showMore", scroller: "body", scrub: 2, once: true, start: "top 100%", end: "top 30%" },
    });
    tl.from(".latestP", {
      y: 50, duration: 0.6, opacity: 0, stagger: 0.2,
      scrollTrigger: { trigger: ".latestP", scroller: "body", scrub: 2, once: true, start: "top 100%", end: "top 30%" },
    });
    tl.from(".latestT", {
      y: 50, duration: 0.6, opacity: 0, stagger: 0.2,
      scrollTrigger: { trigger: ".latestT", scroller: "body", scrub: 2, once: true, start: "top 100%", end: "top 30%" },
    });
  }, []);

  return (
    <div>
      <TeamImage />

      <h3 className="text-center text-2xl font-medium xl:mt-8 mt-5 xteamwearA">
        XTEAMWEAR ADVANTAGES
      </h3>
      <FactoryCard />

      <div className="bg-gray-100">
        <h3 className="ml-[40px] text-2xl font-medium pt-10 pb-8">LATEST HOT PRODUCTS</h3>
        <div className="w-[93.8%] mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 min-[375px]:grid-cols-2 min-[475px]:grid-cols-2 min-[768px]:grid-cols-3 min-[1024px]:grid-cols-4 min-[1440px]:grid-cols-4 w-full gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="text-center py-10 text-gray-500">No products available yet.</p>
          ) : (
            <ShirtCard showMore={showMore} products={products} />
          )}
        </div>
        <div className="flex justify-center pb-10 showMore">
          {showMore < products.length && (
            <button
              type="button"
              onClick={() => setShowMore(showMore + 4)}
              className="bg-white text-center text-[14px] font-medium w-[300px] h-[42px] rounded-md shadow-md mt-10 transition-all duration-200 hover:border-[#0B1E3D] hover:text-[#0B1E3D] border-[1.3px] hover:-translate-y-2"
            >
              SHOW MORE
            </button>
          )}
        </div>
      </div>

      <TestimonialSlider />

      <ImagesSection />

      <PromiseSection />
    </div>
  );
}