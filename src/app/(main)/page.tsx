"use client";

import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import TeamImage from "@/components/home/TeamImage";
import FactoryCard from "@/components/home/FactoryCard";
import ShirtCard from "@/components/home/ShirtCard";
import ImagesSection from "@/components/home/ImagesSection";
import type { Product } from "@/types/product";
import PromiseSection from "@/components/home/PromiseSection";
import EliteCollectionBanner from "@/components/home/EliteCollectionBanner";
import OfficialPartnersSection from "@/components/home/OfficialPartnersSection";
import CategoryShowcase from "@/components/home/CategoryShowcase";

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

      <FactoryCard />

      <section className="bg-slate-50/60 py-16 border-t border-slate-100 font-sans">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200/60">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Trending Apparel
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1426] mt-2 tracking-tight">
                LATEST HOT PRODUCTS
              </h2>
            </div>
            <p className="text-sm text-slate-500 mt-2 md:mt-0">
              Explore our premium custom sportswear & apparel lineup
            </p>
          </div>

          {/* Content Area */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
              <p className="text-base font-medium text-slate-500">
                No products available at the moment.
              </p>
            </div>
          ) : (
            <ShirtCard showMore={showMore} products={products} />
          )}

          {/* Load More Action */}
          {!loading && showMore < products.length && (
            <div className="flex justify-center mt-12">
              <button
                type="button"
                onClick={() => setShowMore((prev) => prev + 4)}
                className="px-8 py-3 bg-white text-[#0B1426] text-sm font-bold tracking-wide rounded-full border border-slate-300 shadow-sm hover:border-[#0B1426] hover:bg-[#0B1426] hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                LOAD MORE PRODUCTS ({products.length - showMore} LEFT)
              </button>
            </div>
          )}
        </div>
      </section>

      <EliteCollectionBanner />

      <OfficialPartnersSection />

      <CategoryShowcase />

      <ImagesSection />

      <PromiseSection />
    </div>
  );
}