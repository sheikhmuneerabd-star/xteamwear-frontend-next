"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Upload, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Ruler, 
  CheckCircle2, 
  Palette, 
  Users, 
  ShoppingCart,
  Sparkles 
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
  { id: "poly-mesh", name: "Pro Dry-Fit Mesh", desc: "Lightweight & Breathable (160 GSM)" },
  { id: "interlock", name: "Heavyweight Interlock", desc: "Durable for high impact (220 GSM)" },
  { id: "spandex-blend", name: "4-Way Stretch Flex", desc: "Maximum agility & tight fit" },
];

export default function CustomKitBuilderPage() {
  const [sport, setSport] = useState("Basketball");
  const [jerseyColor, setJerseyColor] = useState("#4c1d95");
  const [accentColor, setAccentColor] = useState("#f59e0b");
  const [teamName, setTeamName] = useState("TITANS");
  const [fabric, setFabric] = useState("poly-mesh");

  // Roster Management
  const [roster, setRoster] = useState<PlayerRoster[]>([
    { id: "1", name: "JORDAN", number: "23", size: "L", gender: "Men" },
    { id: "2", name: "BRYANT", number: "24", size: "XL", gender: "Men" },
  ]);

  // Anti-Copy Handler
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  const addPlayer = () => {
    setRoster([
      ...roster,
      { id: Date.now().toString(), name: "", number: "", size: "M", gender: "Men" },
    ]);
  };

  const removePlayer = (id: string) => {
    setRoster(roster.filter((p) => p.id !== id));
  };

  const updatePlayer = (id: string, field: keyof PlayerRoster, value: string) => {
    setRoster(
      roster.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans select-none pb-20">
      
      {/* Header */}
      <div className="bg-slate-950 text-white py-10 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
              Bespoke Teamwear Configurator
            </span>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mt-1">
              Design Your <span className="text-amber-500">Custom Team Kit</span>
            </h1>
          </div>
          <div className="flex items-center gap-6 text-xs font-bold text-slate-400">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Full Sublimation</span>
            <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-400" /> Free Design Proof</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Visualizer Mockup */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl sticky top-6 text-center">
            
            {/* Mock Canvas Container */}
            <div 
              className="w-full h-96 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300 shadow-inner"
              style={{ backgroundColor: jerseyColor }}
            >
              <div className="text-center space-y-2 z-10 px-4">
                <h2 
                  className="text-3xl font-black uppercase tracking-wider drop-shadow-md"
                  style={{ color: accentColor }}
                >
                  {teamName || "TEAM NAME"}
                </h2>
                <div className="text-6xl font-black" style={{ color: accentColor }}>
                  {roster[0]?.number || "00"}
                </div>
                <div className="text-xs font-extrabold tracking-widest uppercase text-white/90">
                  {roster[0]?.name || "PLAYER"}
                </div>
              </div>
              
              <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                Preview Mode
              </div>
            </div>

            {/* Color Swatches */}
            <div className="mt-6 space-y-4 text-left">
              <label className="text-xs font-extrabold uppercase text-slate-700 flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-500" /> Base Colors
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">Primary Color</span>
                  <input
                    type="color"
                    value={jerseyColor}
                    onChange={(e) => setJerseyColor(e.target.value)}
                    className="w-full h-10 rounded-xl cursor-pointer border border-slate-200"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">Accent & Text</span>
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-full h-10 rounded-xl cursor-pointer border border-slate-200"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Customization Specs & Roster Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Team & Fabric Specs */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
            <h2 className="text-base font-black uppercase text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs">1</span>
              Team Details & Fabric Selection
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-extrabold uppercase text-slate-700 mb-1 block">Team Name</label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold"
                  placeholder="e.g. BULLS"
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
                  <option value="Baseball">Baseball</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-extrabold uppercase text-slate-700 mb-2 block">Choose Performance Fabric</label>
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
                    <p className="text-xs font-black text-slate-900">{f.name}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{f.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Player Roster & Uniform Sizing Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-black uppercase text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs">2</span>
                Player Names, Numbers & Sizes
              </h2>
              <button
                type="button"
                onClick={addPlayer}
                className="inline-flex items-center gap-1.5 bg-slate-950 text-white hover:bg-slate-800 text-xs font-extrabold px-3 py-1.5 rounded-xl cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Player
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-bold">
                <thead>
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
                      <td className="py-2.5 pr-2">
                        <input
                          type="text"
                          value={player.name}
                          onChange={(e) => updatePlayer(player.id, "name", e.target.value)}
                          placeholder="Name"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold uppercase"
                        />
                      </td>
                      <td className="py-2.5 pr-2">
                        <input
                          type="text"
                          value={player.number}
                          onChange={(e) => updatePlayer(player.id, "number", e.target.value)}
                          placeholder="#"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold"
                        />
                      </td>
                      <td className="py-2.5 pr-2">
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
                      <td className="py-2.5 pr-2">
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
                      <td className="py-2.5 text-right">
                        {roster.length > 1 && (
                          <button
                            onClick={() => removePlayer(player.id)}
                            className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
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

          {/* Submit Action */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 space-y-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Total Team Players</p>
              <p className="text-2xl font-black text-amber-400">{roster.length} Complete Kits</p>
            </div>
            <button
              type="button"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" /> Save Design & Proceed To Order
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}