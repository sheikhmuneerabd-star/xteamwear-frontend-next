"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import redwoman from "@/assets/redwoman.avif";
import blueman from "@/assets/blueman.avif";
import purpleman from "@/assets/purpleman.avif";

interface TeamCard {
  id: string;
  name: string;
  image: StaticImageData | string;
  link: string;
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
    name: "BRISBANE ROAR",
    image: redwoman,
    link: "/partners/brisbane-roar",
  },
  {
    id: "mariners",
    name: "MARINERS CENTRAL COAST",
    image: blueman,
    link: "/partners/mariners",
  },
  {
    id: "canberra",
    name: "CANBERRA UNITED",
    image: purpleman,
    link: "/partners/canberra-united",
  },
];

export default function OfficialPartnersSection() {
  return (
    <section className="py-14 bg-white text-slate-900 font-sans border-t border-slate-100">
      {/* Top Marquee Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center space-y-1 mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
            Trusted Across Professional Leagues
          </p>
          <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-800 uppercase">
            POWERING CHAMPIONS WORLDWIDE
          </h3>
        </div>

        <div className="relative w-full overflow-hidden rounded-xl bg-slate-50 border border-slate-200 py-4 shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

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

      {/* Grid Cards Section */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTeams.map((team) => (
            <Link
              key={team.id}
              href={team.link}
              className="group relative h-[480px] sm:h-[520px] rounded-none overflow-hidden bg-slate-100 flex flex-col justify-end"
            >
              {/* Image */}
              <Image
                src={team.image}
                alt={team.name}
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Minimal Dark Bar Label */}
              <div className="relative z-10 w-full bg-black/40 backdrop-blur-sm py-2.5 text-center transition-colors group-hover:bg-black/60">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                  {team.name}
                </h3>
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