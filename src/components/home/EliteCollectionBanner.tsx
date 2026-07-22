"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import redwoman from "@/assets/redwoman.avif";
import blueman from "@/assets/blueman.avif";
import purpleman from "@/assets/purpleman.avif";

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
    <section className="py-12 bg-white text-slate-900 font-sans overflow-hidden border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Container */}
        <div className="relative rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden shadow-lg">
          
          {/* Light Glow Effect */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Side: Featured Hero Image */}
            <div className="lg:col-span-5 relative h-[280px] sm:h-[360px] lg:h-[460px] w-full overflow-hidden bg-slate-100">
              <Image
                src="/products/baseball/whiteBlackFront1.avif"
                alt="2026 Elite Performance Collection"
                fill
                priority
                className="object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-50/80" />
            </div>

            {/* Right Side: Headline & Product Row */}
            <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 z-10 flex flex-col justify-between">
              
              <div className="space-y-2.5 mb-6">
                <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-700 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                  BESPOKE WEAR • 2026 RELEASE
                </span>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 uppercase leading-tight">
                  2026 ELITE PERFORMANCE COLLECTION
                </h2>

                <p className="text-slate-600 text-xs sm:text-sm max-w-xl leading-relaxed">
                  Engineered with advanced moisture-wicking technology and ergonomic fit. Designed exclusively for professional athletes and modern teams.
                </p>

                <div className="pt-2">
                  <Link
                    href="/collections/elite-2026"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md shadow-amber-500/20 hover:-translate-y-0.5"
                  >
                    <span>EXPLORE FULL COLLECTION</span>
                    <HiArrowUpRight className="text-sm" />
                  </Link>
                </div>
              </div>

              {/* Product Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 border-t border-slate-200">
                {featuredProducts.map((item) => (
                  <Link
                    key={item.id}
                    href={item.link}
                    className="group relative rounded-xl bg-white border border-slate-200 p-2 shadow-sm hover:border-amber-500 transition-all duration-300 flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0"
                  >
                    <div className="relative w-16 h-16 sm:w-full sm:h-32 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 64px, 20vw"
                      />

                      {item.badge && (
                        <span className="absolute top-1.5 left-1.5 text-[9px] font-extrabold uppercase tracking-wider text-slate-950 bg-amber-400 px-2 py-0.5 rounded-md z-10 shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="sm:mt-2.5 flex-1">
                      <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                        {item.category}
                      </p>
                      <h3 className="text-xs font-bold text-slate-800 group-hover:text-amber-600 transition-colors line-clamp-1 mt-0.5">
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