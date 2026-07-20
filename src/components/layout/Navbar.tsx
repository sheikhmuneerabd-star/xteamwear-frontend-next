"use client";
import { useSession, signOut } from "next-auth/react";
import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosSearch, IoMdClose, IoMdArrowDropdown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { PiShoppingCartLight, PiUserLight } from "react-icons/pi";
import { HiMiniBars3 } from "react-icons/hi2";
import { CgShoppingBag } from "react-icons/cg";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { RiUserAddLine } from "react-icons/ri";

import logo from "@/assets/logo.svg";
import greenShirt from "@/assets/greenShirt.jpg";
import orangeShirt from "@/assets/orangeShirt.jpg";
import { useCart } from "@/context/CartContext";

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

const countries = [
  { name: "Pakistan", code: "pk" },
  { name: "Iran", code: "ir" },
  { name: "Turkey", code: "tr" },
  { name: "Yemen", code: "ye" },
  { name: "China", code: "cn" },
];

/** Reused 3x in the original — extracted to remove duplication */
function PopularProductCard() {
  return (
    <div className="group flex flex-col justify-center">
      <div className="w-full h-[180px] group/img group-hover:-translate-y-2 transition-all duration-300 relative cursor-pointer overflow-hidden">
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
      <div className="w-[150px] p-4">
        <span className="text-[11px] line-clamp-2 font-medium hover:text-blue-600 cursor-pointer">
          Whirlwind - Men&apos;s Sublimated Footbal Lorem ipsum dolor sit amet.
        </span>
        <p className="text-gray-800 font-medium text-[15px] line-through">Rs.19,053.53</p>
        <p className="text-gray-800 font-medium text-[15px] line-through">PKR</p>
        <p className="text-red-600 font-medium text-[15px]">Rs.13,645.45</p>
        <p className="text-red-600 font-medium text-[15px]">PKR</p>
        <div className="w-[75%] flex justify-end">
          <span className="bg-red-600 px-3 py-[3px] rounded text-[14px] text-white">(-20%)</span>
        </div>
        <div className="relative w-[30px] h-[30px] mt-3 rounded-full border-[1.4px] p-[2px] border-gray-300 overflow-hidden">
          <Image src={greenShirt} alt="GREEN & BLACK" fill sizes="30px" className="rounded-full object-cover" />
        </div>
      </div>
    </div>
  );
}

const searchTagGroups = [
  ["uniform pakages", "fluorescent jersey", "sleeveless jersey"],
  ["loremous saliduar", "long sleeve shirts", "shorts & pants"],
  ["reversible basketball jersey", "bespoke", "socks & accessories"],
];

/** Search trending tags + popular products — shared between desktop dropdown and mobile sidebar */
function SearchSuggestions({ variant }: { variant: "desktop" | "mobile" }) {
  const wrapClass = variant === "desktop" ? "flex gap-2 pt-5" : "flex flex-wrap gap-2 pt-5";
  return (
    <>
      <div className="p-2 border-b">
        <h2 className="font-semibold text-sm">SUBLIMATED JERSEY</h2>
      </div>
      <div>
        {searchTagGroups.map((group, gi) => (
          <div key={gi} className={wrapClass}>
            {group.map((tag) => (
              <div
                key={tag}
                className="flex gap-1 items-center bg-gray-100 hover:bg-gray-200 cursor-pointer transition-all duration-200 group text-gray-500 py-[6.5px] px-3"
              >
                <IoSearch className="group-hover:text-gray-700" />
                <span className="text-[13px] group-hover:text-gray-700">{tag}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-7">
        <h2 className="font-semibold text-sm border-b pb-2">POPULAR PRODUCTS</h2>
        <div className="mt-4 flex gap-3 overflow-x-auto">
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
  const [languageCountry, setLanguageCountry] = useState(false);
  const languageBoxRef = useRef<HTMLDivElement>(null);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

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
      if (languageBoxRef.current && !languageBoxRef.current.contains(event.target as Node)) {
        setLanguageCountry(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      {/* Desktop */}
      <div className="w-full xl:flex hidden">
        <div className="w-[91%] h-[110px] mx-auto flex items-center justify-between">
          <Link href="/" className="cursor-pointer">
            <Image className="w-[80%] h-auto" src={logo} alt="xteamwear" />
          </Link>

          <div className="flex w-[36%] h-[45px] mr-[50px] rounded-xl relative">
            <label
              className={`absolute top-[10px] left-3 transition-all duration-300 ${
                focus ? "-translate-x-1 opacity-0" : "translate-x-0 opacity-100"
              }`}
            >
              Search the store
            </label>
            <input
              className="w-full h-full rounded-xl outline-none pl-3 shadowSearch shadow-[inset_0_1px_3px_rgba(0,0,0,0.12)] text-[15px] placeholder-gray-600"
              type="text"
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />
            <IoSearch className="absolute bottom-0 right-0 p-[9px] bg-yellow-400 w-[12%] h-full rounded-tr-xl rounded-br-xl transition-all duration-200 hover:bottom-1 cursor-pointer" />
            <div
              className={`bg-white absolute [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 top-[60px] left-0 w-[125%] h-[300px] rounded-md border border-gray-200 overflow-y-auto overflow-x-hidden z-50 ${
                searchFocus ? "flex" : "hidden"
              }`}
            >
              <div className="p-5">
                <SearchSuggestions variant="desktop" />
              </div>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex flex-col justify-center items-center">
              <Link href="/cart" className="flex items-center gap-2 group cursor-pointer">
                <PiShoppingCartLight className="text-[32px] group-hover:scale-110 transition-all duration-200" />
                <div className="flex flex-col justify-center text-[13px]">
                  <span className="flex items-center justify-center bg-yellow-400 rounded-full font-semibold text-white w-[30px] h-[17.5px]">
                    {cart.length}
                  </span>
                  <span>Cart</span>
                </div>
              </Link>
            </div>
            {status === "authenticated" ? (
              <div className="flex items-center gap-1 group cursor-pointer relative" ref={accountBoxRef}>
                <PiUserLight
                  className="text-[40px] group-hover:scale-110 transition-all duration-200"
                  onClick={() => setAccountOpen(!accountOpen)}
                />
                <div className="flex flex-col text-[13px]" onClick={() => setAccountOpen(!accountOpen)}>
                  <span>Hi, {session.user?.name?.split(" ")[0]}</span>
                  <span className="font-semibold">My account</span>
                </div>
                <div
                  className="bg-white z-50 w-[160px] py-3 flex flex-col gap-2 rounded-md absolute top-12 right-0 shadowNavCon transition-all duration-300"
                  style={{
                    opacity: accountOpen ? 1 : 0,
                    pointerEvents: accountOpen ? "auto" : "none",
                    transform: accountOpen ? "translateY(0)" : "translateY(-10px)",
                  }}
                >
                  <p className="px-4 text-xs text-gray-500 truncate">{session.user?.email}</p>

                  {isAdmin && (
                    <Link href="/admin" className="px-4 py-2 text-left text-sm hover:bg-gray-100">
                      <button
                        type="button"
                        className="cursor-pointer"
                      >
                          Admin
                      </button>
                    </Link>
                  )}
                  <button
                    type="button"
                    className="px-4 py-2 text-left text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/sign-in" className="flex items-center gap-1 group cursor-pointer">
                <PiUserLight className="text-[40px] group-hover:scale-110 transition-all duration-200" />
                <div className="flex flex-col text-[13px]">
                  <span>Sign In or Register</span>
                  <span className="font-semibold">My account</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="fixed top-0 left-0 right-0 z-[999] shadow-sm shadow-gray-200 transition-all duration-200 w-full h-[54px] bg-white xl:hidden flex">
        {(openSearch || toggle) && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => {
              setOpenSearch(false);
              setToggle(false);
            }}
          />
        )}
        <div className="w-[97%] flex items-center justify-between mx-auto">
          <div className="flex items-center gap-5">
            <div className="relative">
              <HiMiniBars3 className="text-3xl" onClick={() => setToggle(!toggle)} />
              <div
                className={`fixed overflow-scroll top-0 left-0 bg-white md:w-[370px] max-[320px]:w-[300px] w-[340px] h-full z-50 transition-all duration-300 ${
                  toggle ? "translate-x-0" : "-translate-x-full"
                }`}
                ref={menuSideBar}
              >
                <div className="p-3 flex justify-between items-center">
                  <div className="flex gap-2">
                    <h1
                      className={`text-lg font-medium transition-all duration-300 ${
                        openMenu ? "text-gray-900" : "text-gray-400"
                      }`}
                      onClick={handleMenu}
                    >
                      Menu
                    </h1>
                    <h1
                      className={`text-lg font-medium transition-all duration-300 ${
                        openCategory ? "text-gray-900" : "text-gray-400"
                      }`}
                      onClick={handleCategory}
                    >
                      Category
                    </h1>
                  </div>
                  <IoMdClose className="text-[27px]" onClick={() => setToggle(false)} />
                </div>

                <div>
                  <div className={openMenu ? "block" : "hidden"}>
                    <Link href="/" className="flex text-[17px] items-center justify-between border-b border-gray-300 p-3">
                      <h2 className="font-medium">Home</h2>
                    </Link>
                    {categoriesMenu.map((cate) => (
                      <div key={cate.id} className="relative">
                        <div
                          className="flex text-[17px] items-center justify-between border-b border-gray-300 p-3"
                          onClick={() => setActiveMenu(cate.id)}
                        >
                          <h2 className="font-medium">{cate.name}</h2>
                          <MdOutlineArrowForwardIos />
                        </div>
                        <div
                          className={`fixed overflow-scroll top-0 left-0 h-full w-[370px] bg-white z-50 transition-all duration-200 ${
                            activeMenu === cate.id ? "translate-x-0" : "-translate-x-full"
                          }`}
                        >
                          <div className="bg-gray-100">
                            <div className="flex font-medium justify-between p-3 items-center w-[225px]">
                              <BsArrowLeft className="text-[24px]" onClick={() => setActiveMenu(null)} />
                              <h2>{cate.name}</h2>
                            </div>
                          </div>
                          <div>
                            {cate.items.map((item, index) => (
                              <div className="text-[15px] border-b border-gray-200 p-4" key={index}>
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
                          className="flex text-[17px] items-center justify-between border-b border-gray-300 p-3"
                          onClick={() => setActiveCategory(cateCate.id)}
                        >
                          <h2 className="font-medium">{cateCate.name}</h2>
                          <MdOutlineArrowForwardIos />
                        </Link>
                        <div
                          className={`fixed overflow-scroll top-0 left-0 h-full w-[370px] bg-white z-50 transition-all duration-200 ${
                            activeCategory === cateCate.id ? "translate-x-0" : "-translate-x-full"
                          }`}
                        >
                          <div className="bg-gray-100">
                            <div className="flex font-medium justify-between p-3 items-center w-[225px]">
                              <BsArrowLeft className="text-[24px]" onClick={() => setActiveCategory(null)} />
                              <h2>{cateCate.name}</h2>
                            </div>
                          </div>
                          <div>
                            {cateCate.items.map((item, index) => (
                              <div key={index} className="text-[15px] border-b border-gray-200 p-4">
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
                        <div className="flex gap-1 items-center p-3 border-b border-gray-300">
                          <HiOutlineUserCircle className="text-[24px]" />
                          <span className="text-[16px]">Hi, {session.user?.name?.split(" ")[0]}</span>
                        </div>
                        <button
                          type="button"
                          className="w-full flex gap-1 items-center p-3 border-b border-gray-300 text-left"
                          onClick={() => signOut({ callbackUrl: "/" })}
                        >
                          <RiUserAddLine className="text-[24px]" />
                          <span className="text-[16px]">Sign Out</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/sign-in" className="flex gap-1 items-center p-3 border-b border-gray-300">
                          <HiOutlineUserCircle className="text-[24px]" />
                          <span className="text-[16px]">Sign In</span>
                        </Link>
                        <Link href="/sign-in" className="flex gap-1 items-center p-3 border-b border-gray-300">
                          <RiUserAddLine className="text-[24px]" />
                          <span className="text-[16px]">Create an account</span>
                        </Link>
                      </>
                    )}
                  </div>

                  <div>
                    <div className="p-3 bg-gray-100">
                      <h2 className="font-medium">CURRENCY</h2>
                    </div>
                    <div className="p-[13px] flex justify-between gap-[12px] items-center">
                      {["us", "eu", "gb", "ch"].map((code, i) => (
                        <div key={code} className="flex items-center gap-2 cursor-pointer group">
                          <Image
                            src={`https://flagcdn.com/w40/${code}.png`}
                            width={24}
                            height={24}
                            unoptimized
                            alt={code}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="font-medium group-hover:border-black border-b-[1.5px] border-white">
                            {["USD", "EUR", "GBP", "CHF"][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="p-[13px] flex gap-[12px] items-center">
                      {["au", "ca"].map((code, i) => (
                        <div
                          key={code}
                          className={`flex items-center gap-2 cursor-pointer group ${i === 1 ? "ml-[18px]" : ""}`}
                        >
                          <Image
                            src={`https://flagcdn.com/w40/${code}.png`}
                            width={24}
                            height={24}
                            unoptimized
                            alt={code}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="font-medium group-hover:border-black border-b-[1.5px] border-white">
                            {["AUD", "CAD"][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <IoIosSearch className="text-[28px]" onClick={() => setOpenSearch(true)} />

            <div className="relative">
              <div
                className={`bg-white fixed top-0 left-0 md:w-[370px] max-[320px]:w-[300px] w-[340px] h-full z-50 transition-all duration-300 ${
                  openSearch ? "translate-x-0" : "-translate-x-full"
                }`}
                ref={searchSideBar}
              >
                <div className="px-4 py-3 flex justify-between items-center">
                  <h2 className="font-medium text-lg">Search</h2>
                  <IoMdClose className="text-[27px]" onClick={() => setOpenSearch(false)} />
                </div>
                <div className="px-4 py-3">
                  <div className="relative h-[43px]">
                    <label
                      className={`absolute top-[10px] left-3 transition-all duration-300 ${
                        focus ? "-translate-x-1 opacity-0" : "translate-x-0 opacity-100"
                      }`}
                    >
                      Search product...
                    </label>
                    <input
                      className="w-full h-full rounded border-b border-gray-300 outline-none pl-3 shadowSearch text-[15px] placeholder-gray-600"
                      type="text"
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                    />
                    <IoSearch className="absolute bottom-0 right-0 p-[9px] w-[11.5%] h-full" />
                  </div>
                </div>
                <div className="px-2 py-3 overflow-y-scroll h-[280px] mt-1 w-[95%] mx-auto">
                  <SearchSuggestions variant="mobile" />
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-[16%] w-[34%]">
            <Image src={logo} alt="xteamwear" className="w-full h-auto" />
          </div>

          <div className="flex items-center gap-5 mr-2">
            <PiUserLight className="text-[28px]" />
            <Link href="/cart" className="relative">
              <span className="absolute -top-[8px] -right-[9px] text-[13px] bg-black text-white w-6 h-6 flex justify-center items-center rounded-full">
                {cart.length}
              </span>
              <CgShoppingBag className="text-[28px]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}