"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  PhoneCall, 
  Mail, 
  MapPin, 
  UploadCloud, 
  Send, 
  CheckCircle2, 
  Clock, 
  Award,
  MessageCircle,
  X,
  Check
} from "lucide-react";

// Color Options List
const COLOR_OPTIONS = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Navy", hex: "#0B192C" },
  { name: "Red", hex: "#E63946" },
  { name: "Crimson", hex: "#800020" },
  { name: "Royal Blue", hex: "#1D4ED8" },
  { name: "Sky Blue", hex: "#38BDF8" },
  { name: "Forest Green", hex: "#15803D" },
  { name: "Neon Green", hex: "#22C55E" },
  { name: "Gold", hex: "#EAB308" },
  { name: "Purple", hex: "#A855F7" },
  { name: "Pink", hex: "#EC4899" },
];

// Sports Preset Categories
const SPORT_CATEGORIES = [
  { id: "soccer", label: "Soccer / Football ⚽" },
  { id: "cricket", label: "Cricket 🏏" },
  { id: "basketball", label: "Basketball 🏀" },
  { id: "hoodies", label: "Hoodies / Tracksuits 🧥" },
  { id: "esports", label: "Esports & Gaming 🎮" },
  { id: "other", label: "Other Custom Apparel 🎽" },
];

// Quick Customization Options
const CUSTOMIZATION_FEATURES = [
  "Full Sublimation Printing",
  "Player Names & Numbers",
  "Embroidered Logo/Badge",
  "Custom Collar Styles",
  "Sponsor Logos Included",
];

export default function ContactUsPage() {
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "Soccer / Football ⚽",
    quantity: "10-25",
    color: "Navy",
    customFeatures: [] as string[],
    details: "",
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Anti-Copy & Anti-Right-Click Security Handlers
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

  // Handle File Upload & Preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setUploadedFile(file);
      if (file.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(null);
      }
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFilePreview(null);
  };

  // Toggle Customization Feature
  const toggleFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      customFeatures: prev.customFeatures.includes(feature)
        ? prev.customFeatures.filter((f) => f !== feature)
        : [...prev.customFeatures, feature],
    }));
  };

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  // Quick Direct WhatsApp Redirect
  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi XTeamwear! I want a custom quote:\n- Category: ${formData.category}\n- Qty: ${formData.quantity}\n- Color: ${formData.color}\n- Name: ${formData.fullName || "N/A"}`
    );
    window.open(`https://wa.me/923000000000?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans select-none relative">
      
      {/* Visual Header / Banner */}
      <section className="relative bg-slate-950 text-white py-16 sm:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-4">
          <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full inline-block">
            Pro Custom Apparel & Factory Manufacturing
          </span>
          <h1 className="text-3xl sm:text-6xl font-black uppercase tracking-tight">
            Design Your <span className="text-amber-500">Custom Kit</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-xs sm:text-base font-medium">
            Factory-direct custom teamwear. Submit your details below for a free 3D mockup & instant factory quote.
          </p>

          {/* 3-Step Process Indicator */}
          <div className="pt-6 grid grid-cols-3 max-w-xl mx-auto text-center gap-2">
            <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
              <span className="text-amber-400 font-black text-xs sm:text-sm block">1. Select Specs</span>
              <span className="text-[10px] text-slate-400">Choose colors & qty</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
              <span className="text-amber-400 font-black text-xs sm:text-sm block">2. Free Mockup</span>
              <span className="text-[10px] text-slate-400">Design approval</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
              <span className="text-amber-400 font-black text-xs sm:text-sm block">3. Fast Delivery</span>
              <span className="text-[10px] text-slate-400">2-week turnaround</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact & Perks */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-6">
              <h2 className="text-xl font-black uppercase text-slate-950 tracking-tight">
                Direct Contact Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Call / WhatsApp</p>
                    <p className="text-sm font-black text-slate-900">+1 (800) 555-0199</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Email Inquiries</p>
                    <p className="text-sm font-black text-slate-900">support@kitbrand.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">US Logistics Hub</p>
                    <p className="text-sm font-black text-slate-900">San Diego, CA & Border Factory</p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Quick Order CTA */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" /> Order Fast Via WhatsApp
                </button>
              </div>
            </div>

            {/* Why Choose Us Highlight Box */}
            <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-800 shadow-xl">
              <h3 className="text-lg font-black uppercase text-amber-400 flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Smart Factory Advantage
              </h3>
              
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Sublimation Fading:</strong> Italian inks guarantee crisp colors forever.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Fast Turnaround:</strong> 2-week rush production & express shipping.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Full Customization:</strong> Names, numbers & logos included.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Interactive Easy Order Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xl relative">
              
              {submitted && (
                <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Your custom quote inquiry has been submitted! Our team will reach out within 2 hours.</span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tight">
                  Request Custom Quote
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Fill in your team specifications below for instant factory pricing.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Category Chip Selection */}
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">
                    1. Select Sport / Category *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SPORT_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat.label })}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          formData.category === cat.label
                            ? "bg-amber-500 border-amber-500 text-slate-950 shadow-md"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Contact Details (Name, Email, Phone) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@team.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* 3. Quantity & Color Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                      Estimated Quantity
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="1-9">Sample / Individual (1-9 Kits)</option>
                      <option value="10-25">Small Squad (10-25 Kits)</option>
                      <option value="26-100">Full League (26-100 Kits)</option>
                      <option value="100+">Bulk Order (100+ Kits)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">
                      Primary Team Color: <span className="text-amber-600 font-black">{formData.color}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {COLOR_OPTIONS.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setFormData({ ...formData, color: c.name })}
                          title={c.name}
                          className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                            formData.color === c.name
                              ? "border-amber-500 scale-110 ring-2 ring-amber-500/20"
                              : "border-slate-300 hover:scale-105"
                          }`}
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Quick Checkbox Specifications */}
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">
                    Included Customizations (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CUSTOMIZATION_FEATURES.map((feature) => {
                      const isChecked = formData.customFeatures.includes(feature);
                      return (
                        <div
                          key={feature}
                          onClick={() => toggleFeature(feature)}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                            isChecked
                              ? "bg-amber-50/80 border-amber-400 text-slate-900"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked ? "bg-amber-500 border-amber-500 text-slate-950" : "border-slate-300 bg-white"
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>{feature}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Artwork Upload Dropzone with Live Preview */}
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                    Upload Logo / Rough Sketch (Optional)
                  </label>

                  {!uploadedFile ? (
                    <div className="border-2 border-dashed border-slate-200 hover:border-amber-500 rounded-2xl p-5 bg-slate-50 transition-colors text-center cursor-pointer relative">
                      <input
                        type="file"
                        accept="image/*,.pdf,.ai,.eps"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <UploadCloud className="w-8 h-8 text-amber-500 mx-auto mb-1" />
                      <p className="text-xs font-bold text-slate-700">
                        Click or drag logo files / rough sketch here
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Supports PNG, JPG, PDF, Vector (AI/EPS)</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-amber-50/50 border border-amber-200 rounded-2xl">
                      <div className="flex items-center gap-3">
                        {filePreview ? (
                          <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-slate-200 bg-white shrink-0">
                            <Image src={filePreview} alt="Preview" fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-amber-500/20 text-amber-700 rounded-lg flex items-center justify-center font-black text-xs">
                            DOC
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-black text-slate-900 truncate max-w-[200px]">
                            {uploadedFile.name}
                          </p>
                          <p className="text-[10px] text-slate-500 font-bold">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-1.5 bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full border border-slate-200 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* 6. Additional Details */}
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                    Special Instructions / Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Any specific collar style, fabric preference, or delivery timeline needed..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> SUBMIT CUSTOM ORDER REQUEST
                </button>

              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Badges Footer Bar */}
      <section className="bg-slate-900 border-t border-slate-800 py-8 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <Truck className="w-6 h-6 text-amber-400" />
            <div className="text-left">
              <p className="text-xs font-black uppercase">Global Courier Express</p>
              <p className="text-[11px] text-slate-400">Doorstep delivery worldwide</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Award className="w-6 h-6 text-amber-400" />
            <div className="text-left">
              <p className="text-xs font-black uppercase">Quality Assured</p>
              <p className="text-[11px] text-slate-400">Strict factory inspection steps</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Clock className="w-6 h-6 text-amber-400" />
            <div className="text-left">
              <p className="text-xs font-black uppercase">24/7 Team Support</p>
              <p className="text-[11px] text-slate-400">Instant dedicated assistance</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}