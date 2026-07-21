"use client";

import { useEffect, useState } from "react";
import { LuTruck, LuLock, LuBadgeCheck, LuHeadset, LuShieldCheck } from "react-icons/lu";
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
    title: "Free delivery",
    text: "No extra shipping cost on any team order.",
  },
  {
    number: "02",
    icon: LuLock,
    title: "Secure checkout",
    text: "Every transaction is SSL encrypted end to end.",
  },
  {
    number: "03",
    icon: LuBadgeCheck,
    title: "Quality tested",
    text: "Every kit backed by our satisfaction guarantee.",
  },
  {
    number: "04",
    icon: LuHeadset,
    title: "24/7 support",
    text: "Real help for custom orders, day or night.",
  },
];

export default function PromiseSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="w-[92%] xl:w-[85%] mx-auto">
        {/* Seal-style heading */}
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="w-[54px] h-[54px] rounded-full border-[1.5px] border-[#0B1E3D] flex items-center justify-center shrink-0">
            <LuShieldCheck className="text-2xl text-[#0B1E3D]" />
          </div>
          <div>
            <p className="text-[12px] tracking-[0.15em] text-gray-400 font-medium">
              OUR COMMITMENT
            </p>
            <p className="text-[22px] font-semibold text-[#0B1E3D]">The Xteamwear Promise</p>
          </div>
        </div>
        <p className="text-center text-[14px] text-gray-500 max-w-[420px] mx-auto mb-10">
          Four commitments we stand behind on every order, every time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className={`group relative overflow-hidden bg-[#F7F7F5] hover:bg-white rounded-xl p-6 border border-transparent hover:border-[#0B1E3D] hover:shadow-lg transition-all duration-500 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Top accent bar — grows on hover, feels like a signature line */}
                <div className="absolute top-0 left-0 h-[3px] bg-[#0B1E3D] w-[40%] group-hover:w-full transition-all duration-500" />

                <p className="text-[12px] text-gray-400 font-medium mb-3">{item.number}</p>

                <div className="w-11 h-11 rounded-full bg-[#0B1E3D] group-hover:bg-[#FF5A36] flex items-center justify-center transition-colors duration-300">
                  <Icon className="text-[#C6FF00] group-hover:text-white text-xl transition-colors duration-300" />
                </div>

                <h3 className="mt-4 font-semibold text-[16px] text-[#0B1E3D]">{item.title}</h3>
                <p className="text-gray-500 text-[13px] mt-1.5 leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}