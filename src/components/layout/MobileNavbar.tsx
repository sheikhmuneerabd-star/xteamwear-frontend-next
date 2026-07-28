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
import MobileDrawer from "./MobileDrawer";

// Nested Category Interfaces
export interface SubCategoryItem {
  id?: string | number;
  _id?: string;
  name: string;
  items?: string[]; // E.g., ["Jerseys", "Shorts", "Socks"]
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
  status?: "authenticated" | "unauthenticated" | "loading" | string;
  session?: {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null; // Admin role check
      isAdmin?: boolean;
    };
  } | null;
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

  // Drawers State
  const [toggle, setToggle] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [activeTab, setActiveTab] = useState<"category" | "menu">("category");

  // Multi-Level Navigation States
  const [activeCategory, setActiveCategory] = useState<CategoryItem | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<SubCategoryItem | string | null>(null);

  // Search Query
  const [searchQuery, setSearchQuery] = useState("");

  // Admin Check
  const isAdmin =
    session?.user?.role === "admin" ||
    session?.user?.isAdmin === true ||
    session?.user?.email?.includes("admin");

  const closeAll = () => {
    setToggle(false);
    setOpenSearch(false);
    setActiveCategory(null);
    setActiveSubMenu(null);
  };

  const computedTags =
    trendingTags.length > 0
      ? trendingTags
      : categoriesCategory
          .flatMap((cat) =>
            cat.subCategories
              ? cat.subCategories.map((s) => s.name)
              : cat.items || [cat.name]
          )
          .filter(Boolean);

  // Advanced Search Matching with Fallback
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

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[999] shadow-sm w-full h-[56px] bg-white xl:hidden flex items-center justify-between px-4 border-b border-gray-100">
      {/* BACKDROP OVERLAY */}
      {(toggle || openSearch) && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm transition-opacity"
          onClick={closeAll}
        />
      )}

      {/* LEFT SECTION (MENU & SEARCH BUTTONS) */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setToggle(true)}
          className="p-1 text-[#0B1E3D] hover:opacity-75 transition-opacity"
          aria-label="Open Navigation Menu"
        >
          <HiMiniBars3 className="text-2xl" />
        </button>

        <button
          type="button"
          onClick={() => setOpenSearch(true)}
          className="p-1 text-[#0B1E3D] hover:opacity-75 transition-opacity"
          aria-label="Open Search Drawer"
        >
          <IoIosSearch className="text-2xl" />
        </button>
      </div>

      {/* LOGO */}
      <Link href="/" onClick={closeAll} className="flex items-center justify-center">
        {logoUrl ? (
          <Image src={logoUrl} alt="Logo" width={120} height={35} className="h-7 w-auto object-contain" />
        ) : (
          <span className="font-serif text-lg font-bold tracking-tight text-[#0B1E3D]">
            BeSpoke Wear
          </span>
        )}
      </Link>

      {/* RIGHT SECTION (ACCOUNT & CART) */}
      <div className="flex items-center gap-2">
        <Link href="/account" className="p-1 text-[#0B1E3D]" aria-label="Account">
          <PiUserLight className="text-2xl" />
        </Link>
        <Link href="/cart" className="relative p-1 text-[#0B1E3D]" aria-label="Cart">
          <PiShoppingCartLight className="text-2xl" />
          {cart?.length > 0 && (
            <span className="absolute top-0 right-0 text-[10px] font-bold bg-[#A9762F] text-white w-4 h-4 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>
      </div>

      {/* ================= ADVANCED SEARCH DRAWER ================= */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[350px] bg-white z-50 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          openSearch ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="font-bold text-lg text-[#0B1E3D]">Search</h2>
          <button type="button" onClick={() => setOpenSearch(false)} className="p-1 text-gray-500">
            <IoClose className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSearchSubmit} className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3 border-b border-gray-300 pb-2 focus-within:border-[#A9762F]">
            <IoIosSearch className="text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search the store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm outline-none bg-transparent"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-gray-400 hover:text-black text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </form>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {!searchQuery.trim() ? (
            <>
              {computedTags.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#A9762F] mb-3">
                    Trending — Categories & Items
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {computedTags.map((tag, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleTagClick(tag)}
                        className="px-3 py-1 rounded-full border border-gray-200 text-xs text-gray-700 bg-white hover:border-[#A9762F] hover:text-[#A9762F]"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#0B1E3D] mb-3">
                  Popular Products
                </p>
                <div className="space-y-3">
                  {popularProducts.slice(0, 5).map((prod, idx) => {
                    const firstVariant = prod.variants?.[0];
                    const displayImage =
                      firstVariant?.icon ||
                      firstVariant?.images?.[0] ||
                      prod.image ||
                      prod.images?.[0] ||
                      "/placeholder.png";

                    const displayPrice = prod.newPrice ?? prod.price ?? prod.salePrice ?? 0;
                    const oldPrice = prod.oldPrice;
                    const defaultColor = firstVariant?.color || "default";

                    return (
                      <Link
                        key={prod._id || prod.id || idx}
                        href={`/card/${prod._id || prod.id}/${encodeURIComponent(defaultColor)}`}
                        onClick={closeAll}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 border border-gray-100 group"
                      >
                        <div className="relative w-14 h-16 bg-[#F5F5F7] rounded-md overflow-hidden shrink-0">
                          <Image
                            src={displayImage}
                            alt={prod.name || "Product"}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#0B1E3D] line-clamp-2 group-hover:text-[#A9762F]">
                            {prod.name}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-xs font-bold text-[#A9762F]">
                              ${displayPrice.toFixed(2)} USD
                            </span>
                            {oldPrice && oldPrice > displayPrice && (
                              <span className="text-[10px] text-gray-400 line-through">
                                ${oldPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#0B1E3D]">
                  PRODUCTS FOUND ({filteredProducts.length})
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-[#A9762F] font-semibold hover:underline"
                >
                  Reset
                </button>
              </div>

              <div className="space-y-3">
                {filteredProducts.map((prod, idx) => {
                  const firstVariant = prod.variants?.[0];
                  const displayImage =
                    firstVariant?.icon ||
                    firstVariant?.images?.[0] ||
                    prod.image ||
                    prod.images?.[0] ||
                    "/placeholder.png";

                  const displayPrice = prod.newPrice ?? prod.price ?? prod.salePrice ?? 0;
                  const oldPrice = prod.oldPrice;
                  const defaultColor = firstVariant?.color || "default";

                  return (
                    <Link
                      key={prod._id || prod.id || idx}
                      href={`/card/${prod._id || prod.id}/${encodeURIComponent(defaultColor)}`}
                      onClick={closeAll}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 border border-gray-100 group"
                    >
                      <div className="relative w-14 h-16 bg-[#F5F5F7] rounded-md overflow-hidden shrink-0">
                        <Image
                          src={displayImage}
                          alt={prod.name || "Product"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#0B1E3D] line-clamp-2 group-hover:text-[#A9762F]">
                          {prod.name}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-xs font-bold text-[#A9762F]">
                            ${displayPrice.toFixed(2)} USD
                          </span>
                          {oldPrice && oldPrice > displayPrice && (
                            <span className="text-[10px] text-gray-400 line-through">
                              ${oldPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* STANDALONE SEPARATE MOBILE DRAWER COMPONENT */}
      <MobileDrawer
        isOpen={toggle}
        onClose={() => setToggle(false)}
        categoriesCategory={categoriesCategory}
        categoriesMenu={categoriesMenu}
        status={status}
        session={session}
        signOut={signOut}
      />
    </div>
  );
}