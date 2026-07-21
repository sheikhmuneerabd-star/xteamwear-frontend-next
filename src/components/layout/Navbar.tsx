"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { PiShoppingCartLight, PiUserLight } from "react-icons/pi";
import { HiMiniBars3 } from "react-icons/hi2";
import { CgShoppingBag } from "react-icons/cg";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { RiUserAddLine } from "react-icons/ri";

import greenShirt from "@/assets/greenShirt.jpg";
import orangeShirt from "@/assets/orangeShirt.jpg";
import { useCart } from "@/context/CartContext";

/**
 * ---- Design tokens (brand-specific, not a generic template) ----
 * Navy      #0B1E3D  – existing brand ink, used for wordmark & primary text
 * Brass     #A9762F  – replaces the stock "neon e-commerce accent"; reads as tailored/premium
 * Ivory     #FAF8F3  – warm surface for panels/dropdowns
 * Hairline  #E6E1D6  – soft structural borders instead of harsh gray-300
 */

interface CategoryMenuEntry {
  id: number;
  name: string;
  items: string[];
}

const categoriesMenu: CategoryMenuEntry[] = [
  { id: 1, name: "Soccer", items: ["Go To Soccer 1", "Go To Soccer 2", "Go To Soccer 3"] },
  { id: 2, name: "Winter Wear", items: ["Jackets", "Hoodies", "Sweaters"] },
  { id: 3, name: "Basket Ball", items: ["Basket Ball 1", "Basket Ball 2", "Basket Ball 3"] },
];

const categoriesCategory: CategoryMenuEntry[] = [
  { id: 1, name: "Football", items: ["Go To FOOTBALL", "Go To FOOTBALL2", "Go To FOOTBALL3"] },
  { id: 2, name: "Basketball", items: ["Basket Ball 1", "Basket Ball 2", "Basket Ball 3"] },
  { id: 3, name: "Baseball", items: ["Baseball Ball 1", "Baseball Ball 2", "Baseball Ball 3"] },
];

/** Reused product card for search suggestions — restyled with brass accents instead of orange/lime */
function PopularProductCard() {
  return (
    <div className="group flex flex-col justify-center shrink-0">
      <div className="w-full h-[180px] group/img group-hover:-translate-y-2 transition-all duration-300 relative cursor-pointer overflow-hidden rounded-sm">
        <Image
          src={greenShirt}
          alt="Popular product"
          fill
          sizes="150px"
          className="object-cover opacity-100 group-hover/img:opacity-0 transition-opacity duration-700 ease-in-out"
        />
        <Image
          src={orangeShirt}
          alt="Popular product alternate"
          fill
          sizes="150px"
          className="object-cover absolute top-0 left-0 opacity-0 group-hover/img:opacity-100 ease-out hover:scale-105 transition-all duration-700"
        />
      </div>
      <div className="w-[150px] pt-3">
        <span className="text-[11px] leading-snug line-clamp-2 font-medium text-[#0B1E3D] hover:text-[#A9762F] cursor-pointer">
          Whirlwind — Men&apos;s Sublimated Football Kit
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-gray-400 font-medium text-[13px] line-through">$33.53</p>
          <p className="text-[#A9762F] font-semibold text-[14px]">$28.33</p>
        </div>
        <div className="w-full flex justify-between items-center mt-2">
          <div className="relative w-[22px] h-[22px] rounded-full border border-[#E6E1D6] overflow-hidden">
            <Image src={greenShirt} alt="Colorway" fill sizes="22px" className="rounded-full object-cover" />
          </div>
          <span className="text-[11px] tracking-wide font-medium text-[#A9762F] border border-[#A9762F]/40 px-2 py-[2px] rounded-full">
            −20%
          </span>
        </div>
      </div>
    </div>
  );
}

const searchTagGroups = [
  ["uniform packages", "fluorescent jersey", "sleeveless jersey"],
  ["long sleeve shirts", "shorts & pants", "training kits"],
  ["reversible basketball jersey", "bespoke fits", "socks & accessories"],
];

/** Search trending tags + popular products — shared between desktop dropdown and mobile sidebar */
function SearchSuggestions({ variant }: { variant: "desktop" | "mobile" }) {
  const wrapClass = variant === "desktop" ? "flex flex-wrap gap-2 pt-4" : "flex flex-wrap gap-2 pt-4";
  return (
    <>
      <div className="pb-3 border-b border-[#E6E1D6]">
        <span className="text-[11px] tracking-[0.14em] font-semibold text-[#A9762F] uppercase">
          Trending — Sublimated Jersey
        </span>
      </div>
      <div>
        {searchTagGroups.map((group, gi) => (
          <div key={gi} className={wrapClass}>
            {group.map((tag) => (
              <div
                key={tag}
                className="flex gap-1 items-center border border-[#E6E1D6] hover:border-[#A9762F] hover:bg-[#A9762F]/5 cursor-pointer transition-all duration-200 group py-[6px] px-3 rounded-full"
              >
                <span className="text-[12.5px] text-[#0B1E3D]/70 group-hover:text-[#0B1E3D]">{tag}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <span className="text-[11px] tracking-[0.14em] font-semibold text-[#0B1E3D] uppercase border-b border-[#E6E1D6] pb-2 block">
          Popular Products
        </span>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-3 [&::-webkit-scrollbar]:h-[3px] [&::-webkit-scrollbar-track]:bg-[#E6E1D6] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#A9762F]/60 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#A9762F]">
          <PopularProductCard />
          <PopularProductCard />
          <PopularProductCard />
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const [focus, setFocus] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [toggle, setToggle] = useState(false);
  const menuSideBar = useRef<HTMLDivElement>(null);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState(true);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const searchSideBar = useRef<HTMLDivElement>(null);

  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    async function fetchSettings() {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setLogoUrl(data.settings.logo || "");
    }
    fetchSettings();
  }, []);

  const [accountOpen, setAccountOpen] = useState(false);
  const accountBoxRef = useRef<HTMLDivElement>(null);

  const { cart } = useCart();
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuSideBar.current && !menuSideBar.current.contains(event.target as Node)) {
        setToggle(false);
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchSideBar.current && !searchSideBar.current.contains(event.target as Node)) {
        setOpenSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openSearch ? "hidden" : "";
  }, [openSearch]);

  useEffect(() => {
    document.body.style.overflow = toggle ? "hidden" : "";
  }, [toggle]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountBoxRef.current && !accountBoxRef.current.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenu = () => {
    setOpenCategory(false);
    setOpenMenu(true);
  };
  const handleCategory = () => {
    setOpenMenu(false);
    setOpenCategory(true);
  };

  const handleSearchFocus = () => {
    setFocus(true);
    setSearchFocus(true);
  };
  const handleSearchBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setFocus(false);
      setSearchFocus(false);
    }
  };

  return (
    <div>
      {/* ================= Desktop ================= */}
      <div className="w-full xl:flex hidden border-b border-[#E6E1D6] bg-white">
        <div className="w-[91%] h-[100px] mx-auto flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="cursor-pointer shrink-0">
            {logoUrl ? (
              <Image className="w-[80%] h-auto" src={logoUrl} alt="BeSpoke Wear" width={160} height={60} />
            ) : (
              <span className="font-serif text-2xl tracking-tight text-[#0B1E3D]">BeSpoke Wear</span>
            )}
          </Link>

          {/* Signature search — soft pill with brass icon-button, not a bare underline */}
          <div className="flex flex-col w-[34%] mr-10 relative">
            <div
              className={`flex items-center h-[46px] rounded-full bg-[#FAF8F3] border transition-all duration-300 pl-4 pr-1 ${
                focus ? "border-[#A9762F] shadow-[0_0_0_3px_rgba(169,118,47,0.12)]" : "border-[#E6E1D6]"
              }`}
            >
              <input
                className="w-full h-full outline-none text-[14.5px] bg-transparent placeholder-[#0B1E3D]/40 text-[#0B1E3D]"
                type="text"
                placeholder="Search the store"
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              <button
                type="button"
                aria-label="Search"
                className="shrink-0 w-[36px] h-[36px] rounded-full bg-[#0B1E3D] hover:bg-[#A9762F] flex items-center justify-center transition-colors duration-300 cursor-pointer"
              >
                <IoSearch className="text-[16px] text-white" />
              </button>
            </div>
            <div
              className={`bg-white absolute [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#E6E1D6] top-[54px] left-0 w-[130%] max-h-[320px] rounded-md border border-[#E6E1D6] shadow-[0_12px_28px_-8px_rgba(11,30,61,0.15)] overflow-y-auto overflow-x-hidden z-50 ${
                searchFocus ? "flex" : "hidden"
              }`}
            >
              <div className="p-5 w-full">
                <SearchSuggestions variant="desktop" />
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <Link href="/cart" className="flex items-center gap-2.5 group cursor-pointer pr-4 border-r border-[#E6E1D6]">
              <div className="relative w-[42px] h-[42px] rounded-full border border-[#E6E1D6] group-hover:border-[#A9762F] flex items-center justify-center transition-colors duration-200">
                <PiShoppingCartLight className="text-[21px] text-[#0B1E3D] group-hover:text-[#A9762F] transition-colors duration-200" />
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center bg-[#A9762F] rounded-full font-semibold text-white text-[10.5px] w-[17px] h-[17px] ring-2 ring-white">
                  {cart.length}
                </span>
              </div>
              <span className="text-[13px] text-[#0B1E3D] font-medium hidden 2xl:inline">Cart</span>
            </Link>

            {status === "authenticated" ? (
              <div className="flex items-center gap-2 group cursor-pointer relative" ref={accountBoxRef}>
                <button
                  type="button"
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  <div className="w-[42px] h-[42px] rounded-full border border-[#E6E1D6] group-hover:border-[#A9762F] flex items-center justify-center transition-colors duration-200">
                    <PiUserLight className="text-[21px] text-[#0B1E3D] group-hover:text-[#A9762F] transition-colors duration-200" />
                  </div>
                  <div className="flex flex-col text-[13px] items-start leading-tight">
                    <span className="text-[#0B1E3D]/60 text-[11.5px]">Hi, {session.user?.name?.split(" ")[0]}</span>
                    <span className="font-semibold text-[#0B1E3D]">My Account</span>
                  </div>
                </button>
                <div
                  className="bg-white z-50 w-[190px] py-2 flex flex-col rounded-md absolute top-[52px] right-0 border border-[#E6E1D6] shadow-[0_12px_28px_-8px_rgba(11,30,61,0.18)] transition-all duration-300"
                  style={{
                    opacity: accountOpen ? 1 : 0,
                    pointerEvents: accountOpen ? "auto" : "none",
                    transform: accountOpen ? "translateY(0)" : "translateY(-8px)",
                  }}
                >
                  <p className="px-4 pb-2 mb-1 text-xs text-[#0B1E3D]/50 truncate border-b border-[#E6E1D6]">
                    {session.user?.email}
                  </p>
                  {isAdmin && (
                    <Link href="/admin" className="px-4 py-2 text-left text-sm text-[#0B1E3D] hover:bg-[#A9762F]/5">
                      Admin
                    </Link>
                  )}
                  <button
                    type="button"
                    className="px-4 py-2 text-left text-sm text-[#0B1E3D] hover:bg-[#A9762F]/5 cursor-pointer"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/sign-in" className="flex items-center gap-2.5 group cursor-pointer">
                <div className="w-[42px] h-[42px] rounded-full border border-[#E6E1D6] group-hover:border-[#A9762F] flex items-center justify-center transition-colors duration-200">
                  <PiUserLight className="text-[21px] text-[#0B1E3D] group-hover:text-[#A9762F] transition-colors duration-200" />
                </div>
                <div className="flex flex-col text-[13px] leading-tight">
                  <span className="text-[#0B1E3D]/60 text-[11.5px]">Sign In or Register</span>
                  <span className="font-semibold text-[#0B1E3D]">My Account</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ================= Mobile ================= */}
      <div className="fixed top-0 left-0 right-0 z-[999] shadow-sm shadow-gray-200 transition-all duration-200 w-full h-[54px] bg-white xl:hidden flex">
        {(openSearch || toggle) && (
          <div
            className="fixed inset-0 bg-[#0B1E3D]/40 z-40"
            onClick={() => {
              setOpenSearch(false);
              setToggle(false);
            }}
          />
        )}
        <div className="w-[97%] flex items-center justify-between mx-auto">
          <div className="flex items-center gap-5">
            <div className="relative">
              <HiMiniBars3 className="text-3xl text-[#0B1E3D]" onClick={() => setToggle(!toggle)} />
              <div
                className={`fixed overflow-scroll top-0 left-0 bg-white md:w-[370px] max-[320px]:w-[300px] w-[340px] h-full z-50 transition-all duration-300 ${
                  toggle ? "translate-x-0" : "-translate-x-full"
                }`}
                ref={menuSideBar}
              >
                <div className="p-4 flex justify-between items-center border-b border-[#E6E1D6]">
                  <div className="flex gap-5">
                    <h1
                      className={`text-[15px] tracking-wide font-semibold uppercase transition-all duration-300 ${
                        openMenu ? "text-[#0B1E3D]" : "text-[#0B1E3D]/35"
                      }`}
                      onClick={handleMenu}
                    >
                      Menu
                    </h1>
                    <h1
                      className={`text-[15px] tracking-wide font-semibold uppercase transition-all duration-300 ${
                        openCategory ? "text-[#0B1E3D]" : "text-[#0B1E3D]/35"
                      }`}
                      onClick={handleCategory}
                    >
                      Category
                    </h1>
                  </div>
                  <IoMdClose className="text-[24px] text-[#0B1E3D]" onClick={() => setToggle(false)} />
                </div>

                <div>
                  <div className={openMenu ? "block" : "hidden"}>
                    <Link href="/" className="flex text-[16px] items-center justify-between border-b border-[#E6E1D6] p-4">
                      <h2 className="font-medium text-[#0B1E3D]">Home</h2>
                    </Link>
                    {categoriesMenu.map((cate) => (
                      <div key={cate.id} className="relative">
                        <div
                          className="flex text-[16px] items-center justify-between border-b border-[#E6E1D6] p-4"
                          onClick={() => setActiveMenu(cate.id)}
                        >
                          <h2 className="font-medium text-[#0B1E3D]">{cate.name}</h2>
                          <MdOutlineArrowForwardIos className="text-[#A9762F] text-[13px]" />
                        </div>
                        <div
                          className={`fixed overflow-scroll top-0 left-0 h-full w-[370px] bg-white z-50 transition-all duration-200 ${
                            activeMenu === cate.id ? "translate-x-0" : "-translate-x-full"
                          }`}
                        >
                          <div className="bg-[#FAF8F3] border-b border-[#E6E1D6]">
                            <div className="flex font-medium justify-between p-4 items-center w-[225px]">
                              <BsArrowLeft className="text-[22px] text-[#0B1E3D]" onClick={() => setActiveMenu(null)} />
                              <h2 className="text-[#0B1E3D]">{cate.name}</h2>
                            </div>
                          </div>
                          <div>
                            {cate.items.map((item, index) => (
                              <div className="text-[14.5px] text-[#0B1E3D]/80 border-b border-[#E6E1D6] p-4" key={index}>
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={openCategory ? "block" : "hidden"}>
                    {categoriesCategory.map((cateCate) => (
                      <div key={cateCate.id} className="relative">
                        <Link
                          href={`/category/${encodeURIComponent(cateCate.name)}`}
                          className="flex text-[16px] items-center justify-between border-b border-[#E6E1D6] p-4"
                          onClick={() => setActiveCategory(cateCate.id)}
                        >
                          <h2 className="font-medium text-[#0B1E3D]">{cateCate.name}</h2>
                          <MdOutlineArrowForwardIos className="text-[#A9762F] text-[13px]" />
                        </Link>
                        <div
                          className={`fixed overflow-scroll top-0 left-0 h-full w-[370px] bg-white z-50 transition-all duration-200 ${
                            activeCategory === cateCate.id ? "translate-x-0" : "-translate-x-full"
                          }`}
                        >
                          <div className="bg-[#FAF8F3] border-b border-[#E6E1D6]">
                            <div className="flex font-medium justify-between p-4 items-center w-[225px]">
                              <BsArrowLeft className="text-[22px] text-[#0B1E3D]" onClick={() => setActiveCategory(null)} />
                              <h2 className="text-[#0B1E3D]">{cateCate.name}</h2>
                            </div>
                          </div>
                          <div>
                            {cateCate.items.map((item, index) => (
                              <div key={index} className="text-[14.5px] text-[#0B1E3D]/80 border-b border-[#E6E1D6] p-4">
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    {status === "authenticated" ? (
                      <>
                        <div className="flex gap-2 items-center p-4 border-b border-[#E6E1D6]">
                          <HiOutlineUserCircle className="text-[22px] text-[#A9762F]" />
                          <span className="text-[15px] text-[#0B1E3D]">Hi, {session.user?.name?.split(" ")[0]}</span>
                        </div>
                        <button
                          type="button"
                          className="w-full flex gap-2 items-center p-4 border-b border-[#E6E1D6] text-left"
                          onClick={() => signOut({ callbackUrl: "/" })}
                        >
                          <RiUserAddLine className="text-[22px] text-[#A9762F]" />
                          <span className="text-[15px] text-[#0B1E3D]">Sign Out</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/sign-in" className="flex gap-2 items-center p-4 border-b border-[#E6E1D6]">
                          <HiOutlineUserCircle className="text-[22px] text-[#A9762F]" />
                          <span className="text-[15px] text-[#0B1E3D]">Sign In</span>
                        </Link>
                        <Link href="/sign-in" className="flex gap-2 items-center p-4 border-b border-[#E6E1D6]">
                          <RiUserAddLine className="text-[22px] text-[#A9762F]" />
                          <span className="text-[15px] text-[#0B1E3D]">Create an account</span>
                        </Link>
                      </>
                    )}
                  </div>

                  <div>
                    <div className="p-4 bg-[#FAF8F3]">
                      <span className="text-[12px] tracking-[0.12em] font-semibold text-[#0B1E3D]/60 uppercase">
                        Currency
                      </span>
                    </div>
                    <div className="p-4 flex justify-between gap-3 items-center">
                      {["us", "eu", "gb", "ch"].map((code, i) => (
                        <div key={code} className="flex items-center gap-2 cursor-pointer group">
                          <Image
                            src={`https://flagcdn.com/w40/${code}.png`}
                            width={22}
                            height={22}
                            unoptimized
                            alt={code}
                            className="w-[22px] h-[22px] rounded-full"
                          />
                          <span className="font-medium text-[13.5px] text-[#0B1E3D] group-hover:text-[#A9762F] border-b border-transparent group-hover:border-[#A9762F]">
                            {["USD", "EUR", "GBP", "CHF"][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 pb-4 flex gap-3 items-center">
                      {["au", "ca"].map((code, i) => (
                        <div key={code} className="flex items-center gap-2 cursor-pointer group">
                          <Image
                            src={`https://flagcdn.com/w40/${code}.png`}
                            width={22}
                            height={22}
                            unoptimized
                            alt={code}
                            className="w-[22px] h-[22px] rounded-full"
                          />
                          <span className="font-medium text-[13.5px] text-[#0B1E3D] group-hover:text-[#A9762F] border-b border-transparent group-hover:border-[#A9762F]">
                            {["AUD", "CAD"][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <IoIosSearch className="text-[26px] text-[#0B1E3D]" onClick={() => setOpenSearch(true)} />

            <div className="relative">
              <div
                className={`bg-white fixed top-0 left-0 md:w-[370px] max-[320px]:w-[300px] w-[340px] h-full z-50 transition-all duration-300 ${
                  openSearch ? "translate-x-0" : "-translate-x-full"
                }`}
                ref={searchSideBar}
              >
                <div className="px-4 py-4 flex justify-between items-center border-b border-[#E6E1D6]">
                  <h2 className="font-medium text-[16px] text-[#0B1E3D]">Search</h2>
                  <IoMdClose className="text-[24px] text-[#0B1E3D]" onClick={() => setOpenSearch(false)} />
                </div>
                <div className="px-4 py-4">
                  <div className="flex items-center gap-2 border-b-[1.5px] border-[#0B1E3D]/15 focus-within:border-[#A9762F] transition-colors duration-300 pb-2">
                    <IoSearch className="text-[17px] text-[#0B1E3D]/50" />
                    <input
                      className="w-full outline-none text-[14.5px] bg-transparent placeholder-gray-400 text-[#0B1E3D]"
                      type="text"
                      placeholder="Search product..."
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                    />
                  </div>
                </div>
                <div className="px-4 py-2 overflow-y-scroll h-[280px] mt-1">
                  <SearchSuggestions variant="mobile" />
                </div>
              </div>
            </div>
          </div>

          <Link href="/" className="cursor-pointer">
            <div className="md:w-[16%] w-[34%]">
              {logoUrl ? (
                <Image className="w-[80%] h-auto" src={logoUrl} alt="BeSpoke Wear" width={160} height={60} />
              ) : (
                <span className="font-serif text-lg text-[#0B1E3D]">BeSpoke Wear</span>
              )}
            </div>
          </Link>

          <div className="flex items-center gap-5 mr-2">
            <PiUserLight className="text-[24px] text-[#0B1E3D]" />
            <Link href="/cart" className="relative">
              <span className="absolute -top-[8px] -right-[9px] text-[11px] bg-[#A9762F] text-white w-5 h-5 flex justify-center items-center rounded-full">
                {cart.length}
              </span>
              <CgShoppingBag className="text-[24px] text-[#0B1E3D]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}