"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

import ProductSkeleton from "@/components/category/ProductSkeleton";
import CateLinkBar from "@/components/category/CateLinkBar";
import LeftCate from "@/components/category/LeftCate";
import ClearStockBox from "@/components/category/ClearStockBox";
import Available from "@/components/category/Available";
import PriceCals from "@/components/category/PriceCals";
import FeaturedProducts from "@/components/category/FeaturedProducts";
import RightViewPage from "@/components/category/RightViewPage";
import CardCateSec from "@/components/category/CardCateSec";
import LastCateCard from "@/components/category/LastCateCard";

import lastCateCard from "@/data/lastCateCard";
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

export default function CategorySection() {
  const params = useParams<{ cateName: string }>();
  const cateName = decodeURIComponent(params.cateName || "");

  const searchParams = useSearchParams();
  const subFromUrl = decodeURIComponent(searchParams.get("sub") || "");

  const [grid, setGrid] = useState(3);
  const [itemPerPageCard, setItemPerPageCard] = useState(10);
  const options = [10, 20, 25, 30, 50];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("");
  const [subActiveCategory, setSubActiveCategory] = useState("");
  const [stockOpen, setStockOpen] = useState(false);
  const [outStockOpen, setOutStockOpen] = useState(false);

  useEffect(() => {
    if (cateName) setActiveCategory(cateName);
  }, [cateName]);

  useEffect(() => {
    setSubActiveCategory(subFromUrl);
  }, [subFromUrl]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
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
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleShowMore = () => {
    const currentIndex = options.indexOf(itemPerPageCard);
    if (currentIndex < options.length - 1) {
      setItemPerPageCard(options[currentIndex + 1]);
    }
    setTimeout(() => {
      window.scrollBy({ top: 200, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-16 text-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <CateLinkBar cateName={cateName} />
        
        <div className="flex gap-8 items-start mt-4">
          {/* Sidebar */}
          <aside className="hidden xl:block w-72 shrink-0 sticky top-4 space-y-6 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <LeftCate
              setActiveCategory={setActiveCategory}
              activeCategory={activeCategory}
              setSubActiveCategory={setSubActiveCategory}
              subActiveCategory={subActiveCategory}
            />
            <ClearStockBox 
              setStockOpen={setStockOpen} 
              stockOpen={stockOpen} 
              outStockOpen={outStockOpen} 
              setOutStockOpen={setOutStockOpen} 
            />
            <Available
              categoryCardImg={products}
              setStockOpen={setStockOpen}
              stockOpen={stockOpen}
              outStockOpen={outStockOpen}
              setOutStockOpen={setOutStockOpen}
            />
            <PriceCals />
            <FeaturedProducts />
          </aside>

          {/* Product Listing Main Area */}
          <main className="flex-1 w-full bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <RightViewPage
              grid={grid}
              selectHandle={setGrid}
              options={options}
              itemPerPageCard={itemPerPageCard}
              setItemPerPageCard={setItemPerPageCard}
            />

            {loading ? (
              <ProductSkeleton grid={grid} />
            ) : (
              <>
                <CardCateSec
                  categoryCardImg={products}
                  stockOpen={stockOpen}
                  outStockOpen={outStockOpen}
                  grid={grid}
                  itemPerPageCard={itemPerPageCard}
                  activeCategory={activeCategory}
                  subActiveCategory={subActiveCategory}
                />
                
                {itemPerPageCard < products.length && (
                  <div className="flex justify-center mt-10">
                    <button
                      type="button"
                      className="px-8 py-3 rounded-lg text-sm font-semibold bg-amber-400 hover:bg-amber-500 text-gray-900 transition-all shadow-sm hover:shadow active:scale-95"
                      onClick={handleShowMore}
                    >
                      Show More Products
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>

        {/* Recently Viewed */}
        <section className="mt-20 border-t border-gray-200 pt-12">
          <h2 className="text-center text-lg font-bold tracking-wider text-gray-900 mb-8 uppercase">
            Recently Viewed Products
          </h2>
          <div className="w-[70%] mx-auto">
            <div className="grid grid-cols-1 min-[375px]:grid-cols-2 min-[475px]:grid-cols-2 min-[768px]:grid-cols-3 min-[1024px]:grid-cols-3 min-[1440px]:grid-cols-3 w-full gap-4">
              {lastCateCard.map((shirt) => (
                <LastCateCard key={shirt.id} shirt={shirt} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}