"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Star, 
  CheckCircle, 
  Filter, 
  ThumbsUp, 
  ShieldCheck, 
  Search, 
  Image as ImageIcon,
  MessageSquare,
  Sparkles
} from "lucide-react";

// Review Interface
interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName: string;
  images?: string[];
  helpfulCount: number;
}

// Sample High Quality Reviews Data
const REVIEWS_DATA: Review[] = [
  {
    id: "rev-1",
    author: "Coach Marcus Vance",
    location: "Texas, USA",
    rating: 5,
    date: "July 12, 2026",
    title: "Unbelievable Sublimation Quality for our Squad!",
    comment: "Ordered 24 full kits for our regional tournament. The fabric is lightweight, breathability is outstanding, and the customization was 100% accurate to our vector designs.",
    verified: true,
    productName: "Pro Custom Sublimated Match Kit",
    helpfulCount: 34,
    images: ["/assets/reviews/rev1.jpg", "/assets/reviews/rev2.jpg"]
  },
  {
    id: "rev-2",
    author: "Diego R.",
    location: "California, USA",
    rating: 5,
    date: "June 28, 2026",
    title: "Fastest turn-around time I've experienced",
    comment: "We had a last-minute sponsor update and needed 15 jerseys in less than two weeks. The team managed to ship them out ahead of schedule. Highly recommended!",
    verified: true,
    productName: "Bespoke Athletic Jersey",
    helpfulCount: 19
  },
  {
    id: "rev-3",
    author: "Sarah L.",
    location: "Ontario, Canada",
    rating: 5,
    date: "June 15, 2026",
    title: "Durable & Zero Fading after multiple washes",
    comment: "Our club has used these jerseys through an entire grueling season. Multiple machine washes later, colors are as vibrant as day one. Great quality stitching too.",
    verified: true,
    productName: "Custom Soccer Teamwear",
    helpfulCount: 27,
    images: ["/assets/reviews/rev3.jpg"]
  },
  {
    id: "rev-4",
    author: "Liam K.",
    location: "London, UK",
    rating: 4,
    date: "May 20, 2026",
    title: "Great quality, sizing runs slightly slim",
    comment: "The athletic fit is great for competitive play, but if you prefer a relaxed fit I recommend sizing up. Customer support was super helpful with quick exchanges.",
    verified: true,
    productName: "Custom Athletic Training Kit",
    helpfulCount: 12
  }
];

export default function ReviewsPage() {
  const [selectedFilter, setSelectedFilter] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyPhotos, setOnlyPhotos] = useState(false);
  const [helpfulLikes, setHelpfulLikes] = useState<Record<string, number>>({});

  // Comprehensive Anti-Copy & Content Protection Handlers
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        ["c", "u", "s", "p", "a"].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Filter Logic
  const filteredReviews = REVIEWS_DATA.filter((rev) => {
    const matchesRating = selectedFilter === "all" || rev.rating === selectedFilter;
    const matchesPhoto = !onlyPhotos || (rev.images && rev.images.length > 0);
    const matchesSearch =
      rev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.productName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRating && matchesPhoto && matchesSearch;
  });

  const handleHelpful = (id: string, currentCount: number) => {
    setHelpfulLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || currentCount) + 1
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans select-none relative pb-20">
      
      {/* Top Banner Header */}
      <section className="bg-slate-950 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-3">
          <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            100% Verified Customer Feedback
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Customer <span className="text-amber-500">Reviews & Social Proof</span>
          </h1>
          <p className="max-w-xl mx-auto text-slate-400 text-xs sm:text-sm font-medium">
            Real feedback from team managers, coaches, and athletes worldwide who trust our custom sublimation apparel.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-8">
        
        {/* Rating Breakdown & Stats Dashboard */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Overall Rating Score */}
          <div className="md:col-span-4 text-center md:border-r border-slate-100 md:pr-8 space-y-2">
            <div className="text-5xl font-black text-slate-950 tracking-tight">4.9 / 5.0</div>
            <div className="flex justify-center items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Based on 1,480+ Verified Team Orders
            </p>
          </div>

          {/* Rating Progress Bars */}
          <div className="md:col-span-8 space-y-2.5">
            {[
              { stars: 5, pct: "92%", count: 1362 },
              { stars: 4, pct: "6%", count: 88 },
              { stars: 3, pct: "1%", count: 18 },
              { stars: 2, pct: "0%", count: 7 },
              { stars: 1, pct: "1%", count: 9 },
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-3 text-xs font-bold text-slate-600">
                <span className="w-12 flex items-center gap-1 shrink-0">
                  {row.stars} <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: row.pct }}
                  />
                </div>
                <span className="w-10 text-right text-slate-400">{row.count}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Filter Controls & Search Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md flex flex-wrap items-center justify-between gap-4">
          
          {/* Star Filter Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold uppercase transition-all cursor-pointer ${
                selectedFilter === "all"
                  ? "bg-slate-950 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Reviews
            </button>
            {[5, 4, 3, 2, 1].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 transition-all cursor-pointer ${
                  selectedFilter === s
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>{s}</span>
                <Star className="w-3 h-3 fill-current" />
              </button>
            ))}
          </div>

          {/* Search & Media Toggles */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyPhotos}
                onChange={(e) => setOnlyPhotos(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
              <span className="flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-amber-600" /> With Photos Only
              </span>
            </label>

            <div className="relative flex-1 md:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

        </div>

        {/* Reviews Feed Grid */}
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-3">
              <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-extrabold text-slate-700">No matching reviews found.</p>
              <p className="text-xs text-slate-400">Try adjusting your rating filter or search terms.</p>
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md transition-all hover:border-slate-300 space-y-4"
              >
                {/* Review Top Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-900 uppercase">{rev.author}</span>
                      {rev.verified && (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-500" /> Verified Buyer
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-semibold text-slate-400">{rev.location} &bull; {rev.date}</p>
                  </div>

                  {/* Stars Rating */}
                  <div className="flex items-center gap-0.5 text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Product Tag */}
                <div className="inline-block bg-slate-100 text-slate-700 text-[11px] font-bold px-3 py-1 rounded-lg">
                  Item: <span className="text-slate-900">{rev.productName}</span>
                </div>

                {/* Title & Comment */}
                <div className="space-y-1.5">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                    {rev.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {rev.comment}
                  </p>
                </div>

                {/* Optional Customer Photo Attachments */}
                {rev.images && rev.images.length > 0 && (
                  <div className="flex items-center gap-3 pt-1">
                    {rev.images.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm"
                      >
                        <Image
                          src={imgSrc}
                          alt="Customer uploaded review picture"
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Helpful Counter Button */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-bold text-slate-400">Was this feedback helpful?</span>
                  <button
                    onClick={() => handleHelpful(rev.id, rev.helpfulCount)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-extrabold text-[11px] transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-amber-500" />
                    <span>Helpful ({helpfulLikes[rev.id] || rev.helpfulCount})</span>
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}