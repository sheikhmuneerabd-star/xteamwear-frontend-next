"use client";

import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

interface DbSubcategory {
  name: string;
  items: string[];
}

interface DbCategory {
  _id: string;
  name: string;
  subcategories: DbSubcategory[];
}

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
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openSubIndex, setOpenSubIndex] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    }
    fetchCategories();
  }, []);

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
    const index = categories.findIndex((c) => c.name === activeCategory);
    if (index !== -1) setOpenIndex(index);
  }, [activeCategory, categories]);

  useEffect(() => {
    if (!subActiveCategory || categories.length === 0) return;

    for (const cate of categories) {
      const matchedSub = cate.subcategories.find(
        (sub) => sub.name === subActiveCategory || sub.items.includes(subActiveCategory)
      );
      if (matchedSub) {
        setOpenSubIndex(`${cate._id}-${matchedSub.name}`);
        break;
      }
    }
  }, [subActiveCategory, categories]);

  return (
    <div ref={containerRef}>
      <div className="p-4 pt-1">
        <h2 className="font-medium border-b border-gray-900 pb-2">CATEGORIES</h2>

        <div className="mt-3">
          {categories.map((cate, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={cate._id} className="mb-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpenIndex(isOpen ? null : index);
                    setActiveCategory(cate.name);
                  }}
                  aria-expanded={isOpen}
                  aria-controls={`section-${index}`}
                  className="w-full flex justify-between items-center pl-0 p-2 group"
                >
                  <div className="flex w-full items-center relative">
                    <IoIosArrowForward className="text-[15px] mt-[3.3px]" />
                    <p
                      className={`text-sm font-medium absolute top-0 left-1 bg-white group-hover:translate-x-3 transition-all duration-200 ${
                        activeCategory === cate.name ? "translate-x-3 text-black" : "text-gray-600"
                      }`}
                    >
                      {cate.name}
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

                <div
                  id={`section-${index}`}
                  role="region"
                  className={`grid transition-all duration-500 overflow-hidden ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 pl-4 pb-2 space-y-1">
                    {cate.subcategories.map((sub) => {
                      const subKey = `${cate._id}-${sub.name}`;
                      const isSubOpen = openSubIndex === subKey;

                      return (
                        <div key={sub.name}>
                          <div
                            className="relative h-[30px] flex items-center justify-between cursor-pointer group pr-2"
                            onClick={() => {
                              setSubActiveCategory(sub.name);
                              if (sub.items.length > 0) {
                                setOpenSubIndex(isSubOpen ? null : subKey);
                              }
                            }}
                          >
                            <div className="flex items-center">
                              <IoIosArrowForward className="text-sm text-gray-600" />
                              <p
                                className={`absolute top-[3.3px] left-1 bg-white text-sm group-hover:translate-x-3 transition-all duration-200 ${
                                  subActiveCategory === sub.name ? "translate-x-3 text-black" : "text-gray-600"
                                }`}
                              >
                                {sub.name}
                              </p>
                            </div>
                            {sub.items.length > 0 && (
                              <IoIosArrowForward
                                className={`text-xs text-gray-400 transition-transform duration-300 ${
                                  isSubOpen ? "rotate-90" : ""
                                }`}
                              />
                            )}
                          </div>

                          {sub.items.length > 0 && (
                            <div
                              className={`grid transition-all duration-300 overflow-hidden ${
                                isSubOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                              }`}
                            >
                              <div className="min-h-0 pl-5 space-y-1">
                                {sub.items.map((it) => (
                                  <div
                                    key={it}
                                    className="relative h-[26px] flex items-center cursor-pointer group"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSubActiveCategory(it);
                                    }}
                                  >
                                    <IoIosArrowForward className="text-[11px] text-gray-400" />
                                    <p
                                      className={`absolute top-[3px] left-1 bg-white text-[13px] group-hover:translate-x-3 transition-all duration-200 ${
                                        subActiveCategory === it ? "translate-x-3 text-black" : "text-gray-500"
                                      }`}
                                    >
                                      {it}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
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