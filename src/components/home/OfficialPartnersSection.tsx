"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { HiCheckBadge, HiArrowRight } from "react-icons/hi2";

// Static Imports (Aap apne path ke mutabiq adjustment kar sakte hain)
import redwoman from "@/assets/redwoman.avif";
import blueman from "@/assets/blueman.avif";
import purpleman from "@/assets/purpleman.avif";

interface TeamCard {
  id: string;
  name: string;
  league: string;
  image: StaticImageData | string;
  link: string;
  badgeText: string;
}

const partnerLogos = [
  { name: "CIKERS SPORTS", label: "PRO KIT PROVIDER" },
  { name: "CHINESE HANDBALL ASSOC.", label: "OFFICIAL FEDERATION" },
  { name: "BRISBANE ROAR FC", label: "A-LEAGUE PARTNER" },
  { name: "OUTKAST ATHLETICS", label: "PERFORMANCE WEAR" },
  { name: "CANBERRA UNITED", label: "NATIONAL TEAMWEAR" },
  { name: "CENTRAL COAST MARINERS", label: "OFFICIAL STORE" },
];

const featuredTeams: TeamCard[] = [
  {
    id: "brisbane",
    name: "Brisbane Roar FC",
    league: "A-League Pro Division",
    image: redwoman, // Aapki image import
    link: "/partners/brisbane-roar",
    badgeText: "Official Matchday Kit",
  },
  {
    id: "mariners",
    name: "Central Coast Mariners",
    league: "National Champions",
    image: blueman,
    link: "/partners/mariners",
    badgeText: "Custom Sublimated Series",
  },
  {
    id: "canberra",
    name: "Canberra United FC",
    league: "Women's Premier League",
    image: purpleman,
    link: "/partners/canberra-united",
    badgeText: "Performance Apparel",
  },
];

export default function OfficialPartnersSection() {
  return (
    <section className="py-20 bg-[#070D18] text-white font-sans overflow-hidden border-t border-slate-800/80">
      
      {/* ---------------- SECTION 1: INFINITE LOGO MARQUEE ---------------- */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center space-y-2 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-500">
            Trusted Across Professional Leagues
          </p>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-200 uppercase">
            POWERING CHAMPIONS WORLDWIDE
          </h3>
        </div>

        {/* Logo Banner / Marquee Container */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800/80 py-6 backdrop-blur-sm">
          
          {/* Edge Blur Gradients for Seamless Look */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#070D18] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#070D18] to-transparent z-10 pointer-events-none" />

          {/* Infinite Marquee Track */}
          <div className="flex w-max animate-marquee space-x-12 sm:space-x-16 items-center">
            {[...partnerLogos, ...partnerLogos].map((logo, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center group cursor-pointer"
              >
                <span className="text-lg sm:text-2xl font-black tracking-tighter text-slate-400 group-hover:text-amber-400 transition-colors uppercase font-mono">
                  {logo.name}
                </span>
                <span className="text-[9px] font-bold tracking-widest text-slate-500 group-hover:text-slate-300 uppercase mt-0.5">
                  {logo.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- SECTION 2: FEATURED CLUBS GRID ---------------- */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full mb-3">
              <HiCheckBadge className="text-amber-400 text-sm" />
              OFFICIAL TEAM KITS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              PRO TEAM SPOTLIGHT
            </h2>
          </div>
          
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-amber-400 transition-colors group"
          >
            <span>VIEW ALL PARTNER CLUBS</span>
            <HiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Columns Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredTeams.map((team) => (
            <Link
              key={team.id}
              href={team.link}
              className="group relative h-[450px] sm:h-[500px] rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl hover:border-amber-500/50 transition-all duration-500 flex flex-col justify-end"
            >
              {/* Background Athlete Image */}
              <Image
                src={team.image}
                alt={team.name}
                fill
                priority
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Dynamic Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-950 bg-amber-400/90 backdrop-blur-md px-3 py-1 rounded-full shadow-md">
                  {team.badgeText}
                </span>
              </div>

              {/* Card Bottom Content */}
              <div className="relative z-10 p-6 sm:p-8 space-y-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {team.league}
                </p>
                
                <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-amber-300 transition-colors">
                  {team.name}
                </h3>

                <div className="pt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explore Team Gear</span>
                  <HiArrowRight className="text-amber-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* Tailwind CSS Marquee Animation Utility (Standard CSS me add kar saktay hain) */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}