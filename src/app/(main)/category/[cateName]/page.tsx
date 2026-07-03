"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import CateLinkBar from "@/components/category/CateLinkBar";
import LeftCate from "@/components/category/LeftCate";
import ClearStockBox from "@/components/category/ClearStockBox";
import Available from "@/components/category/Available";
import PriceCals from "@/components/category/PriceCals";
import FeaturedProducts from "@/components/category/FeaturedProducts";
import RightViewPage from "@/components/category/RightViewPage";
import CardCateSec from "@/components/category/CardCateSec";
import LastCateCard from "@/components/category/LastCateCard";

import categoryCardImg from "@/data/categoryCardImg";
import lastCateCard from "@/data/lastCateCard";

export default function CategorySection() {
  const params = useParams<{ cateName: string }>();
  const cateName = decodeURIComponent(params.cateName || "");

  const [grid, setGrid] = useState(3);
  const [itemPerPageCard, setItemPerPageCard] = useState(10);
  const options = [10, 20, 25, 30, 50];

  const [activeCategory, setActiveCategory] = useState("");
  const [subActiveCategory, setSubActiveCategory] = useState("");
  const [stockOpen, setStockOpen] = useState(false);
  const [outStockOpen, setOutStockOpen] = useState(false);

  useEffect(() => {
    if (cateName) setActiveCategory(cateName);
  }, [cateName]);

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
    <div>
      <CateLinkBar cateName={cateName} />
      <div className="flex">
        <div className="w-[19%] xl:block hidden">
          <LeftCate
            setActiveCategory={setActiveCategory}
            activeCategory={activeCategory}
            setSubActiveCategory={setSubActiveCategory}
            subActiveCategory={subActiveCategory}
          />
          <ClearStockBox setStockOpen={setStockOpen} stockOpen={stockOpen} outStockOpen={outStockOpen} setOutStockOpen={setOutStockOpen} />
          <Available
            categoryCardImg={categoryCardImg}
            setStockOpen={setStockOpen}
            stockOpen={stockOpen}
            outStockOpen={outStockOpen}
            setOutStockOpen={setOutStockOpen}
          />
          <PriceCals />
          <FeaturedProducts />
        </div>

        <div className="xl:w-[78.7%] w-[98%] mx-auto xl:ml-4">
          <div className="h-[1px] w-[98%] bg-gray-300 mt-3"></div>
          <RightViewPage
            grid={grid}
            selectHandle={setGrid}
            options={options}
            itemPerPageCard={itemPerPageCard}
            setItemPerPageCard={setItemPerPageCard}
          />
          <CardCateSec
            categoryCardImg={categoryCardImg}
            stockOpen={stockOpen}
            outStockOpen={outStockOpen}
            grid={grid}
            itemPerPageCard={itemPerPageCard}
            activeCategory={activeCategory}
          />
          <div className="flex justify-center mt-3">
            {itemPerPageCard < categoryCardImg.length && (
              <button
                type="button"
                className="rounded cursor-pointer text-sm md:w-[310px] w-[280px] md:h-[45px] h-[42px] mt-2 hover:bg-yellow-400 border-yellow-400 border-[1.5px] text-black font-medium transition-all duration-200 hover:-translate-y-1"
                onClick={handleShowMore}
              >
                Show More
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="h-[1px] mt-16 w-[90%] mx-auto bg-gray-200"></div>
      <div className="w-[70%] mx-auto mb-20">
        <h2 className="text-center text-xl font-medium mt-5 mb-5">RECENTLY VIEWED PRODUCTS</h2>
        <div className="grid grid-cols-1 min-[375px]:grid-cols-2 min-[475px]:grid-cols-2 min-[768px]:grid-cols-3 min-[1024px]:grid-cols-3 min-[1440px]:grid-cols-3 w-full gap-4">
          {lastCateCard.map((shirt) => (
            <LastCateCard key={shirt.id} shirt={shirt} />
          ))}
        </div>
      </div>
    </div>
  );
}