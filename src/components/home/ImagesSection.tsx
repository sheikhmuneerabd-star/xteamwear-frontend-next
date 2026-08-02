"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { 
  HiChevronLeft, 
  HiChevronRight, 
  HiMagnifyingGlassPlus, 
  HiHandThumbUp, 
  HiHandThumbDown,
  HiShoppingBag,
  HiSparkles
} from "react-icons/hi2";

export default function GlobalSquad() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [likedStatus, setLikedStatus] = useState<{ [key: number]: 'up' | 'down' | null }>({});

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

  const handleLike = (index: number, type: 'up' | 'down') => {
    const isCurrentlyLiked = likedStatus[index] === type;

    setLikedStatus((prev) => ({
      ...prev,
      [index]: isCurrentlyLiked ? null : type,
    }));

    setLikes((prev) => {
      const current = prev[index] ?? 12;
      return {
        ...prev,
        [index]: isCurrentlyLiked ? current - 1 : current + 1,
      };
    });
  };

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-[2560px] mx-auto px-6">
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
      
      {/* Section Header */}
      <div className="max-w-[2560px] mx-auto text-center mb-8 px-6">
        <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-flex items-center gap-1.5">
          <HiSparkles className="text-amber-600" /> Community & Heritage
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mt-3 text-slate-900 uppercase">
          JOIN THE GLOBAL SQUAD
        </h2>
        <p className="text-slate-600 text-xs md:text-sm max-w-xl mx-auto mt-2 font-medium">
          Trusted by over 1,000,000+ athletes & teams globally.
        </p>
      </div>

      {/* Grid Display (Grayscale Removed) */}
      <div className="max-w-[2560px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((src, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className="relative group h-40 sm:h-48 lg:h-52 rounded-2xl overflow-hidden bg-slate-100 cursor-pointer border border-slate-200/80 shadow-sm hover:border-amber-500 hover:shadow-lg transition-all duration-300"
            >
              <Image
                src={src}
                alt={`Squad athlete ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-all duration-500 ease-out"
              />

              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white text-amber-600 flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <HiMagnifyingGlassPlus className="text-2xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ENHANCED PRO MODAL POPUP */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            type="button"
            aria-label="Close modal"
            onClick={closeModal}
            className="absolute cursor-pointer top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center transition-all shadow-md"
          >
            <IoMdClose className="text-2xl" />
          </button>

          {/* Navigation Buttons */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={handlePrev}
            className="absolute left-3 cursor-pointer sm:left-6 z-30 w-11 h-11 rounded-full bg-white/30 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center transition-all shadow-lg backdrop-blur-md"
          >
            <HiChevronLeft className="text-2xl" />
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={handleNext}
            className="absolute right-3 cursor-pointer sm:right-6 z-30 w-11 h-11 rounded-full bg-white/30 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center transition-all shadow-lg backdrop-blur-md"
          >
            <HiChevronRight className="text-2xl" />
          </button>

          {/* Modal Container */}
          <div
            className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 h-[85vh] max-h-[650px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side: Large Featured Image */}
            <div className="md:col-span-7 bg-slate-950 relative h-full flex items-center justify-center overflow-hidden">
              <Image
                src={images[activeIndex]}
                alt={`Squad athlete ${activeIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
                priority
              />
              
              {/* Image Counter Badge */}
              <div className="absolute top-4 left-4 z-10 text-[11px] font-black tracking-widest text-white bg-slate-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                {activeIndex + 1} / {images.length}
              </div>
            </div>

            {/* Right Side: Product Details & Response Callout */}
            <div className="md:col-span-5 flex flex-col h-full bg-white text-slate-900 border-l border-slate-100">
              
              {/* Top Scrollable Content */}
              <div className="p-6 flex-1 overflow-y-auto space-y-6">
                
                {/* Category Header */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-500/20 shrink-0">
                      <HiShoppingBag className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-lg uppercase tracking-tight">
                        Basketball
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Custom Apparel & Uniforms</p>
                    </div>
                  </div>

                  <Link
                    href="/category/basketball"
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase px-4 py-2 rounded-lg shadow-sm transition-all"
                  >
                    Shop Now
                  </Link>
                </div>

                {/* Athlete Quote Card */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs shadow-sm">
                        B
                      </div>
                      <span className="text-xs font-bold text-slate-900">mknmvz</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">06/28/18</span>
                  </div>

                  <p className="text-slate-600 text-xs font-medium leading-relaxed italic">
                    "Look good... feel good... play good" – Deon
                  </p>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    We are here to provide an experience for the culture and sport—a lifestyle built through athletic collaboration.
                  </p>
                </div>

              </div>

              {/* Sticky Footer */}
              <div className="p-6 pt-4 border-t border-slate-100 bg-white shrink-0 space-y-4">
                
                {/* Engagement Bar */}
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleLike(activeIndex, 'up')}
                      className={`flex items-center gap-1.5 transition-all hover:text-slate-900 ${
                        likedStatus[activeIndex] === 'up' ? 'text-amber-600 font-bold' : ''
                      }`}
                    >
                      <HiHandThumbUp className="text-lg" />
                      <span>{likes[activeIndex] || 12}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleLike(activeIndex, 'down')}
                      className={`flex items-center gap-1.5 transition-all hover:text-slate-900 ${
                        likedStatus[activeIndex] === 'down' ? 'text-red-500 font-bold' : ''
                      }`}
                    >
                      <HiHandThumbDown className="text-lg" />
                    </button>
                  </div>

                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    Updated Live
                  </span>
                </div>

                {/* Fixed Action Button */}
                <Link
                  href="/contact"
                  className="w-full bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center text-center"
                >
                  Request Custom Design Quote
                </Link>

              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}