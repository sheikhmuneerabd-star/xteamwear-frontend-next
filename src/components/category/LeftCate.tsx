"use client";

import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import leftCategoriesData from "@/data/leftCategoryData";

interface LeftCateProps {
  setActiveCategory: (title: string) => void;
  activeCategory: string;
  setSubActiveCategory: (item: string) => void;
  subActiveCategory: string;
}

export default function LeftCate({
  setActiveCategory,
  activeCategory,
  setSubActiveCategory,
  subActiveCategory,
}: LeftCateProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const index = leftCategoriesData.findIndex((c) => c.title === activeCategory);
    if (index !== -1) setOpenIndex(index);
  }, [activeCategory]);

  return (
    <div ref={containerRef}>
      <div className="p-4 pt-1">
        <h2 className="font-medium border-b border-gray-900 pb-2">CATEGORIES</h2>

        <div className="mt-3">
          {leftCategoriesData.map((cate, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={cate.id} className="mb-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpenIndex(isOpen ? null : index);
                    setActiveCategory(cate.title);
                  }}
                  aria-expanded={isOpen}
                  aria-controls={`section-${index}`}
                  className="w-full flex cursor-pointer justify-between items-center pl-0 p-2 group"
                >
                  <div className="flex w-full items-center relative">
                    <IoIosArrowForward className="text-[15px] mt-[3.3px]" />
                    <p
                      className={`text-sm font-medium absolute top-0 left-1 bg-white group-hover:translate-x-3 transition-all duration-200 ${
                        activeCategory === cate.title ? "translate-x-3 text-black" : "text-gray-600"
                      }`}
                    >
                      {cate.title}
                    </p>
                  </div>

                  <div className="relative mb-2">
                    <div
                      className={`absolute transition-all duration-500 ${
                        isOpen ? "rotate-90" : ""
                      } top-0 left-1 w-[2px] h-[10px] bg-gray-800`}
                    />
                    <div
                      className={`absolute transition-all duration-500 ${
                        isOpen ? "rotate-180" : ""
                      } top-1 w-[10px] h-[2px] bg-gray-800`}
                    />
                  </div>
                </button>

                {/* CSS grid-rows accordion — no ref/scrollHeight measurement needed,
                    avoids the "useRef inside .map()" hook-rule violation from the original */}
                <div
                  id={`section-${index}`}
                  role="region"
                  className={`grid transition-all duration-500 overflow-hidden ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 pl-4 pb-2 space-y-1">
                    {cate.items.map((item, i) => (
                      <div
                        key={i}
                        className="relative h-[30px] flex items-center cursor-pointer group"
                        onClick={() => setSubActiveCategory(item)}
                      >
                        <IoIosArrowForward className="text-sm text-gray-600" />
                        <p
                          className={`absolute top-[3.3px] left-1 bg-white text-sm group-hover:translate-x-3 transition-all duration-200 ${
                            subActiveCategory === item ? "translate-x-3 text-black" : "text-gray-600"
                          }`}
                        >
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}