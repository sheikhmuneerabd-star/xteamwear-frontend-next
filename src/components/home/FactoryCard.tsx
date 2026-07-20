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
      const res = await fetch("/api/settings");
      const data = await res.json();
      setFeatures(data.settings.advantages || []);
      setLoading(false);
    }
    fetchSettings();
  }, []);

  useGSAP(() => {
    if (features.length === 0) return;
    ScrollTrigger.batch(".advantage-card", {
      start: "top 85%",
      once: true,
      onEnter: (elements) => {
        gsap.from(elements, { y: 80, opacity: 0, duration: 0.8, stagger: 0.15 });
      },
    });
  }, [features]);

  if (loading || features.length === 0) return null;

  return (
    <div className="p-10">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((item, i) => (
          <div key={i} className="advantage-card group cursor-pointer text-center">
            <div className="overflow-hidden rounded-md relative aspect-[4/3]">
              <Image
                className="object-cover group-hover:scale-105 transition-all duration-700"
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <h2 className="mt-3 text-[18px] font-semibold text-[#0B1E3D] group-hover:text-[#FF5A36] transition-all duration-200">
              {item.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}