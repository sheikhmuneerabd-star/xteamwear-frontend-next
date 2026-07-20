"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoLogoWhatsapp, IoCloudUploadOutline, IoShirt } from "react-icons/io5";
import { TbTruckDelivery, TbShirtFilled } from "react-icons/tb";
import { BsQuestionCircleFill } from "react-icons/bs";

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
  players: [],
};

export default function SizingSystem({ product, selectedColor, setSelectedColor }: SizingSystemProps) {
  const { addToCart } = useCart();

  const [teamNameOpen, setTeamNameOpen] = useState(false);
  const [playerNumberOpen, setPlayerNumberOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);
  const [sponsorOpen, setSponsorOpen] = useState(false);

  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const handleRef = () => fileRef.current?.click();

  const [formData, setFormData] = useState<SizingFormData>(emptyForm);
  const [players, setPlayers] = useState(0);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      players: Array.from({ length: players }, () => ({ size: "", name: "", number: "" })),
    }));
  }, [players]);

  const handlePlayerChange = (index: number, field: keyof PlayerRow, value: string) => {
    setFormData((prev) => {
      const updatedPlayers = [...prev.players];
      updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
      return { ...prev, players: updatedPlayers };
    });
  };

  const handleSubmit = () => {
    if (uploadingLogo) {
      alert("Logo abhi upload ho raha hai, thora intezar karo");
      return;
    }
    if (!formData.teamName) {
      alert("Team Name required");
      return;
    }

    if (!formData.teamName) {
      alert("Team Name required");
      return;
    }
    if (!formData.playerNumberOption) {
      alert("Select Player Number Option");
      return;
    }
    for (let i = 0; i < formData.players.length; i++) {
      const p = formData.players[i];
      if (!p.size || !p.name || !p.number) {
        alert(`Player ${i + 1} ka data complete karo`);
        return;
      }
    }

    addToCart(product, selectedColor, formData);

    setFormData(emptyForm);
    setPreview(null);
    setPlayers(0);
  };

  const [standard, setStandard] = useState(true);
  const [bespoke, setBespoke] = useState(false);

  return (
    <div className="xl:w-[45%] md:w-[55%] w-full md:mt-0 mt-5 md:z-0 z-50 bg-white">
      <div className="md:w-[85%] w-[89%] mx-auto space-y-4">
        <h2 className="text-2xl font-semibold mt-1">{product.name}</h2>
        <p className="text-gray-600 text-[15px] font-medium line-clamp-2">
          Feature CONVEX-FIT fabric Made from 100% polyester wicking knit with 92% polyester
          / 8% spandex wicking pinhole mesh High-tech
        </p>
        <div className="flex flex-wrap gap-2 text-2xl">
          <p className="line-through">{formatPrice(product.oldPrice)}</p>
          <span className="text-red-500 font-semibold">
            {formatPrice(product.newPrice)}
          </span>
        </div>
        <p className="underline hover:text-gray-600 w-fit cursor-pointer text-sm">Size Chart</p>
        <div className="flex items-center">
          <p className="text-sm font-medium">
            Color: <span className="font-normal text-gray-600">{selectedColor}</span>
          </p>
          <div className="md:block hidden w-[75%] h-[1px] border border-gray-200 mt-[5px] ml-1"></div>
        </div>
        <div className="flex gap-[9px]">
          {product.variants.map((variant, i) => (
            <div
              key={i}
              className={`relative w-[60px] h-[60px] border-[1.4px] p-[3px] rounded-lg cursor-pointer overflow-hidden ${
                selectedColor === variant.color ? "border-blue-900" : "border-gray-300"
              }`}
              onClick={() => setSelectedColor(variant.color)}
            >
              <Image src={variant.icon} alt={variant.color} fill sizes="60px" className="rounded-lg object-cover" />
            </div>
          ))}
        </div>

        <div className="flex gap-2 text-[15px]">
          <p className="font-medium">Step 1: Choose a decoration option</p>
          <span>{standard ? "Standard" : "Bespoke"}</span>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className={`${
              standard ? "bg-black text-gray-100" : "text-gray-700 border border-gray-600"
            } w-[105px] rounded cursor-pointer font-semibold text-lg h-[40px]`}
            onClick={() => {
              setStandard(true);
              setBespoke(false);
            }}
          >
            Standard
          </button>
          <button
            type="button"
            className={`${
              bespoke ? "bg-black text-gray-100" : "text-gray-700 border border-gray-600"
            } w-[105px] rounded cursor-pointer font-semibold text-[18px] h-[40px]`}
            onClick={() => {
              setBespoke(true);
              setStandard(false);
            }}
          >
            Bespoke
          </button>
        </div>

        <div className={`${standard ? "block" : "hidden"} space-y-4`}>
          <div>
            <Image src={sponserPosition} alt="Sponsor position guide" className="w-full h-auto" />
          </div>

          <div>
            <p className="font-medium">Step 2: Team Information</p>
            <div className="flex flex-wrap gap-3 text-black mt-1">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  className="w-5 h-5 border border-gray-300 accent-blue-500 rounded-md checked:bg-blue-600 checked:border-blue-600 text-white"
                  type="checkbox"
                  checked={teamNameOpen}
                  onChange={() => setTeamNameOpen((v) => !v)}
                />
                <span className="font-semibold text-gray-800">Team Name</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  className="w-5 h-5 border border-gray-300 accent-blue-500 rounded-md checked:bg-blue-600 checked:border-blue-600 text-white"
                  type="checkbox"
                  checked={playerNumberOpen}
                  onChange={() => setPlayerNumberOpen((v) => !v)}
                />
                <span className="font-semibold text-gray-800">Player Number</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  className="w-5 h-5 border border-gray-300 accent-blue-500 rounded-md checked:bg-blue-600 checked:border-blue-600 text-white"
                  type="checkbox"
                  checked={logoOpen}
                  onChange={() => setLogoOpen((v) => !v)}
                />
                <span className="font-semibold text-gray-800">Logo</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  className="w-5 h-5 border border-gray-300 accent-blue-500 rounded-md checked:bg-blue-600 checked:border-blue-600 text-white"
                  type="checkbox"
                  checked={sponsorOpen}
                  onChange={() => setSponsorOpen((v) => !v)}
                />
                <span className="font-semibold text-gray-800">Sponsor</span>
              </label>
            </div>

            <div className={`mt-2 ${teamNameOpen ? "block" : "hidden"}`}>
              <h2 className="font-medium">Team Name</h2>
              <textarea
                className="w-full mt-1 h-[70px] border border-black rounded p-3 outline-none"
                onChange={(e) => setFormData((prev) => ({ ...prev, teamName: e.target.value }))}
                value={formData.teamName}
              />
            </div>

            <div className={`mt-2 ${playerNumberOpen ? "block" : "hidden"}`}>
              <h2 className="font-medium">Player Number Option</h2>
              <select
                className="border mt-1 border-black w-full p-2 font-medium rounded cursor-pointer"
                onChange={(e) => setFormData((prev) => ({ ...prev, playerNumberOption: e.target.value }))}
                value={formData.playerNumberOption}
              >
                <option value="">Please choose</option>
                <option value="Both Sides">Both Sides</option>
                <option value="Only Back Number">Only Back Number</option>
                <option value="Ony Front Number">Ony Front Number</option>
              </select>
            </div>

            <div className={`font-medium mt-2 ${logoOpen ? "block" : "hidden"}`}>
              Logo <span className="text-[14px] text-red-600">*</span>
              <div
                className="w-[60px] mt-[7px] h-[60px] flex justify-center items-center border-[1.3px] border-dashed border-gray-800 rounded-md cursor-pointer overflow-hidden relative"
                onClick={handleRef}
              >
                {uploadingLogo ? (
                  <span className="text-[10px] text-gray-600">...</span>
                ) : preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <IoCloudUploadOutline className="text-2xl text-gray-800" />
                )}
                <input
                  className="hidden"
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setPreview(URL.createObjectURL(file)); // instant local preview
                    setUploadingLogo(true);

                    try {
                      const formData = new FormData();
                      formData.append("file", file);
                      const res = await fetch("/api/upload", { method: "POST", body: formData });
                      const data = await res.json();

                      if (!res.ok) {
                        alert(data.error || "Logo upload failed");
                        setPreview(null);
                        return;
                      }

                      setFormData((prev) => ({ ...prev, logo: data.url })); // ab URL string save hoga
                    } catch {
                      alert("Logo upload failed. Please try again.");
                      setPreview(null);
                    } finally {
                      setUploadingLogo(false);
                    }
                  }}
                />
              </div>
            </div>

            <div className={`space-y-4 mt-3 ${sponsorOpen ? "block" : "hidden"}`}>
              <div>
                <h2 className="font-medium">Sponsor Option</h2>
                <select
                  className="border mt-1 border-black w-full p-2 font-medium rounded cursor-pointer"
                  onChange={(e) => setFormData((prev) => ({ ...prev, sponsorOption: e.target.value }))}
                  value={formData.sponsorOption}
                >
                  <option value="">Please choose</option>
                  <option value="Sponsor Text">Sponsor Text</option>
                  <option value="Sponsor Image">Sponsor Image</option>
                </select>
              </div>
              <div>
                <h2 className="font-medium">Sponsor Location</h2>
                <select
                  className="border mt-1 border-black w-full p-2 font-medium rounded cursor-pointer"
                  onChange={(e) => setFormData((prev) => ({ ...prev, sponsorLocation: e.target.value }))}
                  value={formData.sponsorLocation}
                >
                  <option value="">Please choose</option>
                  <option value="Front Chest">1. Front Chest (Replacing TeamName)</option>
                  <option value="Front Belly">2. Front Belly (Low Position)</option>
                  <option value="Back Waist">3. Back Waist (Low Position)</option>
                  <option value="Replacing Play Name">4. Replacing Play Name</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <p className="font-medium">Step 3: Special requirements and additional notes</p>
            <textarea
              className="w-full mt-1 h-[70px] border border-black rounded p-3 outline-none"
              onChange={(e) => setFormData((prev) => ({ ...prev, note: e.target.value }))}
              value={formData.note}
            />
          </div>

          <div>
            <p className="font-medium">Step 4: Player Information</p>
            <p className="font-medium mt-1">Number of Players</p>
            <select
              className="border mt-1 border-black w-full p-2 outline-none font-medium rounded cursor-pointer"
              onChange={(e) => setPlayers(Number(e.target.value))}
              value={players}
            >
              <option value="">Please choose</option>
              {Array.from({ length: 11 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            {Array.from({ length: players }).map((_, index) => (
              <div key={index} className="flex flex-wrap lg:flex-nowrap items-center gap-3">
                <div>
                  <p className="font-medium">Size {index + 1}</p>
                  <select
                    className="border mt-1 border-black p-2 h-[40px] font-medium rounded cursor-pointer"
                    value={formData.players[index]?.size || ""}
                    onChange={(e) => handlePlayerChange(index, "size", e.target.value)}
                  >
                    <option value="">Please choose</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="3XL">3XL</option>
                  </select>
                </div>
                <div>
                  <p className="font-medium">Player {index + 1} Name</p>
                  <input
                    className="border mt-1 border-black h-[40px] rounded-md w-[99%] outline-none pl-3"
                    type="text"
                    value={formData.players[index]?.name || ""}
                    onChange={(e) => handlePlayerChange(index, "name", e.target.value)}
                  />
                </div>
                <div>
                  <p className="font-medium">Number {index + 1}</p>
                  <input
                    className="border mt-1 border-black h-[40px] rounded-md w-[99%] outline-none pl-3"
                    type="text"
                    value={formData.players[index]?.number || ""}
                    onChange={(e) => handlePlayerChange(index, "number", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="w-full h-[50px] cursor-pointer border rounded-md font-semibold text-sm border-yellow-400 hover:bg-yellow-400 transition-all duration-100"
            onClick={handleSubmit}
          >
            ADD TO CART
          </button>
        </div>

        <div className={`${bespoke ? "block" : "hidden"} space-y-4`}>
          <p className="text-[14px] text-gray-800">
            *There will be a certain additional cost for Bespoke printing
          </p>
          <div className="space-y-1">
            <p className="font-medium">Step 2: Please write your requirements</p>
            <p className="text-[14px] text-gray-800">Bespoke service including:</p>
          </div>
          <div className="text-[14px] text-gray-800 space-y-1">
            <p>1. Change color, pattern or printing position</p>
            <p>2. Add sponsor or any custom text</p>
            <p>3. Replicate your design idea and make your dream jersey.</p>
          </div>
          <button
            type="button"
            className="w-full h-[50px] border rounded-md font-semibold text-sm border-yellow-400 hover:bg-yellow-400 transition-all duration-100"
          >
            GET A QUOTE
          </button>
        </div>

        <div>
          <div className="flex flex-wrap items-center text-[13px]">
            <span>Contact us on</span>
            <span className="flex items-center cursor-pointer text-blue-600 font-semibold ml-1">
              <IoLogoWhatsapp className="text-green-600 text-2xl" /> WhatsApp
            </span>
            <span>, or send E-mail to</span>
            <p className="ml-[3px] font-medium cursor-pointer">support@xteamwear.com</p>
          </div>
        </div>

        <div>
          <div className="flex gap-2 items-center text-[15px] w-fit cursor-pointer">
            <TbTruckDelivery className="text-[26px]" />
            <div>
              <div className="flex items-center gap-4">
                <span>Free Shipping</span>
                <BsQuestionCircleFill className="text-[16.5px] text-gray-400" />
              </div>
              <p className="text-blue-600">Learn More</p>
            </div>
          </div>
          <div className="flex gap-2 items-center text-[15px] w-fit cursor-pointer">
            <IoShirt className="text-[26px]" />
            <div>
              <div className="flex items-center gap-4">
                <span>Low MOQ: 1 Piece Customization</span>
                <BsQuestionCircleFill className="text-[16.5px] text-gray-400" />
              </div>
              <p className="text-blue-600">Learn More</p>
            </div>
          </div>
          <div className="flex gap-2 items-center text-[15px] w-fit cursor-pointer">
            <TbShirtFilled className="text-[26px]" />
            <div>
              <div className="flex items-center gap-4">
                <span>Sublimation Printing - Won&apos;t Fade</span>
                <BsQuestionCircleFill className="text-[16.5px] text-gray-400" />
              </div>
              <p className="text-blue-600">Learn More</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}