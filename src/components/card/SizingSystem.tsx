"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { 
  IoLogoWhatsapp, 
  IoCloudUploadOutline, 
  IoShirtOutline, 
  IoCheckmarkCircle,
  IoInformationCircleOutline,
  IoAlertCircle
} from "react-icons/io5";
import { TbTruckDelivery, TbShirtFilled } from "react-icons/tb";
import { HiPlus, HiTrash, HiOutlineSparkles, HiXMark } from "react-icons/hi2";

import sponserPosition from "@/assets/sponserPosition/sponserPosition.webp";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";

interface PlayerRow {
  size: string;
  name: string;
  number: string;
}

interface SizingFormData {
  teamName: string;
  playerNumberOption: string;
  logo: string;
  sponsorOption: string;
  sponsorLocation: string;
  note: string;
  players: PlayerRow[];
}

interface SizingSystemProps {
  product: Product;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const emptyForm: SizingFormData = {
  teamName: "",
  playerNumberOption: "",
  logo: "",
  sponsorOption: "",
  sponsorLocation: "",
  note: "",
  players: [{ size: "M", name: "", number: "" }],
};

export default function SizingSystem({ product, selectedColor, setSelectedColor }: SizingSystemProps) {
  const { addToCart } = useCart();

  // Custom Toast State (Alert Replacement)
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);

  const showToast = (message: string, type: "error" | "success" = "error") => {
    setToast({ message, type });
  };

  // Auto hide toast after 4 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Mode Selection
  const [decorationMode, setDecorationMode] = useState<"standard" | "bespoke">("standard");

  // Step 2 Customization Options Toggles
  const [teamNameOpen, setTeamNameOpen] = useState(false);
  const [playerNumberOpen, setPlayerNumberOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);
  const [sponsorOpen, setSponsorOpen] = useState(false);

  // Logo Upload State
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState<SizingFormData>(emptyForm);

  // Handle Player Row Updates
  const handlePlayerChange = (index: number, field: keyof PlayerRow, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.players];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, players: updated };
    });
  };

  const addPlayerRow = () => {
    setFormData((prev) => ({
      ...prev,
      players: [...prev.players, { size: "M", name: "", number: "" }],
    }));
  };

  const removePlayerRow = (index: number) => {
    if (formData.players.length === 1) return;
    setFormData((prev) => ({
      ...prev,
      players: prev.players.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (uploadingLogo) {
      showToast("Logo is still uploading. Please wait...", "error");
      return;
    }
    if (teamNameOpen && !formData.teamName.trim()) {
      showToast("Please enter your Team Name.", "error");
      return;
    }
    if (playerNumberOpen && !formData.playerNumberOption) {
      showToast("Please select a Player Number Position option.", "error");
      return;
    }

    // Validate player entries
    for (let i = 0; i < formData.players.length; i++) {
      const p = formData.players[i];
      if (!p.size) {
        showToast(`Please select size for Player #${i + 1}`, "error");
        return;
      }
    }

    addToCart(product, selectedColor, formData);
    showToast("Product added to your roster cart successfully!", "success");
    setFormData(emptyForm);
    setPreview(null);
  };

  return (
    <div className="xl:w-[48%] md:w-[52%] w-full bg-white font-sans text-slate-900 leading-relaxed relative">
      
      {/* Dynamic Custom Notification Toast UI */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 p-4 rounded-xl shadow-2xl border text-xs font-bold transition-all transform animate-bounce ${
            toast.type === "success"
              ? "bg-emerald-900 text-emerald-100 border-emerald-700"
              : "bg-red-900 text-red-100 border-red-700"
          }`}
        >
          {toast.type === "success" ? (
            <IoCheckmarkCircle className="text-xl text-emerald-400 shrink-0" />
          ) : (
            <IoAlertCircle className="text-xl text-red-400 shrink-0" />
          )}
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="ml-auto p-1 text-slate-300 hover:text-white"
          >
            <HiXMark className="text-base" />
          </button>
        </div>
      )}

      <div className="space-y-6">
        
        {/* Title & Tag */}
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            {product.category || "Pro Athletic Custom Apparel"}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase mt-2 tracking-tight">
            {product.name}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2">
            Engineered with high-tech CONVEX-FIT moisture-wicking fabric for peak athletic performance and breathability.
          </p>
        </div>

        {/* Pricing Panel */}
        <div className="flex items-baseline gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
          <span className="text-2xl font-black text-amber-600">
            {formatPrice(product.newPrice)}
          </span>
          {product.oldPrice > product.newPrice && (
            <span className="text-sm font-bold text-slate-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          <span className="ml-auto text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            In Stock & Ready To Customise
          </span>
        </div>

        {/* Color Swatches */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-slate-700">
            <span>Color: <span className="text-amber-600 font-bold">{selectedColor}</span></span>
            <button type="button" className="text-slate-500 cursor-pointer underline hover:text-amber-600 transition-colors">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {product.variants.map((variant, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedColor(variant.color)}
                className={`relative w-14 h-14 rounded-xl cursor-pointer border-2 overflow-hidden transition-all duration-200 ${
                  selectedColor === variant.color
                    ? "border-amber-500 ring-2 ring-amber-500/20 scale-105"
                    : "border-slate-200 hover:border-slate-400"
                }`}
              >
                <Image src={variant.icon} alt={variant.color} fill sizes="56px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Step 1: Decoration Mode */}
        <div className="space-y-3">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800">
            Step 1: Decoration Option
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDecorationMode("standard")}
              className={`py-3 px-4 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-wider border transition-all duration-200 ${
                decorationMode === "standard"
                  ? "bg-slate-950 text-white border-slate-950 shadow-md"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              Standard Custom
            </button>
            <button
              type="button"
              onClick={() => setDecorationMode("bespoke")}
              className={`py-3 px-4 rounded-xl cursor-pointer font-bold text-xs uppercase tracking-wider border flex items-center justify-center gap-1.5 transition-all duration-200 ${
                decorationMode === "bespoke"
                  ? "bg-slate-950 text-white border-slate-950 shadow-md"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <HiOutlineSparkles className="text-amber-400 text-sm" /> Bespoke Design
            </button>
          </div>
        </div>

        {/* Standard Mode Content */}
        {decorationMode === "standard" ? (
          <div className="space-y-6">
            
            {/* Sponsor Position Guide Image */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 overflow-hidden">
              <Image src={sponserPosition} alt="Sponsor Position Guide" className="w-full h-auto rounded-xl" />
            </div>

            {/* Step 2: Custom Elements Checkboxes */}
            <div className="space-y-3">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800">
                Step 2: Team Customization Elements
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "team", label: "Team Name", state: teamNameOpen, setState: setTeamNameOpen },
                  { id: "number", label: "Player No.", state: playerNumberOpen, setState: setPlayerNumberOpen },
                  { id: "logo", label: "Team Logo", state: logoOpen, setState: setLogoOpen },
                  { id: "sponsor", label: "Sponsor", state: sponsorOpen, setState: setSponsorOpen },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                      item.state ? "bg-amber-500/10 border-amber-500 text-slate-950 font-bold" : "bg-white border-slate-200 text-slate-600"
                    }`}
                  >
                    <span className="text-xs">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={item.state}
                      onChange={() => item.setState(!item.state)}
                      className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                    />
                  </label>
                ))}
              </div>

              {/* Collapsible Form Inputs */}
              {teamNameOpen && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <label className="text-[11px] font-bold uppercase text-slate-600">Team Name</label>
                  <input
                    type="text"
                    placeholder="Enter Team/Club Name..."
                    value={formData.teamName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, teamName: e.target.value }))}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              {playerNumberOpen && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <label className="text-[11px] font-bold uppercase text-slate-600">Player Number Position</label>
                  <select
                    value={formData.playerNumberOption}
                    onChange={(e) => setFormData((prev) => ({ ...prev, playerNumberOption: e.target.value }))}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:border-amber-500"
                  >
                    <option value="">Select Option</option>
                    <option value="Both Sides">Both Front & Back Numbers</option>
                    <option value="Only Back Number">Back Number Only</option>
                    <option value="Only Front Number">Front Number Only</option>
                  </select>
                </div>
              )}

              {logoOpen && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="text-[11px] font-bold uppercase text-slate-600">Upload Vector / High-Res Crest</label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="h-20 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center bg-white cursor-pointer hover:border-amber-500 transition-colors relative overflow-hidden"
                  >
                    {uploadingLogo ? (
                      <span className="text-xs font-bold text-slate-400">Uploading Crest...</span>
                    ) : preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={preview} alt="Logo preview" className="h-full w-full object-contain p-2" />
                    ) : (
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase">
                        <IoCloudUploadOutline className="text-xl text-amber-500" />
                        <span>Click to Upload Logo</span>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileRef}
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setPreview(URL.createObjectURL(file));
                        setUploadingLogo(true);
                        try {
                          const body = new FormData();
                          body.append("file", file);
                          const res = await fetch("/api/upload", { method: "POST", body });
                          const data = await res.json();
                          if (res.ok) {
                            setFormData((prev) => ({ ...prev, logo: data.url }));
                            showToast("Logo uploaded successfully!", "success");
                          } else {
                            showToast("Upload failed.", "error");
                          }
                        } catch {
                          showToast("Upload failed.", "error");
                        } finally {
                          setUploadingLogo(false);
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              {sponsorOpen && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-slate-600">Sponsor Format</label>
                    <select
                      value={formData.sponsorOption}
                      onChange={(e) => setFormData((prev) => ({ ...prev, sponsorOption: e.target.value }))}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold focus:outline-none"
                    >
                      <option value="">Choose Format</option>
                      <option value="Sponsor Text">Text / Typography</option>
                      <option value="Sponsor Image">Graphic Logo Image</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase text-slate-600">Sponsor Position</label>
                    <select
                      value={formData.sponsorLocation}
                      onChange={(e) => setFormData((prev) => ({ ...prev, sponsorLocation: e.target.value }))}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold focus:outline-none"
                    >
                      <option value="">Choose Placement</option>
                      <option value="Front Chest">1. Front Chest (Center)</option>
                      <option value="Front Belly">2. Front Belly (Low Position)</option>
                      <option value="Back Waist">3. Lower Back Waist</option>
                      <option value="Replacing Player Name">4. Replacing Player Name</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Player Roster Ordering Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800">
                  Step 3: Player Roster Sizing ({formData.players.length} Items)
                </label>
                <button
                  type="button"
                  onClick={addPlayerRow}
                  className="inline-flex cursor-pointer items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
                >
                  <HiPlus /> Add Player
                </button>
              </div>

              {/* Roster Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 bg-slate-50">
                {formData.players.map((p, idx) => (
                  <div key={idx} className="p-3 flex items-center gap-2 bg-white">
                    <span className="text-[11px] font-black text-slate-400 w-6">#{idx + 1}</span>
                    
                    <select
                      value={p.size}
                      onChange={(e) => handlePlayerChange(idx, "size", e.target.value)}
                      className="bg-slate-50 cursor-pointer border border-slate-200 text-xs font-bold rounded-lg p-2 focus:outline-none w-20"
                    >
                      {["S", "M", "L", "XL", "2XL", "3XL"].map((sz) => (
                        <option key={sz} value={sz}>{sz}</option>
                      ))}
                    </select>

                    <input
                      type="text"
                      placeholder="Player Name"
                      value={p.name}
                      onChange={(e) => handlePlayerChange(idx, "name", e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-xs font-semibold rounded-lg p-2 flex-1 focus:outline-none"
                    />

                    <input
                      type="text"
                      placeholder="No."
                      value={p.number}
                      onChange={(e) => handlePlayerChange(idx, "number", e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg p-2 w-16 text-center focus:outline-none"
                    />

                    {formData.players.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePlayerRow(idx)}
                        className="text-slate-400 cursor-pointer hover:text-red-500 p-1"
                      >
                        <HiTrash className="text-base" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Special Instructions Note */}
            <div className="space-y-1">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800">
                Special Instructions / Custom Notes
              </label>
              <textarea
                placeholder="Font preference, collar styling requests, extra details..."
                value={formData.note}
                onChange={(e) => setFormData((prev) => ({ ...prev, note: e.target.value }))}
                className="w-full max-h-[150px] bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-amber-500 h-20"
              />
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              ADD TO ROSTER CART &bull; {formData.players.length} SQUAD ITEM(S)
            </button>

          </div>
        ) : (
          /* Bespoke Mode Request Box */
          <div className="p-5 bg-slate-950 text-white rounded-2xl space-y-4">
            <h3 className="text-base font-black uppercase text-amber-400 flex items-center gap-2">
              <HiOutlineSparkles /> Full Custom Bespoke Studio
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Work directly with our lead sportswear designers to create entirely custom geometric patterns, unique pantones, and original collar shapes.
            </p>
            <button
              type="button"
              onClick={() => showToast("Request sent! Our team will contact you shortly.", "success")}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
            >
              REQUEST FREE BESPOKE MOCKUP
            </button>
          </div>
        )}

        <hr className="border-slate-100" />

        {/* Contact Support */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span>Need design assistance?</span>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-bold text-emerald-600 hover:underline"
          >
            <IoLogoWhatsapp className="text-base text-emerald-500" /> WhatsApp Direct
          </a>
        </div>

        {/* Brand Guarantees Grid */}
        <div className="grid grid-cols-1 gap-3 pt-2">
          <div className="flex items-center gap-3 text-xs text-slate-700">
            <TbTruckDelivery className="text-2xl text-amber-600 shrink-0" />
            <div>
              <p className="font-bold text-slate-900 uppercase">Express Dispatch Available</p>
              <p className="text-[11px] text-slate-500">Fast 2-day turnaround + tracked courier shipping</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-700">
            <IoShirtOutline className="text-2xl text-amber-600 shrink-0" />
            <div>
              <p className="font-bold text-slate-900 uppercase">Low Minimum MOQ (1 Piece)</p>
              <p className="text-[11px] text-slate-500">Order individual replacements or full team kits</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-700">
            <TbShirtFilled className="text-2xl text-amber-600 shrink-0" />
            <div>
              <p className="font-bold text-slate-900 uppercase">Sublimation Guarantee</p>
              <p className="text-[11px] text-slate-500">Zero peeling, cracking, or color fading ever</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}