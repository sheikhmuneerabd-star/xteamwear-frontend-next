"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { HiChevronLeft, HiChevronRight, HiMagnifyingGlassPlus } from "react-icons/hi2";

export default function GlobalSquad() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        setImages(data?.settings?.squadImages || []);
      } catch (err) {
        console.error("Failed to load squad gallery", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const closeModal = () => setActiveIndex(null);

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (activeIndex !== null) {
        setActiveIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
      }
    },
    [activeIndex, images.length]
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (activeIndex !== null) {
        setActiveIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
      }
    },
    [activeIndex, images.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, handleNext, handlePrev]);

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="h-6 bg-slate-200 rounded-md w-48 mx-auto mb-2 animate-pulse" />
          <div className="h-3 bg-slate-200 rounded-md w-72 mx-auto mb-8 animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-36 bg-slate-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (images.length === 0) return null;

  return (
    <section className="py-12 bg-white text-slate-900 font-sans overflow-hidden border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto text-center mb-8 px-6">
        <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          Community & Heritage
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mt-3 text-slate-900">
          JOIN THE GLOBAL SQUAD
        </h2>
        <p className="text-slate-600 text-xs md:text-sm max-w-xl mx-auto mt-2">
          Trusted by over 1,000,000+ athletes & teams globally.
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((src, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className="relative group h-36 sm:h-44 lg:h-48 rounded-xl overflow-hidden bg-slate-100 cursor-pointer border border-slate-200 shadow-sm hover:border-amber-500 transition-colors"
            >
              <Image
                src={src}
                alt={`Squad athlete ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
              />

              <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 text-amber-600 flex items-center justify-center shadow-md">
                  <HiMagnifyingGlassPlus className="text-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            type="button"
            aria-label="Close modal"
            onClick={closeModal}
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center"
          >
            <IoMdClose className="text-xl" />
          </button>

          <div className="absolute top-6 left-6 z-20 text-xs font-semibold tracking-widest text-slate-200 bg-black/40 px-3 py-1 rounded-full">
            {activeIndex + 1} / {images.length}
          </div>

          <button
            type="button"
            aria-label="Previous image"
            onClick={handlePrev}
            className="absolute left-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center"
          >
            <HiChevronLeft className="text-xl" />
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={handleNext}
            className="absolute right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center"
          >
            <HiChevronRight className="text-xl" />
          </button>

          <div
            className="relative w-full max-w-4xl h-[65vh] md:h-[75vh] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={`Squad athlete ${activeIndex + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}