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
import type { Product } from "@/types/product";

const isMongoId = (id: string) => /^[a-f\d]{24}$/i.test(id);

export default function CardPage() {
  const params = useParams<{ id: string; color: string }>();
  const [dbProduct, setDbProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function loadProduct() {
      if (isMongoId(params.id)) {
        try {
          const res = await fetch(`/api/products/${params.id}`);
          if (res.ok) {
            const data = await res.json();
            setDbProduct({
              id: data.product._id,
              name: data.product.name,
              oldPrice: data.product.oldPrice,
              newPrice: data.product.newPrice,
              category: data.product.category,
              available: data.product.available,
              variants: data.product.variants,
            });
          }
        } catch (err) {
          console.error("Failed to fetch product", err);
        }
      }
      setLoading(false);
    }
    loadProduct();
  }, [params.id]);

  const productId = Number(params.id);
  const staticProduct: Product | undefined =
    shirtData.find((item) => item.id === productId) ||
    sPShirtData.find((item) => item.id === productId) ||
    cateSlideData.find((item) => item.id === productId) ||
    categoryCardImg.find((item) => item.id === productId) ||
    cartsProduct.find((item) => item.id === productId);

  const product = dbProduct || staticProduct;

  const decodedColor = decodeURIComponent(params.color || "");
  const [selectedColor, setSelectedColor] = useState(decodedColor);

  useEffect(() => {
    if (!selectedColor && product?.variants[0]) {
      setSelectedColor(product.variants[0].color);
    }
  }, [product, selectedColor]);

  const detailRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return (
      <div className="xl:w-[92%] w-[97%] mx-auto xl:mt-[0px] mt-[55px] animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 my-5" />
        <div className="flex items-start md:flex-row flex-col gap-8">
          <div className="xl:w-[55%] md:w-[45%] w-[90%] mx-auto md:mx-0 aspect-[4/5] bg-gray-200 rounded-md" />
          <div className="xl:w-[45%] md:w-[55%] w-full space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-10 bg-gray-200 rounded w-full" />
            <div className="h-10 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-20 text-lg">Product Not Found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb Header */}
      <LinkBar productName={product.name} />

      {/* Main Content Grid: Image Left + Customizer Right */}
      <div className="mt-6 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative">
        {/* Left Part - Image Gallery */}
        <ImageLeftPart product={product} selectedColor={selectedColor} />

        {/* Right Part - Sizing System Customizer */}
        <SizingSystem
          product={product}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </div>

      {/* Description Specs */}
      <Description />

      {/* Related Products Carousel */}
      <ProductSec
        handleClick={handleClick}
        category={product.category}
        currentProductId={product.id}
      />
    </div>
  );
}