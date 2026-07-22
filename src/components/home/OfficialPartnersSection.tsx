"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { HiCheckBadge, HiArrowRight } from "react-icons/hi2";

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
    image: redwoman,
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
    <section className="py-12 bg-slate-50 text-slate-900 font-sans overflow-hidden border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center space-y-1 mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
            Trusted Across Professional Leagues
          </p>
          <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-800 uppercase">
            POWERING CHAMPIONS WORLDWIDE
          </h3>
        </div>

        <div className="relative w-full overflow-hidden rounded-xl bg-white border border-slate-200 py-4 shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee space-x-12 sm:space-x-16 items-center">
            {[...partnerLogos, ...partnerLogos].map((logo, index) => (
              <div key={index} className="flex flex-col items-center justify-center group cursor-pointer">
                <span className="text-base sm:text-xl font-black tracking-tighter text-slate-400 group-hover:text-amber-600 transition-colors uppercase font-mono">
                  {logo.name}
                </span>
                <span className="text-[9px] font-bold tracking-widest text-slate-400 group-hover:text-slate-600 uppercase mt-0.5">
                  {logo.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-700 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-2">
              <HiCheckBadge className="text-amber-600 text-sm" />
              OFFICIAL TEAM KITS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">
              PRO TEAM SPOTLIGHT
            </h2>
          </div>

          <Link
            href="/partners"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-amber-600 transition-colors group"
          >
            <span>VIEW ALL PARTNER CLUBS</span>
            <HiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredTeams.map((team) => (
            <Link
              key={team.id}
              href={team.link}
              className="group relative h-[420px] sm:h-[380px] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md hover:border-amber-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-end"
            >
              <Image
                src={team.image}
                alt={team.name}
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent transition-opacity duration-300" />

              <div className="absolute top-3 left-3 z-10">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-950 bg-amber-400 px-2.5 py-1 rounded-full shadow">
                  {team.badgeText}
                </span>
              </div>

              <div className="relative z-10 p-5 space-y-1">
                <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  {team.league}
                </p>

                <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-amber-300 transition-colors">
                  {team.name}
                </h3>

                <div className="pt-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explore Team Gear</span>
                  <HiArrowRight className="text-amber-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

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