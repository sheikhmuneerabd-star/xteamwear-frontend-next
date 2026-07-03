"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import type { Product } from "@/types/product";

interface ImageLeftPartProps {
  product: Product;
  selectedColor: string;
}

export default function ImageLeftPart({ product, selectedColor }: ImageLeftPartProps) {
  const selectedVariant =
    product.variants.find((v) => v.color === selectedColor) || product.variants[0];

  const [activeImage, setActiveImage] = useState<StaticImageData>(selectedVariant.images[0]);

  useEffect(() => {
    setActiveImage(selectedVariant.images[0]);
  }, [selectedVariant]);

  const discount = Math.round(
    ((product.oldPrice - product.newPrice) / product.oldPrice) * 100
  );

  return (
    <div className="xl:w-[55%] md:w-[45%] w-[90%] md:mx-0 mx-auto sticky top-8">
      <div className="relative">
        <Image className="w-full h-auto" src={activeImage} alt={product.name} priority />
        <span className="bg-red-500 text-[14px] absolute top-0 right-0 text-white px-2 py-[1px]">
          Sale {discount}%
        </span>
      </div>

      <div className="relative mt-10 md:block hidden">
        <Swiper
          modules={[Navigation]}
          navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
          slidesPerView={3}
          spaceBetween={16}
          loop
          onSlideChange={(swiper) => setActiveImage(selectedVariant.images[swiper.realIndex])}
        >
          {selectedVariant.images.map((img, i) => (
            <SwiperSlide key={i}>
              <Image
                src={img}
                onClick={() => setActiveImage(img)}
                className="cursor-pointer w-full h-auto"
                alt={`${product.name} view ${i + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full cursor-pointer z-50">
          <IoIosArrowBack />
        </div>
        <div className="custom-next absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full cursor-pointer z-50">
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
}