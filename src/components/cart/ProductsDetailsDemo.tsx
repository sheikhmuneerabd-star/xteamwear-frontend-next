"use client";

import { useState } from "react";
import Image from "next/image";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import type { CartItem } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";

interface ProductsDetailsDemoProps {
  item: CartItem;
  onIncrease: (id: number | string, color: string, newPlayer?: any) => void;
  onDecrease: (id: number | string, color: string, playerIndexToRemove?: number) => void;
  onRemove: (id: number | string, color: string) => void;
}

export default function ProductsDetailsDemo({ item, onIncrease, onDecrease, onRemove }: ProductsDetailsDemoProps) {
  const variant = item.variants?.find((v) => v.color === item.color) ?? item.variants?.[0];
  const lineTotal = item.newPrice * item.qty;
  const sizing = item.sizingDetailData;
  const logoUrl = sizing?.logo || (sizing as any)?.sponsorLogo || (sizing as any)?.logoUrl || "";

  // Modal States for Option A
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // New Player Form State
  const [newPlayer, setNewPlayer] = useState({ name: "", number: "", size: "L" });

  // Handle Minus Click
  const handleMinusClick = () => {
    if (sizing?.players && sizing.players.length > 0) {
      if (item.qty > 1) {
        setIsRemoveModalOpen(true);
      }
    } else {
      if (item.qty > 1) {
        onDecrease(item.id, item.color);
      }
    }
  };

  // Handle Plus Click
  const handlePlusClick = () => {
    if (sizing?.players && sizing.players.length > 0) {
      setIsAddModalOpen(true);
    } else {
      onIncrease(item.id, item.color);
    }
  };

  // Confirm Player Removal
  const handleConfirmRemovePlayer = (index: number) => {
    onDecrease(item.id, item.color, index);
    setIsRemoveModalOpen(false);
  };

  // Confirm Add New Player
  const handleConfirmAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayer.name.trim() || !newPlayer.number.trim()) {
      alert("Please fill in player name and number");
      return;
    }
    onIncrease(item.id, item.color, newPlayer);
    setNewPlayer({ name: "", number: "", size: "L" });
    setIsAddModalOpen(false);
  };

  return (
    <div className="border-b border-gray-200 flex flex-col lg:flex-row items-start lg:items-center py-5 gap-4 relative">
      {/* IMAGE + FULL CUSTOMIZATION DETAILS */}
      <div className="flex flex-col sm:flex-row items-start gap-4 w-full lg:w-[55%]">
        <div className="relative w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] lg:w-[140px] lg:h-[140px] shrink-0 bg-gray-50 rounded border border-gray-100 overflow-hidden">
          <Image src={variant?.images[0] || "/placeholder.png"} alt={variant?.color || item.name} fill sizes="140px" className="object-cover" />
        </div>

        <div className="text-sm text-gray-600 space-y-1.5 w-full">
          <p className="cursor-pointer hover:underline text-black font-medium text-[15px]">{item.name}</p>
          <p className="flex items-center gap-2 text-gray-700">
            {variant?.color} / L <FiEdit className="text-[15px] text-gray-400 hover:text-black cursor-pointer" />
          </p>
          <p className="text-gray-500">Decoration Option: Standard</p>

          {/* Sizing & Custom Details */}
          {sizing && (
            <div className="pt-1 text-[13px] text-gray-600 space-y-1">
              {sizing.teamName && <p><span className="font-medium text-gray-800">Team Name:</span> {sizing.teamName}</p>}
              {sizing.playerNumberOption && <p><span className="font-medium text-gray-800">Player Number Option:</span> {sizing.playerNumberOption}</p>}
              {sizing.sponsorOption && <p><span className="font-medium text-gray-800">Sponsor Option:</span> {sizing.sponsorOption}</p>}
              {sizing.sponsorLocation && <p><span className="font-medium text-gray-800">Sponsor Location:</span> {sizing.sponsorLocation}</p>}
              
              {logoUrl && (
                <div className="flex items-center gap-2 my-1.5 p-1.5 bg-gray-50 border border-gray-200 rounded-lg w-fit">
                  <span className="font-medium text-gray-800 text-xs">Uploaded Logo:</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logoUrl} alt="Team Logo" className="w-8 h-8 object-contain rounded bg-white p-0.5 border" />
                </div>
              )}

              {sizing.note && <p><span className="font-medium text-gray-800">Requirements:</span> {sizing.note}</p>}
              
              {sizing.players && sizing.players.length > 0 && (
                <p><span className="font-medium text-gray-800">Number Of Players:</span> {sizing.players.length}</p>
              )}
              {sizing.players?.map((player, i) => (
                <div key={i} className="pl-2 border-l-2 border-gray-300 my-1 flex justify-between items-center pr-2">
                  <p>Player {i + 1}: {player.name} (#{player.number}) - Size: {player.size}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PRICE, QUANTITY & TOTAL */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full lg:w-[45%] gap-4">
        <div className="text-[15px]">
          {item.oldPrice > item.newPrice && (
            <p className="line-through text-gray-400 text-xs">{formatPrice(item.oldPrice)}</p>
          )}
          <p className="font-semibold text-gray-900">{formatPrice(item.newPrice)}</p>
        </div>

        {/* Quantity Controls */}
        <div className="border border-gray-300 rounded flex justify-between items-center w-[100px] h-[38px] shrink-0 bg-white">
          <button
            type="button"
            className="w-full h-full flex items-center cursor-pointer justify-center text-lg hover:bg-gray-100 text-gray-600 transition-colors"
            onClick={handleMinusClick}
          >
            -
          </button>
          <div className="w-full h-full flex items-center justify-center text-sm font-semibold">{item.qty}</div>
          <button
            type="button"
            className="w-full h-full flex items-center cursor-pointer justify-center text-md hover:bg-gray-100 text-gray-600 transition-colors"
            onClick={handlePlusClick}
          >
            +
          </button>
        </div>

        {/* Line Total & Remove */}
        <div className="flex justify-between items-center w-full sm:w-auto gap-4">
          <p className="font-bold text-gray-900 text-[15px]">
            {formatPrice(lineTotal)} USD
          </p>
          <IoMdClose className="text-xl text-gray-400 hover:text-red-600 cursor-pointer transition-colors" onClick={() => onRemove(item.id, item.color)} />
        </div>
      </div>

      {/* 🔴 MODAL 1: SELECT PLAYER TO REMOVE */}
      {isRemoveModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900">Select Player to Remove</h3>
            <p className="text-xs text-gray-500">Decreasing quantity requires selecting which player roster entry to delete.</p>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {sizing?.players?.map((player, idx) => (
                <div key={idx} className="flex justify-between items-center p-2.5 border rounded-lg hover:bg-red-50 border-gray-200">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{player.name} (#{player.number})</p>
                    <p className="text-xs text-gray-500">Size: {player.size}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleConfirmRemovePlayer(idx)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700 flex items-center gap-1"
                  >
                    <FiTrash2 /> Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold hover:bg-gray-300"
                onClick={() => setIsRemoveModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🟢 MODAL 2: ADD NEW PLAYER DETAILS */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleConfirmAddPlayer} className="bg-white rounded-xl max-w-md w-full p-5 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900">Add Player Details for New Kit</h3>
            
            <div className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Player Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John"
                  className="w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-amber-500"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Player Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10"
                  className="w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-amber-500"
                  value={newPlayer.number}
                  onChange={(e) => setNewPlayer({ ...newPlayer, number: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Size</label>
                <select
                  className="w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-amber-500 bg-white"
                  value={newPlayer.size}
                  onChange={(e) => setNewPlayer({ ...newPlayer, size: e.target.value })}
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="2XL">2XL</option>
                  <option value="3XL">3XL</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold hover:bg-gray-300"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 text-black rounded-lg text-xs font-bold hover:bg-amber-600 flex items-center gap-1"
              >
                <FiPlus /> Add Player & Increase Qty
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}