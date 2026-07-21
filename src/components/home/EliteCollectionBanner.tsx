"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import redwoman from "@/assets/redwoman.avif";
import blueman from "@/assets/blueman.avif";
import purpleman from "@/assets/purpleman.avif";

// FIXED: `image` type is now updated to accept imported images (StaticImageData) or direct string paths
interface FeaturedProduct {
  id: string;
  name: string;
  category: string;
  image: StaticImageData | string;
  link: string;
  badge?: string;
}

const featuredProducts: FeaturedProduct[] = [
  {
    id: "1",
    name: "Sublimated Pro Match Jersey",
    category: "Pro Football",
    image: redwoman,
    link: "/products/pro-match-jersey",
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Ergonomic Training Zip Top",
    category: "Training Wear",
    image: blueman,
    link: "/products/training-zip-top",
    badge: "New",
  },
  {
    id: "3",
    name: "Elite Performance Track Suit",
    category: "Athletic Wear",
    image: purpleman,
    link: "/products/performance-tracksuit",
  },
];

export default function EliteCollectionBanner() {
  return (
    <section className="py-16 bg-[#0B1426] text-white font-sans overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Container */}
        <div className="relative rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Side: Dynamic Featured Hero Image */}
            <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] lg:h-[580px] w-full overflow-hidden">
              <Image
                src="/products/baseball/whiteBlackFront1.avif" // FIXED: Removed '/public' prefix
                alt="2026 Elite Performance Collection"
                fill
                priority
                className="object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-slate-950/40 lg:to-slate-900" />
            </div>

            {/* Right Side: Headline, Content & 3 Product Cards */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 z-10 flex flex-col justify-between">
              
              {/* Header Section */}
              <div className="space-y-3 mb-8">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full">
                  BESPOKE WEAR • 2026 RELEASE
                </span>

                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                  2026 ELITE PERFORMANCE COLLECTION
                </h2>

                <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
                  Engineered with advanced moisture-wicking technology and ergonomic fit. Designed exclusively for professional athletes and modern teams.
                </p>

                <div className="pt-2">
                  <Link
                    href="/collections/elite-2026"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/10 hover:-translate-y-0.5"
                  >
                    <span>EXPLORE FULL COLLECTION</span>
                    <HiArrowUpRight className="text-base" />
                  </Link>
                </div>
              </div>

              {/* Featured 3 Products Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800">
                {featuredProducts.map((item) => (
                  <Link
                    key={item.id}
                    href={item.link}
                    className="group relative rounded-2xl bg-slate-950/80 border border-slate-800 p-2.5 hover:border-amber-500/40 transition-all duration-300 flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0"
                  >
                    {/* Thumbnail Image */}
                    <div className="relative w-20 h-20 sm:w-full sm:h-40 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 80px, 20vw"
                      />

                      {item.badge && (
                        <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider text-slate-950 bg-amber-400 px-2 py-0.5 rounded-md z-10">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="sm:mt-3 flex-1">
                      <p className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">
                        {item.category}
                      </p>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-amber-400 transition-colors line-clamp-1 mt-0.5">
                        {item.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}