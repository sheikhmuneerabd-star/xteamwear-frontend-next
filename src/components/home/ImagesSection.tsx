"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

export default function GlobalSquad() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setImages(data.settings.squadImages || []);
      setLoading(false);
    }
    fetchSettings();
  }, []);

  const closeModal = () => setActiveIndex(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  if (loading || images.length === 0) return null;

  const half = Math.ceil(images.length / 2);
  const rowOne = images.slice(0, half);
  const rowTwo = images.slice(half);

  return (
    <div className="py-12 bg-white">
      <div className="text-center mb-8 px-4">
        <h2 className="text-[22px] md:text-[34px] font-semibold tracking-wide">
          JOIN THE GLOBAL SQUAD
        </h2>
        <p className="text-gray-600 text-[14px] md:text-lg mt-2">
          by 1,000,000+ teams globally. From grassroots to professional league.
        </p>
      </div>

      <div>
        <div className="flex w-full">
          {rowOne.map((src, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setActiveIndex(i)}
              className="relative flex-1 h-[140px] md:h-[220px] overflow-hidden group cursor-pointer"
            >
              <Image
                src={src}
                alt={`Squad photo ${i + 1}`}
                fill
                sizes="(max-width: 768px) 30vw, 15vw"
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
            </button>
          ))}
        </div>

        <div className="flex w-full">
          {rowTwo.map((src, i) => {
            const globalIndex = rowOne.length + i;
            return (
              <button
                type="button"
                key={globalIndex}
                onClick={() => setActiveIndex(globalIndex)}
                className="relative flex-1 h-[140px] md:h-[220px] overflow-hidden group cursor-pointer"
              >
                <Image
                  src={src}
                  alt={`Squad photo ${globalIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 30vw, 15vw"
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </button>
            );
          })}
        </div>
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[999] bg-black/85 flex items-center justify-center p-4 md:p-10"
          onClick={closeModal}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={closeModal}
            className="absolute top-5 right-5 md:top-8 md:right-8 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            <IoMdClose className="text-2xl" />
          </button>
          <div className="relative w-full max-w-4xl h-[70vh] md:h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={images[activeIndex]} alt={`Squad photo ${activeIndex + 1}`} fill sizes="90vw" className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}