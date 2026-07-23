"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Handshake, 
  Trophy, 
  Users, 
  Percent, 
  ShieldCheck, 
  UploadCloud, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Star 
} from "lucide-react";

const PARTNER_TIERS = [
  {
    title: "Clubs & Academies",
    badge: "Official Teamwear",
    discount: "Up to 30% OFF",
    desc: "Exclusive team discounts, dedicated account manager, free design mockups, and priority production queues.",
    features: ["Dedicated Designer", "Free Roster Management", "Re-Order Guarantee"],
  },
  {
    title: "Leagues & Associations",
    badge: "Bulk Partner",
    discount: "Factory Direct Pricing",
    desc: "End-to-end kit manufacturing for entire leagues with custom branding, referee kits, and event banners.",
    features: ["Custom League Portal", "Bulk Tiered Savings", "Express Global Shipping"],
  },
  {
    title: "Athletes & Influencers",
    badge: "Brand Ambassador",
    discount: "Commission + Free Gear",
    desc: "Earn commission on referral sales, receive free quarterly custom apparel, and get featured on our media.",
    features: ["Personalized Discount Code", "Free Product Drops", "Social Media Features"],
  },
];

export default function PartnersPage() {
  const [formData, setFormData] = useState({
    orgName: "",
    contactName: "",
    email: "",
    phone: "",
    partnerType: "Club / Team",
    teamSize: "20-50",
    website: "",
    notes: "",
  });

  const [uploadedLogo, setUploadedLogo] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Anti-Copy & Right-Click Protection
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && ["c", "u", "s", "p", "a"].includes(e.key.toLowerCase())) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans select-none relative pb-20">
      
      {/* Page Header */}
      <section className="bg-slate-950 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-4">
          <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full inline-flex items-center gap-2">
            <Handshake className="w-4 h-4 text-amber-400" />
            Official Partnership & Sponsorship Program
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Partner With <span className="text-amber-500">Our Brand</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-xs sm:text-sm font-medium">
            Join hundreds of sports clubs, leagues, and ambassadors worldwide. Get factory-direct team pricing, custom studio design, and official sponsorship benefits.
          </p>
        </div>
      </section>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-12">
        
        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PARTNER_TIERS.map((tier, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xl flex flex-col justify-between hover:border-amber-500/50 transition-all"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-black uppercase bg-amber-500/10 text-amber-600 border border-amber-500/20 px-3 py-1 rounded-full">
                    {tier.badge}
                  </span>
                  <Trophy className="w-5 h-5 text-amber-500" />
                </div>

                <h3 className="text-xl font-black uppercase text-slate-950">{tier.title}</h3>
                <p className="text-2xl font-black text-amber-600">{tier.discount}</p>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{tier.desc}</p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs font-extrabold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Application Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xl max-w-4xl mx-auto">
          
          <div className="mb-8 text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950">
              Apply For Partnership / Sponsorship
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Submit your team or league details below. Our sponsorship team will review and approve your account within 24 hours.
            </p>
          </div>

          {submitted && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Application submitted! Our partnership director will contact you via email shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                  Club / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Red Dragons Football Club"
                  value={formData.orgName}
                  onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coach Alex Johnson"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                  Official Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@team.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                  Partnership Category
                </label>
                <select
                  value={formData.partnerType}
                  onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Club / Team">Sports Club / Team</option>
                  <option value="League / Academy">League / Training Academy</option>
                  <option value="School / University">School / College Varsity</option>
                  <option value="Influencer">Athlete / Content Creator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                  Active Players / Members
                </label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Under 20">Under 20 Players</option>
                  <option value="20-50">20 - 50 Players</option>
                  <option value="50-200">50 - 200 Players</option>
                  <option value="200+">200+ League Members</option>
                </select>
              </div>
            </div>

            {/* Logo Upload Dropzone */}
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                Upload Team Crest / Logo (Optional)
              </label>
              <div className="border-2 border-dashed border-slate-200 hover:border-amber-500 rounded-2xl p-4 bg-slate-50 transition-colors text-center cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*,.pdf,.ai"
                  onChange={(e) => setUploadedLogo(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <UploadCloud className="w-7 h-7 text-amber-500 mx-auto mb-1" />
                <p className="text-xs font-bold text-slate-700">
                  {uploadedLogo ? uploadedLogo.name : "Click or drag team logo file here"}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, PDF or AI Vector Format</p>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                Tell Us About Your Team / Objectives
              </label>
              <textarea
                rows={3}
                placeholder="Mention upcoming leagues, tournaments, or jersey quantity requirements..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> SUBMIT PARTNERSHIP APPLICATION
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}