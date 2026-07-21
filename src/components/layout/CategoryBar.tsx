"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TiThSmallOutline } from "react-icons/ti";
import { RiArrowRightSLine } from "react-icons/ri";
import { IoIosArrowUp } from "react-icons/io";
import { PiShoppingCartLight } from "react-icons/pi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import categoryLogo from "@/assets/categoryLogo.webp";
import { useCart } from "@/context/CartContext";

gsap.registerPlugin(ScrollTrigger);

interface DbSubcategory {
  name: string;
  items: string[];
}

interface DbCategory {
  _id: string;
  name: string;
  order: number;
  subcategories: DbSubcategory[];
}

function HoverLine() {
  const enter = (e: React.MouseEvent<HTMLElement>) => {
    const line = e.currentTarget.querySelector(".line");
    if (!line) return;
    gsap.fromTo(
      line,
      { scaleX: 0, transformOrigin: "left", backgroundColor: "black" },
      { scaleX: 1, duration: 0.4, ease: "power2.out", backgroundColor: "black" }
    );
  };
  const leave = (e: React.MouseEvent<HTMLElement>) => {
    const line = e.currentTarget.querySelector(".line");
    if (!line) return;
    gsap.to(line, {
      scaleX: 0,
      transformOrigin: "right",
      duration: 0.4,
      ease: "power2.out",
      backgroundColor: "black",
    });
  };
  return { enter, leave };
}

/** Top-level nav category dropdown. Supports 2-level (subcategory only) and
 *  3-level (subcategory > items) automatically — the right-side flyout only
 *  renders when a subcategory has items. */
function CategoryDropdownItem({
  category,
  topOffset,
  onEnter,
  onLeave,
}: {
  category: DbCategory;
  topOffset: string;
  onEnter: (e: React.MouseEvent<HTMLElement>) => void;
  onLeave: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative h-full flex items-center group cursor-pointer"
      onMouseEnter={(e) => {
        onEnter(e);
        setHover(true);
      }}
      onMouseLeave={(e) => {
        onLeave(e);
        setHover(false);
      }}
    >
      <Link href={`/category/${encodeURIComponent(category.name)}`} className="h-full flex items-center">
        {category.name}
      </Link>
      <span className="line absolute left-0 top-[34px] h-[2px] w-full"></span>
      <div
        className={`w-[260px] z-50 flex flex-col gap-3 h-fit pointer-events-none opacity-0 ${
          hover ? "group-hover:opacity-100" : ""
        } -translate-y-3 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 bg-white border border-gray-200 shadow-md absolute left-[-10px] ${topOffset} px-5 py-2`}
      >
        {category.subcategories.map((subCate, index) => (
          <div key={subCate.name}>
            <div
              className={`relative ${
                index !== category.subcategories.length - 1 ? "mb-3" : "mb-1"
              } mt-1 group/item w-[235px]`}
            >
              <div>
                <div className="flex items-center justify-between group font-medium cursor-pointer">
                  <Link
                    href={`/category/${encodeURIComponent(category.name)}?sub=${encodeURIComponent(subCate.name)}`}
                    className="relative text-gray-700 group-hover:text-gray-950"
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                  >
                    {subCate.name}
                    <span className="line absolute left-0 bottom-[1px] h-[1.6px] w-full"></span>
                  </Link>
                  {subCate.items.length > 0 && (
                    <RiArrowRightSLine className="absolute left-[213px] top-[4px] text-lg text-gray-500" />
                  )}
                </div>
                {subCate.items.length > 0 && (
                  <div className="w-[260px] h-fit pointer-events-none opacity-0 group-hover/item:opacity-100 -translate-y-5 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto transition-all duration-200 bg-white border border-gray-200 shadow-md absolute left-[235px] -top-[8px] px-5 py-2">
                    {subCate.items.map((item, i2) => (
                      <div
                        key={item}
                        className={`cursor-pointer mt-2 group/subItem ${
                          i2 !== subCate.items.length - 1 ? "mb-0" : "mb-1"
                        }`}
                      >
                        <Link
                          href={`/category/${encodeURIComponent(category.name)}?sub=${encodeURIComponent(item)}`}
                          className="text-sm relative text-gray-600 group-hover/subItem:text-gray-900"
                          onMouseEnter={onEnter}
                          onMouseLeave={onLeave}
                        >
                          {item}
                          <span className="line absolute left-0 -bottom-[1px] h-[1.6px] w-full"></span>
                        </Link>
                        {i2 !== subCate.items.length - 1 && (
                          <div className="w-full h-[1px] bg-gray-100 mt-[10px]"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {index !== category.subcategories.length - 1 && (
              <div className="w-full h-[2px] bg-gray-100"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Overflow categories go here as simple top-level links, keeps row from wrapping */
function MoreDropdownItem({
  items,
  topOffset,
  onEnter,
  onLeave,
}: {
  items: DbCategory[];
  topOffset: string;
  onEnter: (e: React.MouseEvent<HTMLElement>) => void;
  onLeave: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  const [hover, setHover] = useState(false);
  if (items.length === 0) return null;

  return (
    <div
      className="relative h-full flex items-center group cursor-pointer"
      onMouseEnter={(e) => {
        onEnter(e);
        setHover(true);
      }}
      onMouseLeave={(e) => {
        onLeave(e);
        setHover(false);
      }}
    >
      <span>More</span>
      <span className="line absolute left-0 top-[34px] h-[2px] w-full"></span>
      <div
        className={`w-[220px] z-50 h-fit pointer-events-none opacity-0 ${
          hover ? "group-hover:opacity-100" : ""
        } -translate-y-3 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 bg-white border border-gray-200 shadow-md absolute left-[-10px] ${topOffset} px-5 py-2`}
      >
        {items.map((category, index) => (
          <div key={category._id} className="mt-2 group/subItem">
            <Link
              href={`/category/${encodeURIComponent(category.name)}`}
              className="cursor-pointer text-sm relative inline-block text-gray-600 group-hover/subItem:text-gray-900"
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              {category.name}
              <span className="line absolute left-0 top-[19px] h-[1.7px] w-full"></span>
            </Link>
            {index !== items.length - 1 && <div className="w-full h-[1px] bg-gray-100 mt-[10px]"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Left-side "Category" icon mega menu — same categories list, full flat view */
function CategoryMegaMenu({
  categories,
  onEnter,
  onLeave,
}: {
  categories: DbCategory[];
  onEnter: (e: React.MouseEvent<HTMLElement>) => void;
  onLeave: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <div className="relative group/main">
      <div className="h-[39px] mt-2 flex gap-1 cursor-pointer">
        <TiThSmallOutline className="text-[22px] mt-[2px]" />
        <div className="flex items-center mb-3">
          <span className="text-[16px] font-medium mr-[2px]">Category</span>
          <IoIosArrowUp className="mt-[5px]" />
        </div>
      </div>
      <div className="bg-white absolute z-50 opacity-0 group-hover/main:opacity-100 pointer-events-none group-hover/main:pointer-events-auto translate-y-4 group-hover/main:translate-y-0 transition-all duration-200 top-[46px] w-[260px] h-fit border-gray-200 border shadow-md p-5">
        <div className="flex flex-col gap-4">
          {categories.map((item) => (
            <div key={item._id} className="relative group/item w-[225px]">
              <Link href={`/category/${encodeURIComponent(item.name)}`}>
                <div className="flex items-center justify-between group font-medium cursor-pointer">
                  <span
                    className="relative text-gray-700 group-hover:text-gray-950"
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                  >
                    {item.name}
                    <span className="line absolute left-0 bottom-[1px] h-[1.6px] w-full"></span>
                  </span>
                  {item.subcategories.length > 0 && (
                    <RiArrowRightSLine className="absolute left-[201px] top-[5px] text-lg text-gray-500" />
                  )}
                </div>
              </Link>
              {item.subcategories.length > 0 && (
                <div className="w-[260px] h-fit text-gray-700 pointer-events-none opacity-0 group-hover/item:opacity-100 -translate-y-5 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto transition-all duration-200 bg-white rounded-md border border-gray-200 shadow-md absolute left-[225px] -top-[4px] px-5 py-2">
                  {item.subcategories.map((sub, index) => (
                    <div className="text-sm cursor-pointer mt-2" key={sub.name}>
                      <Link href={`/category/${encodeURIComponent(item.name)}?sub=${encodeURIComponent(sub.name)}`}>
                        {sub.name}
                      </Link>
                      {index !== item.subcategories.length - 1 && (
                        <div className="w-full h-[1px] bg-gray-100 mt-[10px]"></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// How many DB categories show directly in the bar before the rest collapse into "More"
const VISIBLE_COUNT = 5;

export default function CategoryBar() {
  const { enter, leave } = HoverLine();
  const [cateShow, setCateShow] = useState(false);
  const lastScrollY = useRef(0);
  const { cart } = useCart();

  const [categories, setCategories] = useState<DbCategory[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const hideBefore = 650;

      if (currentScrollY < hideBefore) {
        setCateShow(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      setCateShow(currentScrollY < lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visibleCategories = categories.slice(0, VISIBLE_COUNT);
  const overflowCategories = categories.slice(VISIBLE_COUNT);

  return (
    <div>
      {/* Static bar */}
      <div className="w-full categoryBackground hidden xl:flex bg-[#0B1E3D] text-white">
        <div className="w-[92%] h-[47px] mx-auto flex justify-between items-center category">
          <CategoryMegaMenu categories={categories} onEnter={enter} onLeave={leave} />

          <div className="flex h-full items-center gap-5 font-semibold text-[15px] mr-2">
            <div
              className="relative h-full flex items-center cursor-pointer"
              onMouseEnter={enter}
              onMouseLeave={leave}
            >
              <Link href="/" className="h-full flex items-center">
                Home
              </Link>
              <span className="line absolute left-0 top-[34px] h-[2px] w-full"></span>
            </div>

            {visibleCategories.map((category) => (
              <CategoryDropdownItem
                key={category._id}
                category={category}
                topOffset="top-[45px]"
                onEnter={enter}
                onLeave={leave}
              />
            ))}
            <MoreDropdownItem items={overflowCategories} topOffset="top-[45px]" onEnter={enter} onLeave={leave} />

            <div>
              <Link href="/bespoke" className="text-[#FF5A36]">
                Bespoke
              </Link>
            </div>
            <div>
              <Image className="w-[40px] h-auto" src={categoryLogo} alt="Xteamwear" />
            </div>
            <div className="relative cursor-pointer" onMouseEnter={enter} onMouseLeave={leave}>
              <span>DTF Design</span>
              <span className="line absolute left-0 -bottom-1 h-[2px] w-full"></span>
            </div>

            <div className="relative cursor-pointer" onMouseEnter={enter} onMouseLeave={leave}>
              <span>All Reviews</span>
              <span className="line absolute left-0 -bottom-1 h-[2px] w-full"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bar that slides in on scroll-up */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-[#0B1E3D] text-white hidden xl:flex justify-between h-[80px] px-4 items-center transition-all duration-150 ${
          cateShow ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Link href="/">
          <h2 className="text-xl font-medium">XTEAMWEAR</h2>
        </Link>

        <CategoryMegaMenu categories={categories} onEnter={enter} onLeave={leave} />

        <div className="flex flex-wrap items-center gap-5 font-semibold text-[15px] mr-2">
          <div
            className="relative h-full flex items-center cursor-pointer"
            onMouseEnter={enter}
            onMouseLeave={leave}
          >
            <Link href="/" className="h-full flex items-center">
              Home
            </Link>
            <span className="line absolute left-0 top-[23px] h-[2px] w-full"></span>
          </div>

          {visibleCategories.map((category) => (
            <CategoryDropdownItem
              key={category._id}
              category={category}
              topOffset="top-[28px]"
              onEnter={enter}
              onLeave={leave}
            />
          ))}
          <MoreDropdownItem items={overflowCategories} topOffset="top-[28px]" onEnter={enter} onLeave={leave} />

          <div>
            <span className="text-red-600">Bespoke</span>
          </div>
          <div>
            <Image className="w-[40px] h-auto" src={categoryLogo} alt="Xteamwear" />
          </div>
          <div className="relative cursor-pointer" onMouseEnter={enter} onMouseLeave={leave}>
            <span>DTF Design</span>
            <span className="line absolute left-0 -bottom-1 h-[2px] w-full"></span>
          </div>

          <div className="relative cursor-pointer" onMouseEnter={enter} onMouseLeave={leave}>
            <span>All Reviews</span>
            <span className="line absolute left-0 -bottom-1 h-[2px] w-full"></span>
          </div>
        </div>

        <Link href="/cart" className="relative">
          <PiShoppingCartLight className="text-[32px] group-hover:scale-110 transition-all duration-200" />
          <span className="absolute -top-[9px] -right-[6px] flex items-center justify-center bg-[#FF5A36] rounded-full font-semibold text-white text-[14.5px] w-[25px] h-[25px]">
            {cart.length}
          </span>
        </Link>
      </div>
    </div>
  );
}