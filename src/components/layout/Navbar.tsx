"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { PiShoppingCartLight, PiUserLight } from "react-icons/pi";
import { FiPackage, FiShield, FiLogOut, FiUser } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import MobileNavbar from "./MobileNavbar";
import toast from "react-hot-toast";

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

function PopularProductCard({ product, onClick }: { product: any; onClick: () => void }) {
  const displayPrice = product.newPrice ?? product.price ?? 0;
  const oldPrice = product.oldPrice;
  
  const firstVariant = product.variants?.[0];
  
  const mainImage = firstVariant?.icon || firstVariant?.images?.[0] || product.image || "/placeholder.png";
  const hoverImage = firstVariant?.images?.[1] || product.variants?.[1]?.icon || mainImage;

  const discount = oldPrice && oldPrice > displayPrice 
    ? Math.round(((oldPrice - displayPrice) / oldPrice) * 100) 
    : 0;

  return (
    <div className="group flex flex-col justify-center shrink-0 cursor-pointer" onClick={onClick}>
      <div className="w-full h-[180px] group/img transition-all duration-300 relative overflow-hidden rounded-sm bg-gray-50">
        <Image
          src={mainImage}
          alt={product.name || "Product Image"}
          fill
          sizes="150px"
          className="object-cover opacity-100 group-hover/img:opacity-0 transition-opacity duration-700 ease-in-out"
        />
        <Image
          src={hoverImage}
          alt={product.name || "Product Image"}
          fill
          sizes="150px"
          className="object-cover absolute top-0 left-0 opacity-0 group-hover/img:opacity-100 ease-out hover:scale-105 transition-all duration-700"
        />
      </div>
      <div className="w-[150px] pt-3">
        <span className="text-[11px] leading-snug line-clamp-2 font-medium text-[#0B1E3D] group-hover:text-[#A9762F] transition-colors">
          {product.name}
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          {oldPrice && oldPrice > displayPrice && (
            <p className="text-gray-400 font-medium text-[13px] line-through">${oldPrice}</p>
          )}
          <p className="text-[#A9762F] font-semibold text-[14px]">${displayPrice}</p>
        </div>
        <div className="w-full flex justify-between items-center mt-2">
          {firstVariant?.icon ? (
            <div className="relative w-[22px] h-[22px] rounded-full border border-[#E6E1D6] overflow-hidden">
              <Image src={firstVariant.icon} alt={firstVariant.color || "color"} fill sizes="22px" className="rounded-full object-cover" />
            </div>
          ) : <div />}
          {discount > 0 && (
            <span className="text-[11px] tracking-wide font-medium text-[#A9762F] border border-[#A9762F]/40 px-2 py-[2px] rounded-full">
              −{discount}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function SearchSuggestions({
  tags,
  loadingTags,
  popularProducts,
  loadingPopular,
  onSelectTag,
  onProductClick,
}: {
  tags: string[];
  loadingTags: boolean;
  popularProducts: any[];
  loadingPopular: boolean;
  onSelectTag?: (tag: string) => void;
  onProductClick: (prod: any) => void;
}) {
  const wrapClass = "flex flex-wrap gap-2 pt-4";

  return (
    <>
      {/* Trending Header */}
      <div className="pb-3 border-b border-[#E6E1D6]">
        <span className="text-[11px] tracking-[0.14em] font-semibold text-[#A9762F] uppercase">
          Trending — Categories & Items
        </span>
      </div>

      {/* Dynamic Tags Grid */}
      <div className={wrapClass}>
        {loadingTags ? (
          <p className="text-xs text-gray-400 py-2">Loading trending items...</p>
        ) : tags.length > 0 ? (
          tags.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => onSelectTag && onSelectTag(tag)}
              className="flex gap-1 items-center border border-[#E6E1D6] hover:border-[#A9762F] hover:bg-[#A9762F]/10 active:scale-95 cursor-pointer transition-all duration-200 group py-[6px] px-3 rounded-full text-left"
            >
              <span className="text-[12.5px] text-[#0B1E3D]/80 group-hover:text-[#A9762F] font-medium">
                {tag}
              </span>
            </button>
          ))
        ) : (
          <p className="text-xs text-gray-400 py-2">No categories available</p>
        )}
      </div>

      {/* Popular Products Section */}
      <div className="mt-6">
        <span className="text-[11px] tracking-[0.14em] font-semibold text-[#0B1E3D] uppercase border-b border-[#E6E1D6] pb-2 block">
          Popular Products
        </span>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-3 [&::-webkit-scrollbar]:h-[3px] [&::-webkit-scrollbar-track]:bg-[#E6E1D6] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#A9762F]/60 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#A9762F]">
          {loadingPopular ? (
            <p className="text-xs text-gray-400 py-4">Loading popular products...</p>
          ) : popularProducts.length > 0 ? (
            popularProducts.map((prod) => (
              <PopularProductCard
                key={prod._id}
                product={prod}
                onClick={() => onProductClick(prod)}
              />
            ))
          ) : (
            <p className="text-xs text-gray-400 py-4">No popular products found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const [focus, setFocus] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [logoUrl, setLogoUrl] = useState("");

  // States for Trending Tags and Popular Products (Shared across Desktop & Mobile)
  const [trendingTags, setTrendingTags] = useState<string[]>([]);
  const [loadingTags, setLoadingTags] = useState(true);
  const [popularProducts, setPopularProducts] = useState<any[]>([]);
  const [loadingPopular, setLoadingPopular] = useState(true);

  // Fetch Trending Tags
  useEffect(() => {
    async function fetchTrendingTags() {
      try {
        const res = await fetch("/api/trending-tags");
        const data = await res.json();
        if (data.success && Array.isArray(data.tags)) {
          setTrendingTags(data.tags);
        }
      } catch (err) {
        console.error("Failed to fetch trending tags:", err);
      } finally {
        setLoadingTags(false);
      }
    }
    fetchTrendingTags();
  }, []);

  // Fetch Popular Products
  useEffect(() => {
    async function fetchPopular() {
      try {
        const res = await fetch("/api/popular-products");
        const data = await res.json();
        if (data.success && data.products) {
          setPopularProducts(data.products);
        } else {
          setPopularProducts([]);
        }
      } catch (err) {
        console.error("Popular Products fetch error", err);
        setPopularProducts([]);
      } finally {
        setLoadingPopular(false);
      }
    }
    fetchPopular();
  }, []);

  // Fetch Settings Logo
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        setLogoUrl(data?.settings?.logo || "");
      } catch (err) {
        console.error("Settings fetch error", err);
      }
    }
    fetchSettings();
  }, []);

  const [accountOpen, setAccountOpen] = useState(false);
  const accountBoxRef = useRef<HTMLDivElement>(null);

  const { cart } = useCart();
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const handleCartClick = () => {
    if(!cart || cart.length === 0) {
      toast.error("Your cart is empty! Add items first.", {
        style: {
          borderRadius: '12px',
          background: '#0f172a', // Slate 900
          color: '#fff',
          fontSize: '13px',
          fontWeight: '600',
        },
        iconTheme: {
          primary: '#ef4444',
          secondary: '#fff',
        },
      });
      return;
    }
    router.push("/cart");
  }

  // Handle Outside Click for Search Box
  useEffect(() => {
    function handleClickOutsideSearch(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchFocus(false);
        setFocus(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideSearch);
    return () => document.removeEventListener("mousedown", handleClickOutsideSearch);
  }, []);

  // Handle Outside Click for Account Dropdown
  useEffect(() => {
    function handleClickOutsideAccount(event: MouseEvent) {
      if (accountBoxRef.current && !accountBoxRef.current.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideAccount);
    return () => document.removeEventListener("mousedown", handleClickOutsideAccount);
  }, []);

  // Search API fetch on Query Change
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const res = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        if (data.success) {
          setSearchResults(data.products);
        }
      } catch (error) {
        console.error("Search Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Dynamic Route Navigation
  const handleProductClick = (prod: any) => {
    setSearchFocus(false);
    setFocus(false);

    const defaultColor = prod.variants?.[0]?.color || "default";
    const encodedColor = encodeURIComponent(defaultColor);

    router.push(`/card/${prod._id}/${encodedColor}`);
  };

  return (
    <div>
      {/* ================= Desktop Navigation ================= */}
      <div className="w-full xl:flex hidden border-b border-[#E6E1D6] bg-white">
        <div className="w-[91%] h-[100px] mx-auto flex items-center justify-between">
          {/* Brand / Logo */}
          <Link href="/" className="cursor-pointer shrink-0">
            {logoUrl ? (
              <Image className="w-[80%] h-auto" src={logoUrl} alt="BeSpoke Wear" width={160} height={60} />
            ) : (
              <span className="font-serif text-2xl tracking-tight text-[#0B1E3D]">BeSpoke Wear</span>
            )}
          </Link>

          {/* Search Bar & Suggestions */}
          <div className="flex flex-col w-[34%] mr-10 relative" ref={searchContainerRef}>
            <div
              className={`flex items-center h-[46px] rounded-full bg-[#FAF8F3] border transition-all duration-300 pl-4 pr-1 ${
                focus ? "border-[#A9762F] shadow-[0_0_0_3px_rgba(169,118,47,0.12)]" : "border-[#E6E1D6]"
              }`}
            >
              <input
                className="w-full h-full outline-none text-[14.5px] bg-transparent placeholder-[#0B1E3D]/40 text-[#0B1E3D]"
                type="text"
                placeholder="Search the store..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  setFocus(true);
                  setSearchFocus(true);
                }}
              />
              <button
                type="button"
                aria-label="Search"
                className="shrink-0 w-[36px] h-[36px] rounded-full bg-[#0B1E3D] hover:bg-[#A9762F] flex items-center justify-center transition-colors duration-300 cursor-pointer"
              >
                <IoSearch className="text-[16px] text-white" />
              </button>
            </div>

            {searchFocus && (
              <div className="bg-white absolute top-[54px] left-0 w-[130%] max-h-[350px] rounded-md border border-[#E6E1D6] shadow-xl overflow-y-auto z-50 p-4
                [&::-webkit-scrollbar]:w-[5px] 
                [&::-webkit-scrollbar-track]:bg-transparent 
                [&::-webkit-scrollbar-thumb]:bg-[#A9762F]/40 
                [&::-webkit-scrollbar-thumb]:rounded-full
                hover:[&::-webkit-scrollbar-thumb]:bg-[#A9762F]
              ">
                {isLoading ? (
                  <p className="text-xs text-gray-500 text-center py-4">Searching...</p>
                ) : searchResults.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-semibold text-[#A9762F] uppercase tracking-wider">
                      Products Found
                    </span>
                    {searchResults.map((prod) => {
                      const displayPrice = prod.newPrice ?? prod.price ?? 0;
                      const displayImage =
                        prod.variants?.[0]?.images?.[0] ||
                        prod.images?.[0] ||
                        prod.image ||
                        "/placeholder.png";

                      return (
                        <div
                          key={prod._id}
                          onClick={() => handleProductClick(prod)}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#FAF8F3] transition-colors group cursor-pointer"
                        >
                          <div className="w-[45px] h-[45px] relative rounded overflow-hidden border border-[#E6E1D6] shrink-0 bg-gray-50">
                            <Image
                              src={displayImage}
                              alt={prod.name || "Product"}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-[#0B1E3D] group-hover:text-[#A9762F] line-clamp-1">
                              {prod.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-[#A9762F]">
                                ${displayPrice} USD
                              </span>
                              {prod.oldPrice && (
                                <span className="text-[10px] text-gray-400 line-through">
                                  ${prod.oldPrice}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : searchQuery ? (
                  <p className="text-xs text-gray-500 text-center py-4">
                    No products found for "{searchQuery}"
                  </p>
                ) : (
                  <SearchSuggestions 
                    tags={trendingTags}
                    loadingTags={loadingTags}
                    popularProducts={popularProducts}
                    loadingPopular={loadingPopular}
                    onSelectTag={(tag) => setSearchQuery(tag)} 
                    onProductClick={(prod) => handleProductClick(prod)} 
                  />
                )}
              </div>
            )}
          </div>

          {/* Cart & User Action Buttons */}
          <div className="flex gap-4 items-center">
            <div onClick={handleCartClick} className="flex items-center gap-2.5 group cursor-pointer pr-4 border-r border-[#E6E1D6]">
              <div className="relative w-[42px] h-[42px] rounded-full border border-[#E6E1D6] group-hover:border-[#A9762F] flex items-center justify-center transition-colors duration-200">
                <PiShoppingCartLight className="text-[21px] text-[#0B1E3D] group-hover:text-[#A9762F] transition-colors duration-200" />
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center bg-[#A9762F] rounded-full font-semibold text-white text-[10.5px] w-[17px] h-[17px] ring-2 ring-white">
                  {cart.length}
                </span>
              </div>
              <span className="text-[13px] text-[#0B1E3D] font-medium hidden 2xl:inline">Cart</span>
            </div>

            {status === "authenticated" ? (
            <div className="flex items-center gap-2 relative" ref={accountBoxRef}>
              {/* Trigger Button - Colors fixed (no gold hover effect) */}
              <button
                type="button"
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex items-center gap-2.5 cursor-pointer outline-none focus:outline-none"
              >
                <div className="w-[42px] h-[42px] rounded-full border border-[#E6E1D6] flex items-center justify-center bg-white shadow-xs">
                  <PiUserLight className="text-[21px] text-[#0B1E3D]" />
                </div>
                <div className="flex flex-col text-[13px] items-start leading-tight">
                  <span className="text-[#0B1E3D]/60 text-[11.5px] font-medium">
                    Hi, {session.user?.name?.split(" ")[0]}
                  </span>
                  <span className="font-medium text-[#0B1E3D]">
                    My Account
                  </span>
                </div>
              </button>

              {/* Dropdown Menu */}
              <div
                className="bg-white z-50 w-[230px] rounded-xl absolute top-[52px] right-0 border border-[#E6E1D6] shadow-[0_16px_36px_-10px_rgba(11,30,61,0.22)] transition-all duration-300 overflow-hidden"
                style={{
                  opacity: accountOpen ? 1 : 0,
                  pointerEvents: accountOpen ? "auto" : "none",
                  transform: accountOpen ? "translateY(0)" : "translateY(-8px)",
                }}
              >
                {/* Header Info Banner */}
                <div className="px-4 py-3 bg-[#0B1E3D]/5 border-b border-[#E6E1D6] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0B1E3D] text-white flex items-center justify-center shrink-0 font-bold text-xs uppercase">
                    {session.user?.name ? session.user.name[0] : <FiUser />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#0B1E3D] truncate leading-tight">
                      {session.user?.name || "User"}
                    </p>
                    <p className="text-[11px] text-[#0B1E3D]/60 truncate">
                      {session.user?.email}
                    </p>
                  </div>
                </div>

                {/* Menu Links */}
                <div className="p-1.5 space-y-0.5">
                  <Link 
                    href="/orders" 
                    onClick={() => setAccountOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-xs font-semibold text-[#0B1E3D] hover:bg-[#A9762F]/10 hover:text-[#A9762F] flex items-center gap-2.5 transition-colors duration-150"
                  >
                    <FiPackage className="text-base text-[#0B1E3D]/70" />
                    <span>My Orders</span>
                  </Link>

                  {isAdmin && (
                    <Link 
                      href="/admin" 
                      onClick={() => setAccountOpen(false)}
                      className="px-3 py-2.5 rounded-lg text-xs font-semibold text-[#0B1E3D] hover:bg-[#A9762F]/10 hover:text-[#A9762F] flex items-center gap-2.5 transition-colors duration-150"
                    >
                      <FiShield className="text-base text-[#0B1E3D]/70" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}

                  <div className="h-[1px] bg-[#E6E1D6] my-1" />

                  <button
                    type="button"
                    className="w-full px-3 py-2.5 rounded-lg text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors duration-150 cursor-pointer"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <FiLogOut className="text-base" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/sign-in" className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-[42px] h-[42px] rounded-full border border-[#E6E1D6] flex items-center justify-center bg-white">
                <PiUserLight className="text-[21px] text-[#0B1E3D]" />
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

      {/* ================= Mobile Navigation Component ================= */}
      <MobileNavbar 
        categoriesCategory={categoriesCategory} 
        categoriesMenu={categoriesMenu}
        popularProducts={popularProducts}
        trendingTags={trendingTags}
        logoUrl={logoUrl}
        cart={cart}
        status={status}
        session={session}
        signOut={signOut}
      />
    </div>
  );
}