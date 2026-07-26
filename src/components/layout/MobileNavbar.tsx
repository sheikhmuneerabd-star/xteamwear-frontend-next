"use client";

import { useState, FormEvent, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiMiniBars3, HiOutlineUserCircle } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { MdOutlineArrowForwardIos, MdOutlineAdminPanelSettings } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";
import { RiUserAddLine, RiLogoutBoxRLine } from "react-icons/ri";
import { PiShoppingCartLight, PiUserLight } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";

export interface SubCategoryItem {
  id?: string | number;
  _id?: string;
  name: string;
  items?: string[]; // Array of inner items
}

export interface CategoryItem {
  id?: string | number;
  _id?: string;
  name: string;
  subCategories?: SubCategoryItem[];
  items?: string[];
}

export interface PopularProduct {
  id?: string | number;
  _id?: string;
  name?: string;
  slug?: string;
  price?: number;
  oldPrice?: number;
  newPrice?: number;
  salePrice?: number;
  image?: string;
  images?: string[];
  category?: string;
  tags?: string[];
  variants?: {
    icon?: string;
    images?: string[];
    color?: string;
  }[];
}

interface MobileNavbarProps {
  categoriesCategory?: CategoryItem[];
  categoriesMenu?: CategoryItem[];
  popularProducts?: PopularProduct[];
  trendingTags?: string[];
  logoUrl?: string;
  cart?: any[];
  status?: string;
  session?: any;
  signOut?: (options?: any) => void;
}

export default function MobileNavbar({
  categoriesCategory = [],
  categoriesMenu = [],
  popularProducts = [],
  trendingTags = [],
  logoUrl,
  cart = [],
  status,
  session,
  signOut,
}: MobileNavbarProps) {
  const router = useRouter();

  const [toggle, setToggle] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [activeTab, setActiveTab] = useState<"category" | "menu">("category");

  // Multi-Level Navigation States
  const [activeCategory, setActiveCategory] = useState<CategoryItem | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategoryItem | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const isAdmin =
    session?.user?.role === "admin" ||
    session?.user?.isAdmin === true ||
    session?.user?.email?.includes("admin");

  const closeAll = () => {
    setToggle(false);
    setOpenSearch(false);
    setActiveCategory(null);
    setActiveSubCategory(null);
  };

  const computedTags =
    trendingTags.length > 0
      ? trendingTags
      : categoriesCategory
          .flatMap((cat) =>
            cat.subCategories
              ? cat.subCategories.flatMap((s) => s.items || [s.name])
              : cat.items || [cat.name]
          )
          .filter(Boolean);

  const filteredProducts = useMemo(() => {
    const rawQuery = searchQuery.trim().toLowerCase();
    if (!rawQuery) return [];

    const searchWords = rawQuery.split(/\s+/).filter(Boolean);

    const matches = popularProducts.filter((prod) => {
      const title = (prod.name || "").toLowerCase();
      const cat = (prod.category || "").toLowerCase();
      const slug = (prod.slug || "").toLowerCase();
      const tags = Array.isArray(prod.tags) ? prod.tags.join(" ").toLowerCase() : "";

      const combinedText = `${title} ${cat} ${slug} ${tags}`;

      return (
        combinedText.includes(rawQuery) ||
        searchWords.some((word) => combinedText.includes(word))
      );
    });

    return matches.length > 0 ? matches : popularProducts;
  }, [searchQuery, popularProducts]);

  const handleSearchSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    if (filteredProducts.length > 0) {
      const firstProd = filteredProducts[0];
      const defaultColor = firstProd.variants?.[0]?.color || "default";
      closeAll();
      router.push(`/card/${firstProd._id || firstProd.id}/${encodeURIComponent(defaultColor)}`);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[999] shadow-sm w-full h-[56px] bg-white xl:hidden flex items-center justify-between px-4 border-b border-gray-100">
      {(toggle || openSearch) && (
        <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={closeAll} />
      )}

      {/* HEADER BAR */}
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => setToggle(true)} className="p-1 text-[#0B1E3D]">
          <HiMiniBars3 className="text-2xl" />
        </button>
        <button type="button" onClick={() => setOpenSearch(true)} className="p-1 text-[#0B1E3D]">
          <IoIosSearch className="text-2xl" />
        </button>
      </div>

      <Link href="/" onClick={closeAll}>
        {logoUrl ? (
          <Image src={logoUrl} alt="Logo" width={120} height={35} className="h-7 w-auto object-contain" />
        ) : (
          <span className="font-serif text-lg font-bold text-[#0B1E3D]">BeSpoke Wear</span>
        )}
      </Link>

      <div className="flex items-center gap-2">
        <Link href="/account" className="p-1 text-[#0B1E3D]">
          <PiUserLight className="text-2xl" />
        </Link>
        <Link href="/cart" className="relative p-1 text-[#0B1E3D]">
          <PiShoppingCartLight className="text-2xl" />
          {cart?.length > 0 && (
            <span className="absolute top-0 right-0 text-[10px] font-bold bg-[#A9762F] text-white w-4 h-4 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>
      </div>

      {/* ================= 3-LEVEL MOBILE MENU DRAWER ================= */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[340px] bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          toggle ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* TABS HEADER */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5 bg-gray-50/60">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => {
                setActiveTab("category");
                setActiveCategory(null);
                setActiveSubCategory(null);
              }}
              className={`text-[13px] font-bold uppercase tracking-wider relative py-1 ${
                activeTab === "category"
                  ? "text-[#0B1E3D] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#A9762F]"
                  : "text-gray-400"
              }`}
            >
              Categories
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("menu");
                setActiveCategory(null);
                setActiveSubCategory(null);
              }}
              className={`text-[13px] font-bold uppercase tracking-wider relative py-1 ${
                activeTab === "menu"
                  ? "text-[#0B1E3D] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#A9762F]"
                  : "text-gray-400"
              }`}
            >
              Menu
            </button>
          </div>
          <button type="button" onClick={closeAll} className="p-1 text-gray-400">
            <IoClose className="text-2xl" />
          </button>
        </div>

        <div className="relative flex-1 overflow-hidden">
          {/* LEVEL 1: MAIN CATEGORIES */}
          <div className="h-full overflow-y-auto divide-y divide-gray-100 pb-24">
            {activeTab === "menu" ? (
              <>
                <Link href="/" onClick={closeAll} className="block px-5 py-3.5 text-sm font-medium text-[#0B1E3D]">
                  Home
                </Link>
                {categoriesMenu.map((m, i) => (
                  <Link key={i} href={`/category/${encodeURIComponent(m.name.toLowerCase())}`} onClick={closeAll} className="block px-5 py-3.5 text-sm font-medium text-[#0B1E3D]">
                    {m.name}
                  </Link>
                ))}
              </>
            ) : (
              categoriesCategory.map((cat, idx) => {
                const hasSub = cat.subCategories && cat.subCategories.length > 0;
                return (
                  <div key={idx}>
                    {hasSub ? (
                      <div
                        onClick={() => setActiveCategory(cat)}
                        className="flex items-center justify-between px-5 py-3.5 text-sm font-medium text-[#0B1E3D] cursor-pointer hover:bg-gray-50"
                      >
                        <span>{cat.name}</span>
                        <MdOutlineArrowForwardIos className="text-xs text-[#A9762F]" />
                      </div>
                    ) : (
                      <Link
                        href={`/category/${encodeURIComponent(cat.name.toLowerCase())}`}
                        onClick={closeAll}
                        className="block px-5 py-3.5 text-sm font-medium text-[#0B1E3D]"
                      >
                        {cat.name}
                      </Link>
                    )}
                  </div>
                );
              })
            )}

            {/* AUTH / ADMIN BUTTONS */}
            <div className="pt-3 mt-4 border-t border-gray-100 bg-gray-50/50">
              {status === "authenticated" ? (
                <>
                  <div className="flex items-center gap-3 px-5 py-2.5 text-xs text-[#0B1E3D] font-medium">
                    <HiOutlineUserCircle className="text-xl text-[#A9762F]" />
                    <span className="truncate">Hi, {session?.user?.name || "User"}</span>
                  </div>
                  {isAdmin && (
                    <Link
                      href="/admin/dashboard"
                      onClick={closeAll}
                      className="flex items-center gap-3 px-5 py-3 text-xs font-semibold text-[#A9762F]"
                    >
                      <MdOutlineAdminPanelSettings className="text-xl" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => { closeAll(); if (signOut) signOut({ callbackUrl: "/" }); }}
                    className="w-full flex items-center gap-3 px-5 py-3 text-xs text-red-600 hover:bg-red-50 text-left font-medium"
                  >
                    <RiLogoutBoxRLine className="text-lg" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/sign-in" onClick={closeAll} className="flex items-center gap-3 px-5 py-3 text-xs font-medium text-[#0B1E3D]">
                    <HiOutlineUserCircle className="text-xl text-[#A9762F]" />
                    <span>Sign In</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* LEVEL 2: SUBCATEGORIES SLIDE-OVER */}
          <div
            className={`absolute inset-0 bg-white z-10 flex flex-col transition-transform duration-300 ${
              activeCategory ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center gap-3 px-4 py-3.5 bg-gray-50 border-b border-gray-100">
              <button type="button" onClick={() => setActiveCategory(null)} className="p-1 text-[#0B1E3D]">
                <BsArrowLeft className="text-lg" />
              </button>
              <span className="font-bold text-sm text-[#0B1E3D]">{activeCategory?.name}</span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-100 pb-20">
              <Link
                href={`/category/${encodeURIComponent(activeCategory?.name?.toLowerCase() || "")}`}
                onClick={closeAll}
                className="block px-5 py-3.5 text-xs font-bold text-[#A9762F] hover:bg-gray-50"
              >
                View All {activeCategory?.name}
              </Link>

              {activeCategory?.subCategories?.map((sub, idx) => {
                const hasItems = sub.items && sub.items.length > 0;
                return (
                  <div key={idx}>
                    {hasItems ? (
                      <div
                        onClick={() => setActiveSubCategory(sub)}
                        className="flex items-center justify-between px-5 py-3.5 text-xs text-gray-700 font-medium cursor-pointer hover:bg-gray-50"
                      >
                        <span>{sub.name}</span>
                        <MdOutlineArrowForwardIos className="text-[10px] text-[#A9762F]" />
                      </div>
                    ) : (
                      <Link
                        href={`/category/${encodeURIComponent(
                          activeCategory.name.toLowerCase()
                        )}/${encodeURIComponent(sub.name.toLowerCase())}`}
                        onClick={closeAll}
                        className="block px-5 py-3.5 text-xs text-gray-700 hover:bg-gray-50"
                      >
                        {sub.name}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* LEVEL 3: INNER ITEMS SLIDE-OVER */}
          <div
            className={`absolute inset-0 bg-white z-20 flex flex-col transition-transform duration-300 ${
              activeSubCategory ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center gap-3 px-4 py-3.5 bg-gray-50 border-b border-gray-100">
              <button type="button" onClick={() => setActiveSubCategory(null)} className="p-1 text-[#0B1E3D]">
                <BsArrowLeft className="text-lg" />
              </button>
              <span className="font-bold text-sm text-[#0B1E3D]">{activeSubCategory?.name}</span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-100 pb-20">
              <Link
                href={`/category/${encodeURIComponent(
                  activeCategory?.name?.toLowerCase() || ""
                )}/${encodeURIComponent(activeSubCategory?.name?.toLowerCase() || "")}`}
                onClick={closeAll}
                className="block px-5 py-3.5 text-xs font-bold text-[#A9762F] hover:bg-gray-50"
              >
                View All {activeSubCategory?.name}
              </Link>

              {activeSubCategory?.items?.map((item, idx) => (
                <Link
                  key={idx}
                  href={`/category/${encodeURIComponent(
                    activeCategory?.name?.toLowerCase() || ""
                  )}/${encodeURIComponent(
                    activeSubCategory?.name?.toLowerCase() || ""
                  )}?item=${encodeURIComponent(item.toLowerCase())}`}
                  onClick={closeAll}
                  className="block px-5 py-3.5 text-xs text-gray-600 hover:bg-gray-50"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH DRAWER REMAINS THE SAME */}
    </div>
  );
}