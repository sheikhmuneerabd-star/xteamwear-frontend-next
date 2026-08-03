"use client";

import React from "react";
import { 
  PhoneCall, 
  MessageSquare, 
  Mail, 
  Trophy, 
  Flame, 
  Globe2, 
  ArrowRight, 
  Sparkles, 
  Headphones
} from "lucide-react";

export default function CustomGearCTASection() {
  return (
    <section className="relative bg-white text-slate-900 py-8 sm:py-7 px-4 sm:px-6 lg:px-8 border-y border-slate-100 overflow-hidden">
      
      {/* Background Soft Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[2560px] mx-auto text-center space-y-6 sm:space-y-8">
        
        {/* Top Tag & Main Heading */}
        <div className="space-y-2 sm:space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-700 font-extrabold text-[11px] tracking-widest uppercase px-3 py-1 rounded-full">
            <Sparkles className="w-3 h-3 text-amber-600" /> Premier Custom Teamwear Partner
          </span>
          
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-slate-950 leading-tight">
            The Ultimate Hub for <span className="text-amber-500">Custom Team Gear</span> & Apparel
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-semibold">
            We deliver top-tier custom uniforms and specialized athletic gear tailored for every sport with expert designers and rapid delivery.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-left">
          
          <div className="bg-slate-50 border border-slate-200/80 p-3.5 sm:p-4 rounded-xl flex items-center gap-3 hover:border-amber-500/40 hover:shadow-sm transition-all">
            <div className="bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20 text-amber-600 shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-xs text-slate-900 uppercase">Lowest Price Guarantee</h3>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium leading-tight">Direct factory pricing with no hidden charges.</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 p-3.5 sm:p-4 rounded-xl flex items-center gap-3 hover:border-amber-500/40 hover:shadow-sm transition-all">
            <div className="bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20 text-amber-600 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-xs text-slate-900 uppercase">Endless Customization</h3>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium leading-tight">100% custom colors, numbers & team logos.</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 p-3.5 sm:p-4 rounded-xl flex items-center gap-3 hover:border-amber-500/40 hover:shadow-sm transition-all">
            <div className="bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20 text-amber-600 shrink-0">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-xs text-slate-900 uppercase">Fast Global Express</h3>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium leading-tight">Rapid 2-3 week turnaround with tracked shipping.</p>
            </div>
          </div>

        </div>

        {/* Highlighted Contact Callout Box */}
        <div className="bg-gradient-to-b from-slate-50 to-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-md space-y-5">
          
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-black uppercase text-slate-950 tracking-wide">
              Start Your Custom Order Today! Let Us Bring Your Design To Life
            </h3>
            <p className="text-xs text-slate-600 font-bold">
              Real and friendly people, no robots... always ready to help. Contact us now!
            </p>
          </div>

          {/* CONTACT METHODS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Phone Card */}
            <a 
              href="tel:+13478502720" 
              className="bg-white border border-slate-200 hover:border-amber-500 p-3 sm:p-3.5 rounded-xl flex items-center justify-center gap-3 transition-all shadow-xs hover:shadow-sm group cursor-pointer"
            >
              <div className="bg-amber-500/10 p-2 rounded-lg text-amber-600 group-hover:scale-105 transition-transform shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Call Us Now</span>
                <span className="text-sm font-black text-slate-950 group-hover:text-amber-600 transition-colors">
                  (347) 580-4219
                </span>
              </div>
            </a>

            {/* Live Chat Card */}
            <div className="bg-white border border-slate-200 p-3 sm:p-3.5 rounded-xl flex items-center justify-center gap-3 shadow-xs">
              <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-600 shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Live Chat</span>
                <span className="text-xs font-black text-emerald-600 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Available 24/7
                </span>
              </div>
            </div>

            {/* Sales Representative Card */}
            <a 
              href="#contact" 
              className="bg-white border border-slate-200 hover:border-amber-500 p-3 sm:p-3.5 rounded-xl flex items-center justify-center gap-3 transition-all shadow-xs hover:shadow-sm group cursor-pointer"
            >
              <div className="bg-amber-500/10 p-2 rounded-lg text-amber-600 group-hover:scale-105 transition-transform shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Sales Desk</span>
                <span className="text-xs font-black text-slate-950 group-hover:text-amber-600 transition-colors">
                  Contact Sales Rep
                </span>
              </div>
            </a>

          </div>

          {/* MAIN ACTION BUTTON */}
          <div className="pt-1">
            <button
              type="button"
              className="group relative inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer w-full sm:w-auto"
            >
              <Headphones className="w-4 h-4" />
              Get A Free Design And Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}