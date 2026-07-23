"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { 
  HiOutlineSquares2X2, 
  HiChevronDown, 
  HiChevronRight 
} from "react-icons/hi2";
import { PiShoppingCartLight } from "react-icons/pi";
import { useCart } from "@/context/CartContext";

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

const VISIBLE_COUNT = 5;

export default function CategoryBar() {
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  const lastScrollY = useRef(0);
  const { cart } = useCart();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 400) {
        setIsStickyVisible(false);
      } else {
        setIsStickyVisible(currentScrollY < lastScrollY.current);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visibleCategories = categories.slice(0, VISIBLE_COUNT);
  const overflowCategories = categories.slice(VISIBLE_COUNT);

  return (
    <>
      {/* ================= 1. PRIMARY CATEGORY BAR (NORMAL SCROLL) ================= */}
      <nav className="w-full bg-[#0B1426] text-slate-100 hidden xl:block border-t border-slate-800/80 font-sans">
        <div className="max-w-[1440px] h-[56px] mx-auto px-6 flex justify-between items-center">
          
          {/* All Categories Dropdown Trigger */}
          <div className="relative group/megamenu">
            <Link href="/category/all">
              <button className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-[15px] font-semibold text-white transition-all duration-200 cursor-pointer">
                <HiOutlineSquares2X2 className="text-xl text-amber-500" />
                <span>All Categories</span>
                <HiChevronDown className="text-sm text-slate-300 group-hover/megamenu:rotate-180 transition-transform duration-200" />
              </button>
            </Link>

            {/* Level 1 Mega Menu */}
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover/megamenu:opacity-100 group-hover/megamenu:visible transition-all duration-200 z-50">
              <div className="w-[280px] bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 p-2.5 space-y-1">
                {categories.map((cat) => (
                  <div key={cat._id} className="relative group/sub1">
                    <Link
                      href={`/category/${encodeURIComponent(cat.name)}`}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[15px] font-semibold text-slate-800 hover:bg-slate-100 hover:text-amber-600 transition-colors"
                    >
                      <span>{cat.name}</span>
                      {cat.subcategories?.length > 0 && (
                        <HiChevronRight className="text-slate-400 text-sm" />
                      )}
                    </Link>

                    {/* Level 2 Subcategories */}
                    {cat.subcategories?.length > 0 && (
                      <div className="absolute left-full top-0 pl-2 opacity-0 invisible group-hover/sub1:opacity-100 group-hover/sub1:visible transition-all duration-200">
                        <div className="w-[260px] bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 p-2.5 space-y-1">
                          {cat.subcategories.map((sub) => (
                            <div key={sub.name} className="relative group/sub2">
                              <Link
                                href={`/category/${encodeURIComponent(cat.name)}?sub=${encodeURIComponent(sub.name)}`}
                                className="flex items-center justify-between px-3.5 py-2 rounded-lg text-[14px] font-medium text-slate-700 hover:bg-slate-100 hover:text-amber-600 transition-colors"
                              >
                                <span>{sub.name}</span>
                                {sub.items?.length > 0 && (
                                  <HiChevronRight className="text-slate-400 text-xs" />
                                )}
                              </Link>

                              {/* Level 3 Child Items */}
                              {sub.items?.length > 0 && (
                                <div className="absolute left-full top-0 pl-2 opacity-0 invisible group-hover/sub2:opacity-100 group-hover/sub2:visible transition-all duration-200">
                                  <div className="w-[240px] bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 p-2 space-y-1">
                                    {sub.items.map((item) => (
                                      <Link
                                        key={item}
                                        href={`/category/${encodeURIComponent(cat.name)}?sub=${encodeURIComponent(item)}`}
                                        className="block px-3.5 py-2 rounded-lg text-[14px] font-medium text-slate-600 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                                      >
                                        {item}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Links */}
          <div className="flex items-center gap-2 font-semibold text-[15px]">
            <Link href="/" className="px-4 py-2 rounded-md hover:text-amber-400 transition-colors duration-200">
              Home
            </Link>

            {visibleCategories.map((cat) => (
              <div key={cat._id} className="relative group/mainCat">
                <Link
                  href={`/category/${encodeURIComponent(cat.name)}`}
                  className="flex items-center gap-1.5 px-4 py-2 hover:text-amber-400 transition-colors duration-200"
                >
                  <span>{cat.name}</span>
                  {cat.subcategories?.length > 0 && (
                    <HiChevronDown className="text-xs text-slate-400 group-hover/mainCat:rotate-180 transition-transform" />
                  )}
                </Link>

                {/* Level 2 Dropdown */}
                {cat.subcategories?.length > 0 && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/mainCat:opacity-100 group-hover/mainCat:visible transition-all duration-200 z-50">
                    <div className="w-[260px] bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 p-2.5 space-y-1">
                      {cat.subcategories.map((sub) => (
                        <div key={sub.name} className="relative group/navSub2">
                          <Link
                            href={`/category/${encodeURIComponent(cat.name)}?sub=${encodeURIComponent(sub.name)}`}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[14px] font-medium text-slate-700 hover:bg-slate-100 hover:text-amber-600 transition-colors"
                          >
                            <span>{sub.name}</span>
                            {sub.items?.length > 0 && (
                              <HiChevronRight className="text-slate-400 text-xs" />
                            )}
                          </Link>

                          {/* Level 3 Dropdown */}
                          {sub.items?.length > 0 && (
                            <div className="absolute left-full top-0 pl-2 opacity-0 invisible group-hover/navSub2:opacity-100 group-hover/navSub2:visible transition-all duration-200">
                              <div className="w-[240px] bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 p-2 space-y-1">
                                {sub.items.map((item) => (
                                  <Link
                                    key={item}
                                    href={`/category/${encodeURIComponent(cat.name)}?sub=${encodeURIComponent(item)}`}
                                    className="block px-3.5 py-2 rounded-lg text-[14px] font-medium text-slate-600 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Overflow 'More' Dropdown */}
            {overflowCategories.length > 0 && (
              <div className="relative group/more">
                <button className="flex items-center gap-1.5 px-4 py-2 hover:text-amber-400 font-semibold text-[15px] cursor-pointer">
                  <span>More</span>
                  <HiChevronDown className="text-xs text-slate-400 group-hover/more:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/more:opacity-100 group-hover/more:visible transition-all duration-200 z-50">
                  <div className="w-[220px] bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 p-2 space-y-1">
                    {overflowCategories.map((cat) => (
                      <Link
                        key={cat._id}
                        href={`/category/${encodeURIComponent(cat.name)}`}
                        className="block px-3.5 py-2 rounded-lg text-[14px] font-medium text-slate-700 hover:bg-slate-100 hover:text-amber-600 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Links */}
          <div className="flex items-center gap-5">
            <Link
              href="/bespoke"
              className="px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-[14px] font-semibold hover:bg-amber-500 hover:text-slate-950 transition-all border border-amber-500/20"
            >
              Tailored Bespoke
            </Link>
            <Link
              href="/reviews"
              className="text-[14px] font-medium text-slate-200 hover:text-amber-400 transition-colors"
            >
              All Reviews
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= 2. STICKY CATEGORY BAR (EXACT MATCH) ================= */}
      <div 
        className={`w-full hidden xl:block bg-[#0B1426] text-slate-100 border-b border-slate-800 shadow-2xl fixed top-0 left-0 z-50 transition-all duration-300 font-sans ${
          isStickyVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-[1440px] h-[56px] mx-auto px-6 flex justify-between items-center">
          
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white tracking-wider">
            <span className="text-amber-500 text-xl font-black">∞</span>
            <span>BESPOKE WEAR</span>
          </Link>

          {/* Center Links (Exact Identical to Top Bar) */}
          <div className="flex items-center gap-2 font-semibold text-[15px]">
            <Link href="/" className="px-4 py-2 rounded-md hover:text-amber-400 transition-colors duration-200">
              Home
            </Link>

            {visibleCategories.map((cat) => (
              <div key={cat._id} className="relative group/stickyCat">
                <Link
                  href={`/category/${encodeURIComponent(cat.name)}`}
                  className="flex items-center gap-1.5 px-4 py-2 hover:text-amber-400 transition-colors duration-200"
                >
                  <span>{cat.name}</span>
                  {cat.subcategories?.length > 0 && (
                    <HiChevronDown className="text-xs text-slate-400 group-hover/stickyCat:rotate-180 transition-transform" />
                  )}
                </Link>

                {/* Level 2 White Dropdown */}
                {cat.subcategories?.length > 0 && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/stickyCat:opacity-100 group-hover/stickyCat:visible transition-all duration-200 z-50">
                    <div className="w-[260px] bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 p-2.5 space-y-1">
                      {cat.subcategories.map((sub) => (
                        <div key={sub.name} className="relative group/stickySub2">
                          <Link
                            href={`/category/${encodeURIComponent(cat.name)}?sub=${encodeURIComponent(sub.name)}`}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[14px] font-medium text-slate-700 hover:bg-slate-100 hover:text-amber-600 transition-colors"
                          >
                            <span>{sub.name}</span>
                            {sub.items?.length > 0 && (
                              <HiChevronRight className="text-slate-400 text-xs" />
                            )}
                          </Link>

                          {/* Level 3 White Flyout Dropdown */}
                          {sub.items?.length > 0 && (
                            <div className="absolute left-full top-0 pl-2 opacity-0 invisible group-hover/stickySub2:opacity-100 group-hover/stickySub2:visible transition-all duration-200">
                              <div className="w-[240px] bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 p-2 space-y-1">
                                {sub.items.map((item) => (
                                  <Link
                                    key={item}
                                    href={`/category/${encodeURIComponent(cat.name)}?sub=${encodeURIComponent(item)}`}
                                    className="block px-3.5 py-2 rounded-lg text-[14px] font-medium text-slate-600 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Overflow 'More' Dropdown */}
            {overflowCategories.length > 0 && (
              <div className="relative group/stickyMore">
                <button className="flex items-center gap-1.5 px-4 py-2 hover:text-amber-400 font-semibold text-[15px] cursor-pointer">
                  <span>More</span>
                  <HiChevronDown className="text-xs text-slate-400 group-hover/stickyMore:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/stickyMore:opacity-100 group-hover/stickyMore:visible transition-all duration-200 z-50">
                  <div className="w-[220px] bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 p-2 space-y-1">
                    {overflowCategories.map((cat) => (
                      <Link
                        key={cat._id}
                        href={`/category/${encodeURIComponent(cat.name)}`}
                        className="block px-3.5 py-2 rounded-lg text-[14px] font-medium text-slate-700 hover:bg-slate-100 hover:text-amber-600 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Shopping Bag Icon + Tailored Bespoke */}
          <div className="flex items-center gap-5">
            <Link
              href="/bespoke"
              className="px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-[14px] font-semibold hover:bg-amber-500 hover:text-slate-950 transition-all border border-amber-500/20"
            >
              Tailored Bespoke
            </Link>

            <Link href="/cart" className="text-slate-200 hover:text-amber-400 transition-colors relative p-1.5">
              <PiShoppingCartLight className="text-2xl" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}