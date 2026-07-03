"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

import LinkBar from "@/components/card/LinkBar";
import ImageLeftPart from "@/components/card/ImageLeftPart";
import SizingSystem from "@/components/card/SizingSystem";
import Description from "@/components/card/Description";
import ProductSec from "@/components/card/ProductSec";

import shirtData from "@/data/shirtData";
import sPShirtData from "@/data/sPShirtData";
import cateSlideData from "@/data/featuredData";
import categoryCardImg from "@/data/categoryCardImg";
import cartsProduct from "@/data/cartsProduct";

export default function CardPage() {
  const params = useParams<{ id: string; color: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const productId = Number(params.id);
  const product =
    shirtData.find((item) => item.id === productId) ||
    sPShirtData.find((item) => item.id === productId) ||
    cateSlideData.find((item) => item.id === productId) ||
    categoryCardImg.find((item) => item.id === productId) ||
    cartsProduct.find((item) => item.id === productId);

  const decodedColor = decodeURIComponent(params.color || "");
  const [selectedColor, setSelectedColor] = useState(
    decodedColor || product?.variants[0]?.color || ""
  );

  const detailRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!product) {
    return <div className="text-center py-20 text-lg">Product Not Found</div>;
  }

  return (
    <div className="xl:w-[92%] w-[97%] mx-auto xl:mt-[0px] mt-[55px]">
      <LinkBar productName={product.name} />
      <div className="flex items-start md:flex-row flex-col" ref={detailRef}>
        <ImageLeftPart product={product} selectedColor={selectedColor} />
        <SizingSystem product={product} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      </div>
      <Description />
      <ProductSec handleClick={handleClick} />
    </div>
  );
}