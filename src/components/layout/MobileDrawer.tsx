"use client";

import { useState } from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { MdOutlineArrowForwardIos, MdOutlineAdminPanelSettings } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { RiLogoutBoxRLine } from "react-icons/ri";

export interface DbSubcategory {
  name: string;
  items?: string[];
}

export interface DbCategory {
  _id?: string;
  id?: string | number;
  name: string;
  order?: number;
  subcategories?: DbSubcategory[];
  subCategories?: DbSubcategory[];
  items?: string[];
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categoriesCategory?: DbCategory[];
  categoriesMenu?: DbCategory[];
  status?: string;
  session?: any;
  signOut?: (options?: any) => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  categoriesCategory = [],
  categoriesMenu = [],
  status,
  session,
  signOut,
}: MobileDrawerProps) {
  const [activeTab, setActiveTab] = useState<"category" | "menu">("category");
  const [activeCategory, setActiveCategory] = useState<DbCategory | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<DbSubcategory | null>(null);

  const isAdmin =
    session?.user?.role === "admin" ||
    session?.user?.isAdmin === true ||
    session?.user?.email?.includes("admin");

  const resetAndClose = () => {
    setActiveCategory(null);
    setActiveSubCategory(null);
    onClose();
  };

  const getSubcategories = (cat: DbCategory): DbSubcategory[] => {
    return cat.subcategories || cat.subCategories || [];
  };

  // Dedicated data fallback - if categoriesMenu is not supplied, use main categories list for Menu
  const effectiveMenuList = categoriesMenu.length > 0 ? categoriesMenu : categoriesCategory;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={resetAndClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header Tabs */}
        <div className="p-3 bg-slate-50 border-b border-gray-100 flex items-center justify-between gap-2">
          <div className="flex-1 bg-gray-200/70 p-1 rounded-xl flex text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab("category");
                setActiveCategory(null);
                setActiveSubCategory(null);
              }}
              className={`flex-1 py-2 rounded-lg text-center transition-all ${
                activeTab === "category"
                  ? "bg-white text-[#0B1E3D] shadow-sm font-extrabold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              CATEGORIES
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("menu");
                setActiveCategory(null);
                setActiveSubCategory(null);
              }}
              className={`flex-1 py-2 rounded-lg text-center transition-all ${
                activeTab === "menu"
                  ? "bg-white text-[#0B1E3D] shadow-sm font-extrabold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              MENU
            </button>
          </div>

          <button
            type="button"
            onClick={resetAndClose}
            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
          >
            <IoClose className="text-xl" />
          </button>
        </div>

        {/* Dynamic Multi-level Navigation Body */}
        <div className="relative flex-1 overflow-hidden">
          
          {/* LEVEL 1: Main View */}
          <div className="h-full overflow-y-auto divide-y divide-gray-100 pb-24">
            {activeTab === "menu" ? (
              <>
                {/* Standard Main Links for MENU Tab */}
                <Link
                  href="/"
                  onClick={resetAndClose}
                  className="block px-5 py-3.5 text-sm font-semibold text-[#0B1E3D] hover:bg-slate-50"
                >
                  Home
                </Link>

                {effectiveMenuList.map((cat, i) => {
                  const subs = getSubcategories(cat);
                  const hasSub = subs.length > 0;

                  return (
                    <div key={cat._id || cat.id || i}>
                      {hasSub ? (
                        <div
                          onClick={() => setActiveCategory(cat)}
                          className="flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-[#0B1E3D] cursor-pointer hover:bg-slate-50 transition-colors"
                        >
                          <span>{cat.name}</span>
                          <MdOutlineArrowForwardIos className="text-xs text-[#A9762F]" />
                        </div>
                      ) : (
                        <Link
                          href={`/category/${encodeURIComponent(cat.name)}`}
                          onClick={resetAndClose}
                          className="block px-5 py-3.5 text-sm font-semibold text-[#0B1E3D] hover:bg-slate-50"
                        >
                          {cat.name}
                        </Link>
                      )}
                    </div>
                  );
                })}

                <Link
                  href="/bespoke"
                  onClick={resetAndClose}
                  className="block px-5 py-3.5 text-sm font-bold text-[#A9762F] hover:bg-amber-50"
                >
                  Tailored Bespoke
                </Link>

                <Link
                  href="/reviews"
                  onClick={resetAndClose}
                  className="block px-5 py-3.5 text-sm font-semibold text-[#0B1E3D] hover:bg-slate-50"
                >
                  All Reviews
                </Link>
              </>
            ) : (
              /* CATEGORIES Tab Render */
              categoriesCategory.map((cat, idx) => {
                const subs = getSubcategories(cat);
                const hasSub = subs.length > 0;

                return (
                  <div key={cat._id || cat.id || idx}>
                    {hasSub ? (
                      <div
                        onClick={() => setActiveCategory(cat)}
                        className="flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-[#0B1E3D] cursor-pointer hover:bg-slate-50 transition-colors"
                      >
                        <span>{cat.name}</span>
                        <MdOutlineArrowForwardIos className="text-xs text-[#A9762F]" />
                      </div>
                    ) : (
                      <Link
                        href={`/category/${encodeURIComponent(cat.name)}`}
                        onClick={resetAndClose}
                        className="block px-5 py-3.5 text-sm font-semibold text-[#0B1E3D] hover:bg-slate-50"
                      >
                        {cat.name}
                      </Link>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* LEVEL 2: Subcategories Slide-Over */}
          <div
            className={`absolute inset-0 bg-white z-10 flex flex-col transition-transform duration-300 ease-in-out ${
              activeCategory ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-100 border-b border-gray-200">
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className="p-1 text-[#0B1E3D] hover:bg-slate-200 rounded-full"
              >
                <BsArrowLeft className="text-lg" />
              </button>
              <span className="font-bold text-sm text-[#0B1E3D]">{activeCategory?.name}</span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-100 pb-20">
              <Link
                href={`/category/${encodeURIComponent(activeCategory?.name || "")}`}
                onClick={resetAndClose}
                className="block px-5 py-3 text-xs font-bold text-[#A9762F] hover:bg-amber-50"
              >
                View All {activeCategory?.name}
              </Link>

              {activeCategory &&
                getSubcategories(activeCategory).map((sub, idx) => {
                  const hasItems = sub.items && sub.items.length > 0;

                  return (
                    <div key={idx}>
                      {hasItems ? (
                        <div
                          onClick={() => setActiveSubCategory(sub)}
                          className="flex items-center justify-between px-5 py-3 text-xs text-gray-700 font-medium cursor-pointer hover:bg-slate-50"
                        >
                          <span>{sub.name}</span>
                          <MdOutlineArrowForwardIos className="text-[10px] text-[#A9762F]" />
                        </div>
                      ) : (
                        <Link
                          href={`/category/${encodeURIComponent(
                            activeCategory.name
                          )}?sub=${encodeURIComponent(sub.name)}`}
                          onClick={resetAndClose}
                          className="block px-5 py-3 text-xs text-gray-700 hover:bg-slate-50"
                        >
                          {sub.name}
                        </Link>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* LEVEL 3: Items Slide-Over */}
          <div
            className={`absolute inset-0 bg-white z-20 flex flex-col transition-transform duration-300 ease-in-out ${
              activeSubCategory ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-100 border-b border-gray-200">
              <button
                type="button"
                onClick={() => setActiveSubCategory(null)}
                className="p-1 text-[#0B1E3D] hover:bg-slate-200 rounded-full"
              >
                <BsArrowLeft className="text-lg" />
              </button>
              <span className="font-bold text-sm text-[#0B1E3D]">{activeSubCategory?.name}</span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-100 pb-20">
              <Link
                href={`/category/${encodeURIComponent(
                  activeCategory?.name || ""
                )}?sub=${encodeURIComponent(activeSubCategory?.name || "")}`}
                onClick={resetAndClose}
                className="block px-5 py-3 text-xs font-bold text-[#A9762F] hover:bg-amber-50"
              >
                View All {activeSubCategory?.name}
              </Link>

              {activeSubCategory?.items?.map((item, idx) => (
                <Link
                  key={idx}
                  href={`/category/${encodeURIComponent(
                    activeCategory?.name || ""
                  )}?sub=${encodeURIComponent(item)}`}
                  onClick={resetAndClose}
                  className="block px-5 py-3 text-xs text-gray-600 hover:bg-slate-50"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom User Card */}
        <div className="p-3 bg-slate-50 border-t border-gray-200">
          {status === "authenticated" ? (
            <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0B1E3D] text-[#A9762F] font-bold flex items-center justify-center text-sm shadow">
                  {session?.user?.name ? session.user.name[0].toUpperCase() : "U"}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold text-[#0B1E3D] text-xs truncate">
                    {session?.user?.name || "User"}
                  </p>
                  <span className="inline-block px-1.5 py-0.5 text-[9px] font-bold bg-amber-100 text-amber-800 rounded uppercase">
                    {isAdmin ? "Admin" : "Customer"}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 space-y-1">
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={resetAndClose}
                    className="flex items-center gap-2 p-1.5 text-xs font-semibold text-[#A9762F] hover:bg-amber-50 rounded-md transition-colors"
                  >
                    <MdOutlineAdminPanelSettings className="text-base" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}

                <button
                  type="button"
                  onClick={() => {
                    resetAndClose();
                    if (signOut) signOut({ callbackUrl: "/" });
                  }}
                  className="w-full flex items-center gap-2 p-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-md transition-colors text-left"
                >
                  <RiLogoutBoxRLine className="text-base" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/sign-in"
              onClick={resetAndClose}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0B1E3D] text-white rounded-xl text-xs font-bold hover:bg-[#0B1E3D]/90 transition-colors shadow"
            >
              <HiOutlineUserCircle className="text-lg text-[#A9762F]" />
              <span>Sign In / Register</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}