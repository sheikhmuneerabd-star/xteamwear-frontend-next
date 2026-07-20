"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LuTruck, LuShieldCheck, LuBadgeCheck, LuHeadphones } from "react-icons/lu";
import type { IconType } from "react-icons";

interface PromiseFeature {
  icon: IconType;
  title: string;
  text: string;
}

const features: PromiseFeature[] = [
  {
    icon: LuTruck,
    title: "Free Standard Delivery",
    text: "Professional gear delivered to your team at no extra shipping cost.",
  },
  {
    icon: LuShieldCheck,
    title: "Secure Shopping",
    text: "Your transactions are protected by industry-leading SSL encryption.",
  },
  {
    icon: LuBadgeCheck,
    title: "Shop With Confidence",
    text: "Quality-tested uniforms backed by our 100% satisfaction guarantee.",
  },
  {
    icon: LuHeadphones,
    title: "24/7 Help Center",
    text: "Expert support for your custom orders available 24/7 whenever you need.",
  },
];

export default function PromiseSection() {
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    async function fetchLogo() {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setLogoUrl(data.settings.logo || "");
    }
    fetchLogo();
  }, []);

  return (
    <div className="bg-[#F7F7F5] py-14">
      <div className="w-[92%] xl:w-[85%] mx-auto">
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-3xl font-bold text-[#0B1E3D] tracking-wide">PROMISE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="group bg-white rounded-xl p-6 border border-transparent hover:border-[#0B1E3D] hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-[#0B1E3D] group-hover:bg-[#FF5A36] flex items-center justify-center transition-colors duration-300">
                  <Icon className="text-[#C6FF00] group-hover:text-white text-2xl transition-colors duration-300" />
                </div>
                <h3 className="mt-4 font-semibold text-[16px] text-[#0B1E3D]">{item.title}</h3>
                <p className="text-gray-500 text-[13.5px] mt-1.5 leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}