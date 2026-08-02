"use client";

import React, { useState, useEffect } from "react";
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
  Download,
  Info,
  FileSpreadsheet,
  CheckCircle2,
  Sliders,
  Ruler
} from "lucide-react";

// Types
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

export default function CustomKitBuilderPage() {
  // Configurator States
  const [sport, setSport] = useState("Basketball");
  const [jerseyColor, setJerseyColor] = useState("#4c1d95"); // Purple default
  const [accentColor, setAccentColor] = useState("#f59e0b"); // Gold/Amber default
  const [pattern, setPattern] = useState("solid");
  const [teamName, setTeamName] = useState("TITANS");
  const [fabric, setFabric] = useState("poly-mesh");
  
  // Interactive View (Front / Back View)
  const [activeView, setActiveView] = useState<"front" | "back">("front");

  // Logo & Image Customization
  const [kitImage, setKitImage] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState<"center" | "left-chest" | "full">("center");
  const [logoScale, setLogoScale] = useState<number>(80);

  // Bulk Roster Modal/State
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkText, setBulkText] = useState("");

  // Base Kit Pricing Calculation
  const BASE_PRICE = 25; // $25 per kit base cost
  const LOGO_FEE = kitImage ? 2 : 0;
  const selectedFabricObj = FABRICS.find(f => f.id === fabric);
  const fabricUpgradeFee = selectedFabricObj ? selectedFabricObj.extraCost : 0;
  const singleKitPrice = BASE_PRICE + LOGO_FEE + fabricUpgradeFee;

  // Player Roster
  const [roster, setRoster] = useState<PlayerRoster[]>([
    { id: "1", name: "JORDAN", number: "23", size: "L", gender: "Men" },
    { id: "2", name: "BRYANT", number: "24", size: "XL", gender: "Men" },
  ]);

  // Total Price
  const totalPrice = roster.length * singleKitPrice;

  // Context Menu Protection
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  // Upload Handlers
  const handleKitImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setKitImage(url);
    }
  };

  const removeKitImage = () => setKitImage(null);

  // Roster Handlers
  const addPlayer = () => {
    setRoster([
      ...roster,
      { id: Date.now().toString(), name: "", number: (roster.length + 1).toString(), size: "L", gender: "Men" },
    ]);
  };

  const removePlayer = (id: string) => {
    if (roster.length > 1) {
      setRoster(roster.filter((p) => p.id !== id));
    }
  };

  const updatePlayer = (id: string, field: keyof PlayerRoster, value: string) => {
    setRoster(roster.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  // Bulk Paste Handler (Format: Name, Number, Size, Gender)
  const handleBulkImport = () => {
    const lines = bulkText.split("\n");
    const newPlayers: PlayerRoster[] = [];

    lines.forEach((line, index) => {
      const parts = line.split(",").map(p => p.trim());
      if (parts[0]) {
        newPlayers.push({
          id: (Date.now() + index).toString(),
          name: parts[0] || `PLAYER ${index + 1}`,
          number: parts[1] || `${index + 1}`,
          size: SIZES.includes(parts[2]?.toUpperCase()) ? parts[2].toUpperCase() : "L",
          gender: ["Men", "Women", "Youth"].includes(parts[3]) ? parts[3] : "Men"
        });
      }
    });

    if (newPlayers.length > 0) {
      setRoster(newPlayers);
      setShowBulkModal(false);
      setBulkText("");
    }
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
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Premium Sublimation</span>
            <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-400" /> Fast 10-Day Delivery</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: 3D-Like Preview Canvas + Quick Tool Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xl sticky top-6 text-center">
            
            {/* View Switcher Controls */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-amber-500" /> Interactive Mockup
              </span>
              <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
                <button
                  type="button"
                  onClick={() => setActiveView("front")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeView === "front" ? "bg-slate-950 text-white shadow" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Front View
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView("back")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeView === "back" ? "bg-slate-950 text-white shadow" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Back View
                </button>
              </div>
            </div>

            {/* Mock Canvas Container */}
            <div 
              className={`w-full h-96 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 shadow-inner bg-cover bg-center ${
                pattern === "stripes" ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]" : ""
              }`}
              style={{ 
                backgroundColor: jerseyColor,
                backgroundImage: logoPosition === "full" && kitImage ? `url(${kitImage})` : undefined,
                backgroundSize: "cover"
              }}
            >
              {/* Pattern Overlay Mock */}
              {pattern === "stripes" && (
                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(255,255,255,0.1)_20px,rgba(255,255,255,0.1)_40px)] pointer-events-none" />
              )}
              {pattern === "gradient" && (
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none" />
              )}

              {/* FRONT VIEW DISPLAY */}
              {activeView === "front" && (
                <div className="text-center space-y-2 z-10 px-4 w-full flex flex-col items-center">
                  
                  {/* Chest Logo Placement */}
                  {kitImage && logoPosition !== "full" && (
                    <div 
                      className={`mb-2 transition-all duration-200 ${
                        logoPosition === "left-chest" ? "self-start ml-8" : "self-center"
                      }`}
                      style={{ width: `${logoScale}px` }}
                    >
                      <img src={kitImage} alt="Uploaded Logo" className="w-full h-auto max-h-24 object-contain drop-shadow-md" />
                    </div>
                  )}

                  <h2 
                    className="text-3xl font-black uppercase tracking-wider drop-shadow-md"
                    style={{ color: accentColor }}
                  >
                    {teamName || "TEAM NAME"}
                  </h2>

                  <div className="text-6xl font-black drop-shadow-lg" style={{ color: accentColor }}>
                    {roster[0]?.number || "00"}
                  </div>
                </div>
              )}

              {/* BACK VIEW DISPLAY */}
              {activeView === "back" && (
                <div className="text-center space-y-3 z-10 px-4 w-full flex flex-col items-center">
                  <div className="text-sm font-black tracking-widest uppercase text-white drop-shadow-md border-b-2 border-white/20 pb-1">
                    {roster[0]?.name || "PLAYER NAME"}
                  </div>
                  <div className="text-7xl font-black drop-shadow-xl" style={{ color: accentColor }}>
                    {roster[0]?.number || "00"}
                  </div>
                </div>
              )}

              <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                Previewing Player #1
              </div>
            </div>

            {/* Logo Settings Controls (If Uploaded) */}
            {kitImage && (
              <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-left">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1"><Sliders className="w-3.5 h-3.5 text-amber-500" /> Logo Placement</span>
                  <button onClick={removeKitImage} className="text-red-500 text-[10px] hover:underline font-extrabold flex items-center gap-0.5 cursor-pointer">
                    <X className="w-3 h-3" /> Remove
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-1.5 pt-1">
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
                  <button
                    onClick={() => setLogoPosition("full")}
                    className={`py-1 text-[10px] font-black rounded-lg border transition-all cursor-pointer ${
                      logoPosition === "full" ? "bg-amber-500 text-slate-950 border-amber-500" : "bg-white text-slate-700"
                    }`}
                  >
                    Full Jersey
                  </button>
                </div>

                {logoPosition !== "full" && (
                  <div className="pt-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                      <span>Logo Size</span>
                      <span>{logoScale}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="40" 
                      max="140" 
                      value={logoScale} 
                      onChange={(e) => setLogoScale(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer" 
                    />
                  </div>
                )}
              </div>
            )}

            {/* Colors & Patterns Options */}
            <div className="mt-4 text-left space-y-3">
              <label className="text-xs font-extrabold uppercase text-slate-700 flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-500" /> Color Theme & Patterns
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
                  <span className="text-[10px] font-bold text-slate-500 block mb-1">Accent/Text Color</span>
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-full h-9 rounded-xl cursor-pointer border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 block mb-1">Jersey Style Pattern</span>
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

          </div>
        </div>

        {/* RIGHT COLUMN: Configuration Steps & Bulk Roster */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Team Specs & Image Upload */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <h2 className="text-base font-black uppercase text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs">1</span>
                Team Info & Custom Logo
              </h2>

              {/* Upload Kit/Logo Button */}
              <div>
                {kitImage ? (
                  <button
                    type="button"
                    onClick={removeKitImage}
                    className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" /> Remove Logo
                  </button>
                ) : (
                  <label className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-4 py-2 rounded-xl cursor-pointer shadow-md transition-all">
                    <Upload className="w-4 h-4" /> Upload Team Logo (+ $2/kit)
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleKitImageUpload} 
                      className="hidden" 
                    />
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

            {/* Performance Fabric Selection */}
            <div>
              <label className="text-xs font-extrabold uppercase text-slate-700 mb-2 block">Select Performance Fabric</label>
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

          {/* Step 2: Player Roster & Sizing */}
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
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> Bulk Add (Paste)
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

            {/* Roster Table */}
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
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-2 text-right">
                        {roster.length > 1 && (
                          <button
                            onClick={() => removePlayer(player.id)}
                            className="text-red-400 hover:text-red-600 p-1 cursor-pointer"
                          >
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

          {/* Pricing & Checkout Summary Box */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 shadow-2xl space-y-4">
            
            <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-4 gap-4">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Price Breakdown</p>
                <p className="text-xs font-extrabold text-slate-300 mt-0.5">
                  ${singleKitPrice.toFixed(2)} per kit × {roster.length} Players
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-400 font-bold uppercase">Estimated Total</p>
                <p className="text-3xl font-black text-amber-400">${totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free Design Proofing Included
              </div>

              <button
                type="button"
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl cursor-pointer transition-all"
              >
                <ShoppingCart className="w-4 h-4" /> Save Design & Order Now
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* BULK ADD ROSTER MODAL */}
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
              Excel ya text file se copy paste karein. Format: <br />
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

    </div>
  );
}