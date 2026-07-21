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

  // Premium Skeleton Loader
  if (loading) {
    return (
      <section className="py-16 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="h-8 bg-slate-200 rounded-md w-64 mx-auto mb-3 animate-pulse" />
          <div className="h-4 bg-slate-200 rounded-md w-96 mx-auto mb-10 animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-48 md:h-60 bg-slate-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (images.length === 0) return null;

  return (
    <section className="py-20 bg-slate-950 text-white font-sans overflow-hidden">
      {/* Header Section */}
      <div className="max-w-[1440px] mx-auto text-center mb-12 px-6">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
          Community & Heritage
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4">
          JOIN THE GLOBAL SQUAD
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mt-3">
          Trusted by over 1,000,000+ athletes & teams globally. From local grassroots clubs to elite championship leagues.
        </p>
      </div>

      {/* Grid Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((src, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className="relative group h-44 sm:h-56 lg:h-64 rounded-2xl overflow-hidden bg-slate-900 cursor-pointer border border-slate-800/80 shadow-md hover:border-amber-500/40 transition-all duration-300"
            >
              {/* Image */}
              <Image
                src={src}
                alt={`Squad athlete ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-400 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                  <HiMagnifyingGlassPlus className="text-2xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal with Gallery Controls */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[999] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            type="button"
            aria-label="Close modal"
            onClick={closeModal}
            className="absolute top-5 right-5 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            <IoMdClose className="text-2xl" />
          </button>

          {/* Counter Badge */}
          <div className="absolute top-6 left-6 z-20 text-xs font-semibold tracking-widest text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            {activeIndex + 1} / {images.length}
          </div>

          {/* Previous Arrow */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={handlePrev}
            className="absolute left-4 md:left-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-amber-500 hover:text-slate-950 border border-white/10 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            <HiChevronLeft className="text-2xl" />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            aria-label="Next image"
            onClick={handleNext}
            className="absolute right-4 md:right-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-amber-500 hover:text-slate-950 border border-white/10 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            <HiChevronRight className="text-2xl" />
          </button>

          {/* Active Image Display */}
          <div
            className="relative w-full max-w-5xl h-[70vh] md:h-[82vh] rounded-2xl overflow-hidden"
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