"use client";

import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface Advantage {
  image: string;
  title: string;
}

export default function FactoryCard() {
  const [features, setFeatures] = useState<Advantage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        setFeatures(data?.settings?.advantages || []);
      } catch (error) {
        console.error("Failed to load factory advantages", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  useGSAP(() => {
    if (features.length === 0) return;

    ScrollTrigger.batch(".advantage-card", {
      start: "top 88%",
      once: true,
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
          }
        );
      },
    });
  }, [features]);

  // Premium Skeleton Loading State
  if (loading) {
    return (
      <section className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="bg-slate-200/80 rounded-2xl aspect-[4/3] w-full" />
              <div className="h-5 bg-slate-200/80 rounded-md w-3/4 mx-auto" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (features.length === 0) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-6 py-12 font-sans">
      
      {/* Optional Section Header for Brand Presence */}
      <div className="text-center mb-10">
        <span className="text-[12px] font-bold uppercase tracking-widest text-amber-600 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
          Why Choose Us
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B1426] mt-3 tracking-tight">
          Factory Precision & Craftsmanship
        </h2>
      </div>

      {/* Grid Cards Container */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, i) => (
          <div
            key={i}
            className="advantage-card group cursor-pointer rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col"
          >
            {/* Image Container with Dark Overlay Effect */}
            <div className="overflow-hidden relative aspect-[4/3] w-full bg-slate-900">
              <Image
                className="object-cover group-hover:scale-108 opacity-95 group-hover:opacity-100 transition-all duration-500 ease-out"
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              
              {/* Soft Gradient Overlay for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300" />
            </div>

            {/* Title Section */}
            <div className="p-4 md:p-5 flex-1 flex items-center justify-center text-center">
              <h3 className="text-[15px] md:text-[17px] font-bold text-[#0B1426] group-hover:text-amber-600 transition-colors duration-200 leading-snug">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}