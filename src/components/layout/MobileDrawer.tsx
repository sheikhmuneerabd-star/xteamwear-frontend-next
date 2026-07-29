"use client";

import { useState } from "react";
import Link from "next/link";
import { HiChevronDown, HiX } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi2";
import { RiAdminLine, RiLogoutBoxRLine } from "react-icons/ri";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categoriesCategory?: any[];
  categoriesMenu?: any[];
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

  // Track accordion states
  const [openCatId, setOpenCatId] = useState<string | null>(null);
  const [openSubId, setOpenSubId] = useState<string | null>(null);

  if (!isOpen) return null;

  const isAdmin =
    session?.user?.role === "admin" ||
    session?.user?.isAdmin === true ||
    session?.user?.email?.includes("admin");

  const getCleanId = (obj: any, index: number) => {
    if (!obj) return String(index);
    if (typeof obj._id === "string") return obj._id;
    if (obj._id && obj._id.$oid) return obj._id.$oid;
    if (obj.id) return String(obj.id);
    return String(index);
  };

  const toggleCategory = (id: string) => {
    setOpenCatId(openCatId === id ? null : id);
    setOpenSubId(null);
  };

  const toggleSubcategory = (id: string) => {
    setOpenSubId(openSubId === id ? null : id);
  };

  const getUserInitials = (name?: string, email?: string) => {
    const text = name || email || "U";
    return text.charAt(0).toUpperCase();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex animate-fadeIn">
      {/* Backdrop Overlay with Fade Effect */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Drawer Container with Slide-In */}
      <div className="relative w-[320px] max-w-[85vw] bg-white h-full flex flex-col justify-between z-10 shadow-2xl overflow-hidden transform transition-transform duration-300 ease-out translate-x-0">
        <div className="flex-1 flex flex-col min-h-0">
          
          {/* Header Tabs */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 border-b border-slate-100/80 shrink-0">
            <div className="flex bg-slate-200/70 p-1 rounded-xl w-full mr-3 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab("category")}
                className={`flex-1 py-2 text-[11px] font-bold tracking-wider rounded-lg transition-all duration-200 ${
                  activeTab === "category"
                    ? "bg-white text-[#0B1E3D] shadow-sm scale-[1.02]"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                CATEGORIES
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("menu")}
                className={`flex-1 py-2 text-[11px] font-bold tracking-wider rounded-lg transition-all duration-200 ${
                  activeTab === "menu"
                    ? "bg-white text-[#0B1E3D] shadow-sm scale-[1.02]"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                MENU
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-200/80 text-slate-500 transition-colors"
              aria-label="Close drawer"
            >
              <HiX className="text-xl" />
            </button>
          </div>

          {/* ================= CATEGORIES TAB ================= */}
          {activeTab === "category" && (
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 scrollbar-thin">
              {categoriesCategory.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-xs text-slate-400 font-medium">No categories available.</p>
                </div>
              ) : (
                categoriesCategory.map((cat, idx) => {
                  const catId = getCleanId(cat, idx);
                  const isCatExpanded = openCatId === catId;
                  const rawSubs = cat.subcategories || cat.subCategories || cat.items || [];
                  const hasSubCategories = Array.isArray(rawSubs) && rawSubs.length > 0;

                  return (
                    <div key={catId} className="w-full">
                      {/* LEVEL 1: Category Header */}
                      <div
                        className={`group relative flex items-center justify-between px-4 py-3.5 transition-all duration-200 ${
                          isCatExpanded
                            ? "bg-slate-50/80 border-l-[4px] border-[#A9762F]"
                            : "hover:bg-slate-50/60 border-l-[4px] border-transparent"
                        }`}
                      >
                        <Link
                          href={`/category/${encodeURIComponent(cat.name || "")}`}
                          onClick={onClose}
                          className={`font-semibold text-sm transition-colors flex-1 ${
                            isCatExpanded ? "text-[#A9762F]" : "text-slate-800 hover:text-[#A9762F]"
                          }`}
                        >
                          {cat.name}
                        </Link>

                        {hasSubCategories && (
                          <button
                            type="button"
                            onClick={() => toggleCategory(catId)}
                            className="p-1.5 text-slate-400 hover:text-[#A9762F] hover:bg-amber-50 rounded-lg transition-all"
                          >
                            <HiChevronDown
                              className={`text-lg transition-transform duration-300 ${
                                isCatExpanded ? "rotate-180 text-[#A9762F]" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* LEVEL 2: Subcategories Collapsible */}
                      {hasSubCategories && (
                        <div
                          className={`grid transition-all duration-300 ease-in-out ${
                            isCatExpanded
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden bg-slate-50/50 border-l-2 border-[#A9762F]/30 ml-4 my-1 space-y-1">
                            {rawSubs.map((sub: any, sIdx: number) => {
                              const isStringSub = typeof sub === "string";
                              const subName = isStringSub ? sub : sub?.name || "";
                              const subId = getCleanId(sub, sIdx) + `-${subName}`;
                              const isSubExpanded = openSubId === subId;
                              const items = !isStringSub && Array.isArray(sub?.items) ? sub.items : [];
                              const hasItems = items.length > 0;

                              return (
                                <div key={subId} className="px-2">
                                  <div
                                    className={`flex items-center justify-between py-2 px-2.5 rounded-md transition-all ${
                                      isSubExpanded
                                        ? "bg-amber-50/60 text-[#A9762F]"
                                        : "hover:bg-slate-100/70 text-slate-700"
                                    }`}
                                  >
                                    <Link
                                      href={`/category/${encodeURIComponent(cat.name)}?sub=${encodeURIComponent(subName)}`}
                                      onClick={onClose}
                                      className="text-xs font-medium flex-1 hover:text-[#A9762F] transition-colors"
                                    >
                                      {subName}
                                    </Link>

                                    {hasItems && (
                                      <button
                                        type="button"
                                        onClick={() => toggleSubcategory(subId)}
                                        className="p-1 text-slate-400 hover:text-[#A9762F] transition-colors"
                                      >
                                        <HiChevronDown
                                          className={`text-sm transition-transform duration-300 ${
                                            isSubExpanded ? "rotate-180 text-[#A9762F]" : ""
                                          }`}
                                        />
                                      </button>
                                    )}
                                  </div>

                                  {/* LEVEL 3: Items Accordion */}
                                  {hasItems && (
                                    <div
                                      className={`grid transition-all duration-300 ease-in-out ${
                                        isSubExpanded
                                          ? "grid-rows-[1fr] opacity-100"
                                          : "grid-rows-[0fr] opacity-0"
                                      }`}
                                    >
                                      <div className="overflow-hidden pl-3 py-1 space-y-1 my-1 border-l-2 border-slate-200/80 ml-2 bg-white/70 rounded-r-lg">
                                        {items.map((item: any, itemIdx: number) => {
                                          const itemName = typeof item === "string" ? item : item?.name;
                                          return (
                                            <Link
                                              key={itemIdx}
                                              href={`/category/${encodeURIComponent(cat.name)}?sub=${encodeURIComponent(subName)}&item=${encodeURIComponent(itemName)}`}
                                              onClick={onClose}
                                              className="group flex items-center gap-2 py-1.5 px-2 text-[11px] text-slate-600 hover:text-[#A9762F] transition-colors font-medium"
                                            >
                                              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#A9762F] transition-colors shrink-0" />
                                              <span className="truncate">{itemName}</span>
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ================= MENU TAB ================= */}
          {activeTab === "menu" && (
            <div className="flex-1 overflow-y-auto p-3 space-y-1 font-medium text-slate-700 text-sm">
              <Link
                href="/"
                onClick={onClose}
                className="block p-3 rounded-xl hover:bg-slate-100/80 transition-all hover:translate-x-1"
              >
                Home
              </Link>

              {/* Dynamic Categories inside Menu */}
              {categoriesMenu.map((menuCat, i) => (
                <Link
                  key={getCleanId(menuCat, i)}
                  href={`/category/${encodeURIComponent(menuCat.name || "")}`}
                  onClick={onClose}
                  className="block p-3 rounded-xl hover:bg-slate-100/80 transition-all hover:translate-x-1"
                >
                  {menuCat.name}
                </Link>
              ))}

              {/* Tailored Bespoke placed right above All Reviews */}
              <Link
                href="/bespoke"
                onClick={onClose}
                className="block p-3 rounded-xl text-[#A9762F] bg-amber-50/60 hover:bg-amber-100/70 font-semibold transition-all hover:translate-x-1 border border-amber-200/50"
              >
                Tailored Bespoke
              </Link>

              <Link
                href="/reviews"
                onClick={onClose}
                className="block p-3 rounded-xl hover:bg-slate-100/80 transition-all hover:translate-x-1"
              >
                All Reviews
              </Link>

              {/* Professional Luxury Styled Admin Dashboard Button */}
              {isAdmin && (
                <div className="pt-2">
                  <Link
                    href="/admin"
                    onClick={onClose}
                    className="flex items-center justify-between p-3.5 bg-[#0B1E3D] text-white rounded-xl shadow-md hover:shadow-lg transition-all hover:bg-[#152e58] active:scale-[0.99] border border-slate-700/50 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-[#A9762F]/20 text-[#A9762F] group-hover:bg-[#A9762F] group-hover:text-white transition-colors">
                        <RiAdminLine className="text-lg" />
                      </div>
                      <span className="font-semibold text-xs tracking-wide">Admin Portal</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-[#A9762F] text-white">
                      Control
                    </span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= FOOTER SECTION ================= */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/90 shrink-0">
          {status === "authenticated" || session?.user ? (
            <div className="p-3 bg-white border border-slate-200/70 rounded-2xl shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0B1E3D] text-[#A9762F] font-bold text-sm flex items-center justify-center shrink-0 shadow-inner">
                  {getUserInitials(session?.user?.name, session?.user?.email)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Signed in as</p>
                  <p className="text-xs font-bold text-[#0B1E3D] truncate">
                    {session?.user?.name || session?.user?.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (signOut) signOut();
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 rounded-xl font-semibold transition-all duration-200 text-xs group"
              >
                <RiLogoutBoxRLine className="text-base text-slate-400 group-hover:text-rose-600 transition-colors" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <Link
              href="/sign-in"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#0B1E3D] text-white rounded-xl font-semibold hover:bg-[#162f5c] transition-all shadow-md active:scale-[0.98] text-xs uppercase tracking-wider"
            >
              <HiOutlineUser className="text-[#A9762F] text-lg" />
              <span>Sign In / Register</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}