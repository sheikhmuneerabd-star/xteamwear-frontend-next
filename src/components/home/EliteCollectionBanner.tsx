"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CardItem {
  badge?: string;
  category: string;
  title: string;
  image: string;
  link: string;
}

interface BannerData {
  badge: string;
  heading: string;
  description: string;
  mainImage: string;
  buttonText: string;
  buttonLink: string;
  cards: CardItem[];
}

const DEFAULT_BANNER: BannerData = {
  badge: "BESPOKE WEAR • 2026 RELEASE",
  heading: "2026 ELITE PERFORMANCE COLLECTION",
  description:
    "Engineered with advanced moisture-wicking technology and ergonomic fit. Designed exclusively for professional athletes and modern teams.",
  mainImage:
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000",
  buttonText: "EXPLORE FULL COLLECTION",
  buttonLink: "/category/all",
  cards: [
    {
      badge: "BEST SELLER",
      category: "PRO FOOTBALL",
      title: "Sublimated Pro Match Jersey",
      image:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600",
      link: "/category/Football",
    },
    {
      badge: "NEW",
      category: "TRAINING WEAR",
      title: "Ergonomic Training Zip Top",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600",
      link: "/category/Training",
    },
    {
      badge: "",
      category: "ATHLETIC WEAR",
      title: "Elite Performance Track Suit",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600",
      link: "/category/Winter Wear",
    },
  ],
};

export default function BespokeSection() {
  const [data, setData] = useState<BannerData>(DEFAULT_BANNER);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBannerData() {
      try {
        let res = await fetch("/api/settings");
        if (res.ok) {
          const json = await res.json();
          const fetchedData = json.settings?.bespokeBanner;

          if (fetchedData && Object.keys(fetchedData).length > 0) {
            setData({
              badge: fetchedData.badge || DEFAULT_BANNER.badge,
              heading: fetchedData.heading || DEFAULT_BANNER.heading,
              description: fetchedData.description || DEFAULT_BANNER.description,
              mainImage: fetchedData.mainImage && fetchedData.mainImage.trim() !== "" 
                ? fetchedData.mainImage 
                : DEFAULT_BANNER.mainImage,
              buttonText: fetchedData.buttonText || DEFAULT_BANNER.buttonText,
              buttonLink: fetchedData.buttonLink || DEFAULT_BANNER.buttonLink,
              cards:
                fetchedData.cards && fetchedData.cards.length > 0
                  ? fetchedData.cards.map((card: CardItem, idx: number) => ({
                      badge: card.badge || "",
                      category: card.category || DEFAULT_BANNER.cards[idx]?.category || "",
                      title: card.title || DEFAULT_BANNER.cards[idx]?.title || "",
                      image: card.image && card.image.trim() !== "" 
                        ? card.image 
                        : DEFAULT_BANNER.cards[idx]?.image || DEFAULT_BANNER.mainImage,
                      link: card.link || DEFAULT_BANNER.cards[idx]?.link || "/category/all",
                    }))
                  : DEFAULT_BANNER.cards,
            });
          }
        }
      } catch (err) {
        console.error("Error fetching bespoke banner data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBannerData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="w-full h-96 bg-slate-200/60 rounded-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-[#fcfbfa] border border-slate-200/60 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Big Main Image */}
          <div className="lg:col-span-5 relative w-full h-[350px] sm:h-[480px] rounded-2xl overflow-hidden flex items-center justify-center">
            <img
              src={data.mainImage}
              alt={data.heading || "Featured Collection"}
              className="w-full h-full object-contain transition-all duration-300"
              onError={(e) => {
                // Image broken hone par automatic fallback image show hogi
                (e.target as HTMLImageElement).src = DEFAULT_BANNER.mainImage;
              }}
            />
          </div>

          {/* Right Column: Dynamic Text & 3 Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header Content */}
            <div className="space-y-3">
              {data.badge && (
                <span className="inline-block bg-amber-500/10 border border-amber-500/20 text-amber-600 font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
                  {data.badge}
                </span>
              )}
              
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-slate-900 leading-tight">
                {data.heading}
              </h2>
              
              <p className="text-xs sm:text-sm font-medium text-slate-500 max-w-xl leading-relaxed">
                {data.description}
              </p>

              <div className="pt-2">
                <Link
                  href={data.buttonLink || "/category/all"}
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md"
                >
                  <span>{data.buttonText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Bottom 3 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {data.cards?.map((card, index) => (
                <Link
                  key={index}
                  href={card.link || "/category/all"}
                  className="group bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all block relative"
                >
                  {/* Badge */}
                  {card.badge && (
                    <span className="absolute top-4 left-4 z-10 bg-amber-500 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm">
                      {card.badge}
                    </span>
                  )}

                  {/* Card Image */}
                  <div className="relative w-full h-36 bg-slate-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                    <img
                      src={card.image}
                      alt={card.title || "Collection Item"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          DEFAULT_BANNER.cards[index]?.image || DEFAULT_BANNER.mainImage;
                      }}
                    />
                  </div>

                  {/* Card Info */}
                  <div className="space-y-0.5 px-1">
                    <p className="text-[10px] font-black uppercase tracking-wider text-amber-600">
                      {card.category}
                    </p>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-amber-600 transition-colors">
                      {card.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}