"use client";

import { useEffect, useState } from "react";
import { 
  LuTruck, 
  LuLock, 
  LuBadgeCheck, 
  LuHeadset, 
  LuShieldCheck 
} from "react-icons/lu";
import type { IconType } from "react-icons";

interface PromiseFeature {
  number: string;
  icon: IconType;
  title: string;
  text: string;
}

const features: PromiseFeature[] = [
  {
    number: "01",
    icon: LuTruck,
    title: "Free Worldwide Delivery",
    text: "No extra shipping charges on all custom team & bulk orders.",
  },
  {
    number: "02",
    icon: LuLock,
    title: "End-to-End Secure Checkout",
    text: "Encrypted transactions protected with bank-grade SSL security.",
  },
  {
    number: "03",
    icon: LuBadgeCheck,
    title: "Premium Quality Guarantee",
    text: "Every custom garment is quality tested before final dispatch.",
  },
  {
    number: "04",
    icon: LuHeadset,
    title: "24/7 Dedicated Support",
    text: "Expert guidance for custom designs & orders, anytime you need.",
  },
];

export default function PromiseSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="bg-slate-50/70 py-20 border-t border-slate-100 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 mb-3">
            <LuShieldCheck className="text-lg text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-widest">
              OUR COMMITMENT
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1426] tracking-tight">
            The Bespoke Wear Guarantee
          </h2>

          <p className="text-sm md:text-base text-slate-500 mt-2">
            Four core standards we guarantee on every custom order, without compromise.
          </p>
        </div>

        {/* Promise Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className={`group relative overflow-hidden bg-white rounded-2xl p-6 md:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Top Animated Accent Bar */}
                <div className="absolute top-0 left-0 h-[3px] bg-amber-500 w-[25%] group-hover:w-full transition-all duration-500 ease-out" />

                <div>
                  {/* Top Line: Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold tracking-wider text-slate-400 group-hover:text-amber-600 transition-colors">
                      {item.number}
                    </span>

                    <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-[#0B1426] flex items-center justify-center transition-all duration-300 shadow-inner">
                      <Icon className="text-[#0B1426] group-hover:text-amber-400 text-2xl transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-lg text-[#0B1426] group-hover:text-amber-600 transition-colors duration-200">
                    {item.title}
                  </h3>

                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}