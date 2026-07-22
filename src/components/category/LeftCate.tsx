"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Categories fetch failed", err);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="w-full">
      <h2 className="font-bold text-sm tracking-wider text-gray-900 uppercase border-b border-gray-200 pb-3">
        Categories
      </h2>

      <div className="mt-3 space-y-1">
        {categories.map((cate, index) => {
          const isOpen = openIndex === index;
          const isActive = activeCategory === cate.name;

          return (
            <div key={cate._id} className="text-sm">
              <button
                type="button"
                onClick={() => {
                  setOpenIndex(isOpen ? null : index);
                  setActiveCategory(cate.name);
                }}
                className={`w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gray-100 text-black font-semibold shadow-xs"
                    : "text-gray-700 hover:bg-gray-50 hover:text-black"
                }`}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <IoIosArrowForward
                    className={`text-xs text-gray-500 transition-transform duration-300 ${
                      isOpen ? "rotate-90 text-black" : ""
                    }`}
                  />
                  <span className="truncate">{cate.name}</span>
                </div>
              </button>

              {/* Collapsible Subcategory Dropdown with Smooth Height Animation */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100 mt-1 mb-2" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden pl-4 space-y-1 border-l-2 border-gray-100 ml-3">
                  {cate.subcategories?.map((sub) => {
                    const subKey = `${cate._id}-${sub.name}`;
                    const isSubOpen = openSubIndex === subKey;
                    const isSubActive = subActiveCategory === sub.name;

                    return (
                      <div key={sub.name}>
                        <div
                          className={`flex items-center justify-between py-1.5 px-2 rounded-md cursor-pointer text-xs font-medium transition-colors ${
                            isSubActive
                              ? "text-amber-600 bg-amber-50 font-semibold"
                              : "text-gray-600 hover:text-black hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            setSubActiveCategory(sub.name);
                            if (sub.items?.length > 0)
                              setOpenSubIndex(isSubOpen ? null : subKey);
                          }}
                        >
                          <span className="truncate">{sub.name}</span>
                          {sub.items?.length > 0 && (
                            <IoIosArrowForward
                              className={`text-[10px] transition-transform duration-200 ${
                                isSubOpen ? "rotate-90" : ""
                              }`}
                            />
                          )}
                        </div>

                        {/* Items Dropdown */}
                        <div
                          className={`grid transition-all duration-200 ease-in-out ${
                            isSubOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden pl-3 space-y-1 my-1">
                            {sub.items?.map((it) => (
                              <div
                                key={it}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSubActiveCategory(it);
                                }}
                                className={`py-1 text-[12px] cursor-pointer transition-colors ${
                                  subActiveCategory === it
                                    ? "text-black font-semibold"
                                    : "text-gray-500 hover:text-black"
                                }`}
                              >
                                {it}
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
        })}
      </div>
    </div>
  );
}