"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

export default function Description() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-12 sm:mt-16 border-t border-slate-200 pt-8 sm:pt-10 max-w-5xl mx-auto px-4 sm:px-0 font-sans">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950">
          Product Specifications & Features
        </h2>
        <p className="text-[11px] sm:text-xs text-slate-500 font-bold mt-1 uppercase tracking-widest">
          High-performance sublimated teamwear engineered for extreme durability
        </p>
      </div>

      <div className="bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-8 space-y-6 text-slate-800">
        
        {/* Core Specs Grid */}
        <div>
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-600 mb-3">
            Material & Craftsmanship
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold text-slate-700">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span>CONVEX-FIT Moisture Management Fabric</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span>100% Polyester Wicking Knit (92/8 Mesh Panels)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span>Anti-Friction Heat Tagless Inner Labeling</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span>Full Sublimation Non-Fade Italian Ink Printing</span>
            </li>
          </ul>
        </div>

        {/* Animated Accordion Wrapper */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-5 pt-4 border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 mb-1">
                  Turnaround & Dispatch Guarantee
                </h4>
                <p>
                  Standard custom sublimation manufacturing takes 7-10 business days. Priority expedited express shipping options are available at checkout.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 mb-1">
                  Washing & Care Instructions
                </h4>
                <p>
                  Machine wash cold with similar colors. Do not use fabric softeners or chlorine bleach. Tumble dry low or hang dry for best long-term fabric performance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 hover:border-slate-950 text-slate-950 text-xs font-extrabold uppercase tracking-wider rounded-full transition-all shadow-sm active:scale-95"
          >
            <span>{isOpen ? "Read Less Details" : "Read Full Specs"}</span>
            <HiChevronDown
              className={`text-sm transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>

      </div>
    </div>
  );
}