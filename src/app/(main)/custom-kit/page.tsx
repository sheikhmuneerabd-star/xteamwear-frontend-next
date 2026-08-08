"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaWhatsapp, FaTimes, FaUser, FaPhoneAlt, FaLock } from "react-icons/fa";
import {
  Upload,
  Plus,
  Trash2,
  ShieldCheck,
  Sparkles,
  Palette,
  ShoppingCart,
  X,
  Eye,
  FileSpreadsheet,
  CheckCircle2,
  Image as ImageIcon,
  Shirt,
} from "lucide-react";

interface PlayerRoster {
  id: string;
  name: string;
  number: string;
  size: string;
  gender: string;
}

const SIZES = ["YS", "YM", "YL", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];

const FABRICS = [
  { id: "poly-mesh", name: "Pro Dry-Fit Mesh", desc: "Lightweight & Breathable (160 GSM)", extraCost: 0 },
  { id: "interlock", name: "Heavyweight Interlock", desc: "Durable for high impact (220 GSM)", extraCost: 3 },
  { id: "spandex-blend", name: "4-Way Stretch Flex", desc: "Maximum agility & tight fit", extraCost: 5 },
];

const PATTERNS = [
  { id: "solid", name: "Solid Classic" },
  { id: "stripes", name: "Vertical Stripes" },
  { id: "gradient", name: "Modern Gradient" },
  { id: "chevron", name: "V-Chevron" },
];

// 👉 Admin ka WhatsApp number yahan daalein (country code ke sath, bina '+' sign ke)
const ADMIN_WHATSAPP_NUMBER = "923069110314";

export default function CustomKitBuilderPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"kit" | "upload">("upload");

  // Configurator States
  const [sport, setSport] = useState("Basketball");
  const [jerseyColor, setJerseyColor] = useState("#1e1b4b");
  const [accentColor, setAccentColor] = useState("#f59e0b");
  const [pattern, setPattern] = useState("solid");
  const [teamName, setTeamName] = useState("TITANS");
  const [fabric, setFabric] = useState("poly-mesh");

  const [activeView, setActiveView] = useState<"front" | "back">("front");

  // IMAGE UPLOADS
  const [fullJerseyImage, setFullJerseyImage] = useState<string | null>(null);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState<"center" | "left-chest">("left-chest");
  const [logoScale, setLogoScale] = useState<number>(70);

  // Bulk Roster Modal/State
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkText, setBulkText] = useState("");

  // Estimate / WhatsApp flow state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Pricing
  const BASE_PRICE = 25;
  const FULL_IMAGE_FEE = fullJerseyImage ? 5 : 0;
  const LOGO_FEE = logoImage ? 2 : 0;
  const selectedFabricObj = FABRICS.find((f) => f.id === fabric);
  const fabricUpgradeFee = activeTab === "kit" && selectedFabricObj ? selectedFabricObj.extraCost : 0;

  const singleKitPrice = BASE_PRICE + FULL_IMAGE_FEE + LOGO_FEE + fabricUpgradeFee;

  const [roster, setRoster] = useState<PlayerRoster[]>([
    { id: "1", name: "JORDAN", number: "23", size: "L", gender: "Men" },
    { id: "2", name: "BRYANT", number: "24", size: "XL", gender: "Men" },
  ]);

  const totalPrice = roster.length * singleKitPrice;

  // Handlers
  const handleFullImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFullJerseyImage(URL.createObjectURL(file));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogoImage(URL.createObjectURL(file));
  };

  const addPlayer = () => {
    setRoster([
      ...roster,
      { id: Date.now().toString(), name: "", number: (roster.length + 1).toString(), size: "L", gender: "Men" },
    ]);
  };

  const removePlayer = (id: string) => {
    if (roster.length > 1) setRoster(roster.filter((p) => p.id !== id));
  };

  const updatePlayer = (id: string, field: keyof PlayerRoster, value: string) => {
    setRoster(roster.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleBulkImport = () => {
    const lines = bulkText.split("\n");
    const newPlayers: PlayerRoster[] = [];

    lines.forEach((line, index) => {
      const parts = line.split(",").map((p) => p.trim());
      if (parts[0]) {
        newPlayers.push({
          id: (Date.now() + index).toString(),
          name: parts[0] || `PLAYER ${index + 1}`,
          number: parts[1] || `${index + 1}`,
          size: SIZES.includes(parts[2]?.toUpperCase()) ? parts[2].toUpperCase() : "L",
          gender: ["Men", "Women", "Youth"].includes(parts[3]) ? parts[3] : "Men",
        });
      }
    });

    if (newPlayers.length > 0) {
      setRoster(newPlayers);
      setShowBulkModal(false);
      setBulkText("");
    }
  };

  // ---------- Estimate / WhatsApp flow ----------

  const handleEstimateClick = () => {
    // 1. Check login status first
    if (status !== "authenticated" || !session) {
      setShowLoginPrompt(true);
      return;
    }

    // Pre-fill name from session if available
    if (session?.user?.name && !customerName) {
      setCustomerName(session.user.name);
    }

    setIsModalOpen(true);
  };

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !phoneNumber) {
      alert("Please fill in both Name and Phone Number.");
      return;
    }

    const rosterSummary = roster
      .map((p, i) => `${i + 1}. ${p.name || "UNNAMED"} - #${p.number} (${p.gender}, Size: ${p.size})`)
      .join("\n");

    const designSummary =
      activeTab === "kit"
        ? `Kit Builder Mode:\n• Sport: ${sport}\n• Team Name: ${teamName}\n• Base Color: ${jerseyColor}\n• Accent Color: ${accentColor}\n• Pattern: ${PATTERNS.find((p) => p.id === pattern)?.name}\n• Fabric: ${selectedFabricObj?.name}${logoImage ? "\n• Custom Logo: Attached" : ""}`
        : `Custom Upload Mode:\n${fullJerseyImage ? "• Full Jersey Design: Uploaded (attach image separately)" : "• No full jersey image uploaded"}${logoImage ? "\n• Separate Team Logo: Attached" : ""}`;

    const message = `Hello Admin, I would like to request an estimate for a Custom Kit design.

📌 *Customer Details:*
• Name: ${customerName}
• Phone: ${phoneNumber}
• Account Email: ${session?.user?.email || "N/A"}

🎨 *Design Details:*
${designSummary}

⚽ *Kit Roster Summary (${roster.length} Players):*
${rosterSummary}

💰 *Estimated Price (per kit basis):* $${singleKitPrice} x ${roster.length} = $${totalPrice} (subject to final admin confirmation)

Please review my artwork & roster details and share the final estimate.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans select-none pb-24">
      {/* Top Banner */}
      <div className="bg-slate-950 text-white py-6 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 font-black text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
              ⚡ Real-Time Custom Kit Studio
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1">
              Custom <span className="text-amber-500">{sport} Kit</span> Builder
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Premium Sublimation
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Fast 10-Day Delivery
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Canvas Mockup */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xl sticky top-6 text-center">
            {/* Mode Switcher Tabs */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-4 gap-1 border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("kit");
                  setActiveView("front");
                }}
                className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === "kit" ? "bg-slate-950 text-amber-400 shadow-md" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Shirt className="w-4 h-4" /> Kit Builder
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("upload");
                  setActiveView("front");
                }}
                className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === "upload" ? "bg-slate-950 text-amber-400 shadow-md" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ImageIcon className="w-4 h-4" /> Upload Image
              </button>
            </div>

            {/* Front / Back Toggle - ONLY IN KIT BUILDER MODE */}
            {activeTab === "kit" && (
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-500" /> Interactive Mockup
                </span>
                <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveView("front")}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      activeView === "front" ? "bg-amber-500 text-slate-950 font-black shadow" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Front
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveView("back")}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      activeView === "back" ? "bg-amber-500 text-slate-950 font-black shadow" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Back
                  </button>
                </div>
              </div>
            )}

            {/* MAIN CANVAS MOCKUP BOX */}
            <div
              className="w-full h-96 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 shadow-inner bg-slate-900"
              style={{ backgroundColor: activeTab === "kit" ? jerseyColor : "#0f172a" }}
            >
              {activeTab === "upload" && fullJerseyImage ? (
                <img
                  src={fullJerseyImage}
                  alt="Custom Full Design"
                  className="absolute inset-0 w-full h-full object-contain p-2 z-0"
                />
              ) : activeTab === "upload" ? (
                <div className="z-10 text-center p-6 text-slate-400">
                  <Upload className="w-10 h-10 mx-auto mb-2 text-amber-400 animate-bounce" />
                  <p className="text-xs font-bold uppercase">No Design Uploaded Yet</p>
                  <p className="text-[10px] text-slate-500 mt-1">Upload your jersey design image from the right side.</p>
                </div>
              ) : null}

              {activeTab === "kit" && pattern === "stripes" && (
                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(255,255,255,0.1)_20px,rgba(255,255,255,0.1)_40px)] pointer-events-none" />
              )}
              {activeTab === "kit" && pattern === "gradient" && (
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none" />
              )}

              {activeTab === "kit" && activeView === "front" && (
                <div className="text-center space-y-2 z-10 px-4 w-full flex flex-col items-center">
                  <h2 className="text-3xl font-black uppercase tracking-wider drop-shadow-md" style={{ color: accentColor }}>
                    {teamName || "TEAM NAME"}
                  </h2>
                  <div className="text-6xl font-black drop-shadow-lg" style={{ color: accentColor }}>
                    {roster[0]?.number || "00"}
                  </div>
                </div>
              )}

              {activeTab === "kit" && activeView === "back" && (
                <div className="text-center space-y-3 z-10 px-4 w-full flex flex-col items-center bg-black/50 backdrop-blur-sm py-4 rounded-xl border border-white/10">
                  <div className="text-sm font-black tracking-widest uppercase text-white drop-shadow-md border-b-2 border-white/20 pb-1">
                    {roster[0]?.name || "PLAYER NAME"}
                  </div>
                  <div className="text-7xl font-black drop-shadow-xl" style={{ color: accentColor }}>
                    {roster[0]?.number || "00"}
                  </div>
                </div>
              )}

              {activeTab === "kit" && logoImage && activeView === "front" && (
                <div
                  className={`absolute z-20 transition-all duration-200 pointer-events-none ${
                    logoPosition === "left-chest" ? "top-6 left-6" : "top-10"
                  }`}
                  style={{ width: `${logoScale}px` }}
                >
                  <img src={logoImage} alt="Team Logo" className="w-full h-auto max-h-24 object-contain filter drop-shadow-lg" />
                </div>
              )}

              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg z-20">
                Preview Mode
              </div>
            </div>

            {logoImage && (
              <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Separate Team Logo Attached
                  </span>
                  <button
                    onClick={() => setLogoImage(null)}
                    className="text-red-500 text-[10px] hover:underline font-extrabold flex items-center gap-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" /> Remove Logo
                  </button>
                </div>

                <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200">
                  <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 p-1 flex items-center justify-center shrink-0">
                    <img src={logoImage} alt="Logo Preview" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-xs">
                    <p className="font-extrabold text-slate-900">Custom Logo File</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {activeTab === "upload"
                        ? "Yeh logo print/embroidery design proofing ke liye alag se send kiya jaye ga."
                        : "Logo position controls niche diye gaye hain."}
                    </p>
                  </div>
                </div>

                {activeTab === "kit" && (
                  <div className="pt-2 border-t border-slate-200/60 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setLogoPosition("center")}
                        className={`py-1 text-[10px] font-black rounded-lg border transition-all cursor-pointer ${
                          logoPosition === "center" ? "bg-amber-500 text-slate-950 border-amber-500" : "bg-white text-slate-700"
                        }`}
                      >
                        Center Chest
                      </button>
                      <button
                        onClick={() => setLogoPosition("left-chest")}
                        className={`py-1 text-[10px] font-black rounded-lg border transition-all cursor-pointer ${
                          logoPosition === "left-chest" ? "bg-amber-500 text-slate-950 border-amber-500" : "bg-white text-slate-700"
                        }`}
                      >
                        Left Chest
                      </button>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                        <span>Logo Size</span>
                        <span>{logoScale}px</span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="120"
                        value={logoScale}
                        onChange={(e) => setLogoScale(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "kit" && (
              <div className="mt-4 text-left space-y-3">
                <label className="text-xs font-extrabold uppercase text-slate-700 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-amber-500" /> Colors & Patterns
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block mb-1">Base Color</span>
                    <input
                      type="color"
                      value={jerseyColor}
                      onChange={(e) => setJerseyColor(e.target.value)}
                      className="w-full h-9 rounded-xl cursor-pointer border border-slate-200"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block mb-1">Accent Color</span>
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-full h-9 rounded-xl cursor-pointer border border-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-500 block mb-1">Pattern</span>
                  <div className="grid grid-cols-2 gap-2">
                    {PATTERNS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPattern(p.id)}
                        className={`p-2 rounded-xl text-[11px] font-extrabold border transition-all cursor-pointer ${
                          pattern === p.id
                            ? "border-amber-500 bg-amber-50 text-slate-950 ring-2 ring-amber-500/20"
                            : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-7 space-y-6">
          {activeTab === "upload" ? (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-black uppercase text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs">1</span>
                  Upload Custom Jersey & Logo
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Pehle apni Full Jersey Design upload karein, phir agar alag se Logo lagana ho toh Logo upload karein.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:border-amber-500 transition-all bg-slate-50 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-black uppercase text-slate-800 mb-1">Full Jersey Design Image</p>
                    <p className="text-[10px] text-slate-500 mb-3">Main Shirt/Uniform Design</p>
                  </div>

                  {fullJerseyImage ? (
                    <div className="space-y-2">
                      <div className="w-16 h-16 mx-auto rounded-lg overflow-hidden border border-slate-300 bg-white p-1">
                        <img src={fullJerseyImage} className="w-full h-full object-contain" />
                      </div>
                      <button
                        onClick={() => setFullJerseyImage(null)}
                        className="text-xs text-red-600 font-extrabold hover:underline block mx-auto cursor-pointer"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <label className="inline-flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-black px-4 py-2.5 rounded-xl cursor-pointer shadow transition-all">
                      <Upload className="w-4 h-4 text-amber-400" /> Upload Jersey Image
                      <input type="file" accept="image/*" onChange={handleFullImageUpload} className="hidden" />
                    </label>
                  )}
                </div>

                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:border-amber-500 transition-all bg-slate-50 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-black uppercase text-slate-800 mb-1">Separate Team Logo (Optional)</p>
                    <p className="text-[10px] text-slate-500 mb-3">Chest par lagane ke liye (PNG / Transparent Logo)</p>
                  </div>

                  {logoImage ? (
                    <div className="space-y-2">
                      <div className="w-12 h-12 mx-auto rounded-lg overflow-hidden border border-slate-300 p-1 bg-white">
                        <img src={logoImage} className="w-full h-full object-contain" />
                      </div>
                      <button
                        onClick={() => setLogoImage(null)}
                        className="text-xs text-red-600 font-extrabold hover:underline block mx-auto cursor-pointer"
                      >
                        Remove Logo
                      </button>
                    </div>
                  ) : (
                    <label className="inline-flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl cursor-pointer shadow transition-all">
                      <Upload className="w-4 h-4" /> Upload Logo (+ $2/kit)
                      <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <h2 className="text-base font-black uppercase text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs">1</span>
                  Team Info & Custom Logo
                </h2>

                <div>
                  {logoImage ? (
                    <button
                      type="button"
                      onClick={() => setLogoImage(null)}
                      className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" /> Remove Logo
                    </button>
                  ) : (
                    <label className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-4 py-2 rounded-xl cursor-pointer shadow-md transition-all">
                      <Upload className="w-4 h-4" /> Upload Logo (+ $2)
                      <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-extrabold uppercase text-slate-700 mb-1 block">Team Name</label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold"
                    placeholder="e.g. TITANS"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold uppercase text-slate-700 mb-1 block">Sport Type</label>
                  <select
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold cursor-pointer"
                  >
                    <option value="Basketball">Basketball</option>
                    <option value="Soccer">Soccer</option>
                    <option value="Football">Football</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Volleyball">Volleyball</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase text-slate-700 mb-2 block">Fabric Material</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {FABRICS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFabric(f.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        fabric === f.id
                          ? "border-amber-500 bg-amber-500/5 ring-2 ring-amber-500/20"
                          : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-xs font-black text-slate-900">{f.name}</p>
                        {f.extraCost > 0 && (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">
                            +${f.extraCost}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">{f.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PLAYER ROSTER */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <h2 className="text-base font-black uppercase text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs">2</span>
                Player Names, Numbers & Sizes
              </h2>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowBulkModal(true)}
                  className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer transition-all"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> Bulk Add
                </button>

                <button
                  type="button"
                  onClick={addPlayer}
                  className="inline-flex items-center gap-1 bg-slate-950 text-white hover:bg-slate-800 text-xs font-extrabold px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Player
                </button>
              </div>
            </div>

            <div className="overflow-x-auto max-h-80 overflow-y-auto pr-1">
              <table className="w-full text-left text-xs font-bold">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                    <th className="pb-2">Player Name</th>
                    <th className="pb-2 w-20">Number</th>
                    <th className="pb-2 w-24">Gender</th>
                    <th className="pb-2 w-24">Size</th>
                    <th className="pb-2 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {roster.map((player) => (
                    <tr key={player.id}>
                      <td className="py-2 pr-2">
                        <input
                          type="text"
                          value={player.name}
                          onChange={(e) => updatePlayer(player.id, "name", e.target.value)}
                          placeholder="Name"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold uppercase"
                        />
                      </td>
                      <td className="py-2 pr-2">
                        <input
                          type="text"
                          value={player.number}
                          onChange={(e) => updatePlayer(player.id, "number", e.target.value)}
                          placeholder="#"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold"
                        />
                      </td>
                      <td className="py-2 pr-2">
                        <select
                          value={player.gender}
                          onChange={(e) => updatePlayer(player.id, "gender", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold cursor-pointer"
                        >
                          <option value="Men">Men</option>
                          <option value="Women">Women</option>
                          <option value="Youth">Youth</option>
                        </select>
                      </td>
                      <td className="py-2 pr-2">
                        <select
                          value={player.size}
                          onChange={(e) => updatePlayer(player.id, "size", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold cursor-pointer"
                        >
                          {SIZES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-2 text-right">
                        {roster.length > 1 && (
                          <button onClick={() => removePlayer(player.id)} className="text-red-400 hover:text-red-600 p-1 cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ESTIMATE & CHECKOUT REQUEST */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-4 gap-4">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Custom Quote Required</p>
                <p className="text-xs font-semibold text-slate-300 mt-1">
                  Final pricing will be provided by admin based on your artwork & roster details.
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 font-black text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-xl block">
                  {roster.length} {roster.length === 1 ? "Player Selected" : "Players Selected"}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free Mockup Review & Admin Approval Included
              </div>

              <button
                type="button"
                onClick={handleEstimateClick}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl cursor-pointer transition-all"
              >
                <ShoppingCart className="w-4 h-4" /> REQUEST ESTIMATE & CONTACT ADMIN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BULK ADD MODAL */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-black text-slate-900 text-sm uppercase flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Quick Bulk Roster Paste
              </h3>
              <button onClick={() => setShowBulkModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Format: <br />
              <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded font-bold">Player Name, Number, Size, Gender</code>
            </p>

            <textarea
              rows={6}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`Example:\nJORDAN, 23, L, Men\nBRYANT, 24, XL, Men\nSMITH, 10, M, Women`}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkImport}
                className="px-5 py-2 bg-amber-500 text-slate-950 text-xs font-black rounded-xl hover:bg-amber-400 cursor-pointer"
              >
                Import Players
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔒 NOT LOGGED IN MODAL */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl relative">
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLock className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">Login Required</h3>
            <p className="text-xs text-slate-500 mb-6">
              You need to be logged in to request a custom kit estimate and contact our admin team.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push("/sign-in")}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Sign In Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 💬 ESTIMATE POPUP MODAL (Logged In User) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <FaWhatsapp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Request Custom Estimate</h3>
                <p className="text-xs text-slate-500">Share contact info to talk with Admin on WhatsApp</p>
              </div>
            </div>

            <form onSubmit={handleSendToWhatsApp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Your Full Name</label>
                <div className="relative">
                  <FaUser className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">WhatsApp Phone Number</label>
                <div className="relative">
                  <FaPhoneAlt className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 0000000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-slate-900"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-500 text-xs">
                <p className="font-semibold text-slate-700 mb-0.5">Kit Details Attached:</p>
                <p>
                  {roster.length} Players, Sizes & {activeTab === "kit" ? "custom color/logo design" : "custom uploaded artwork"} —
                  Estimated ${totalPrice}
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaWhatsapp className="w-5 h-5" />
                Contact Admin via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}