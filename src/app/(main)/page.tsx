"use client";

import { useEffect, useState } from "react";
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
import TestimonialSlider from "@/components/home/TestimonialSlider";

export default function HomePage() {
  const [showMore, setShowMore] = useState(4);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        const mapped: Product[] = (data.products || []).map((p: any) => ({
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

  return (
    <main className="w-full bg-white text-slate-900 font-sans overflow-x-hidden selection:bg-amber-500 selection:text-white">
      
      {/* 1. HERO BANNER */}
      <section className="w-full bg-white">
        <TeamImage />
      </section>

      {/* 2. ADVANTAGES GRID (Factory / Features) */}
      <section className="w-full bg-slate-50/80 py-12 sm:py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FactoryCard />
        </div>
      </section>

      {/* 3. LATEST HOT PRODUCTS */}
      <section className="w-full bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Trending Apparel
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-2 tracking-tight uppercase">
                Latest Hot Products
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 md:mt-0 font-medium">
              Explore our premium custom sportswear & apparel lineup
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <ShirtCard showMore={showMore} products={products} />
          )}

          {!loading && showMore < products.length && (
            <div className="flex justify-center mt-12">
              <button
                type="button"
                onClick={() => setShowMore((prev) => prev + 4)}
                className="px-8 py-3.5 bg-slate-950 text-white text-xs font-black tracking-widest uppercase rounded-full shadow-md hover:bg-amber-500 hover:text-slate-950 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Load More Products ({products.length - showMore} Left)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. ELITE COLLECTION BANNER (Now Light Boxed Layout) */}
      <section className="w-full bg-slate-50 py-16 sm:py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EliteCollectionBanner />
        </div>
      </section>

      {/* 5. PRO TEAM SPOTLIGHT (LIGHT BACKGROUND) */}
      <section className="w-full bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OfficialPartnersSection />
        </div>
      </section>

      {/* 6. CURATED CATEGORIES (LIGHT BACKGROUND) */}
      <section className="w-full bg-slate-50/80 py-16 sm:py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryShowcase />
        </div>
      </section>

      {/* 7. JOIN THE GLOBAL SQUAD (LIGHT BACKGROUND) */}
      <section className="w-full bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImagesSection />
        </div>
      </section>

      {/* 8. TESTIMONIALS & REVIEWS (LIGHT BACKGROUND) */}
      <section className="w-full bg-slate-50/80 py-16 sm:py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialSlider />
        </div>
      </section>

      {/* 9. BRAND PROMISE & GUARANTEE */}
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PromiseSection />
        </div>
      </section>

    </main>
  );
}