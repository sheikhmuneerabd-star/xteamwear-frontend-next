"use client";

import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import type { CartItem } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";

interface ProductsDetailsDemoProps {
  item: CartItem;
  onIncrease: (id: number | string, color: string) => void;
  onDecrease: (id: number | string, color: string) => void;
  onRemove: (id: number | string, color: string) => void;
}

export default function ProductsDetailsDemo({ item, onIncrease, onDecrease, onRemove }: ProductsDetailsDemoProps) {
  const variant = item.variants.find((v) => v.color === item.color) ?? item.variants[0];
  const lineTotal = item.newPrice * item.qty;
  const sizing = item.sizingDetailData;

  return (
    <div className="border-b border-gray-200 flex flex-col lg:flex-row items-start lg:items-center py-5 gap-4">
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
            <div className="pt-1 text-[13px] text-gray-600 space-y-0.5">
              {sizing.teamName && <p><span className="font-medium text-gray-800">Team Name:</span> {sizing.teamName}</p>}
              {sizing.playerNumberOption && <p><span className="font-medium text-gray-800">Player Number Option:</span> {sizing.playerNumberOption}</p>}
              {sizing.sponsorOption && <p><span className="font-medium text-gray-800">Sponsor Option:</span> {sizing.sponsorOption}</p>}
              {sizing.sponsorLocation && <p><span className="font-medium text-gray-800">Sponsor Location:</span> {sizing.sponsorLocation}</p>}
              {sizing.note && <p><span className="font-medium text-gray-800">Requirements:</span> {sizing.note}</p>}
              {sizing.players?.length > 0 && <p><span className="font-medium text-gray-800">Number Of Players:</span> {sizing.players.length}</p>}
              {sizing.players?.map((player, i) => (
                <div key={i} className="pl-2 border-l-2 border-gray-300 my-1">
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
            className="w-full h-full flex items-center justify-center text-lg hover:bg-gray-100 text-gray-600 transition-colors"
            onClick={() => item.qty > 1 && onDecrease(item.id, item.color)}
          >
            -
          </button>
          <div className="w-full h-full flex items-center justify-center text-sm font-semibold">{item.qty}</div>
          <button
            type="button"
            className="w-full h-full flex items-center justify-center text-md hover:bg-gray-100 text-gray-600 transition-colors"
            onClick={() => onIncrease(item.id, item.color)}
          >
            +
          </button>
        </div>

        {/* Line Total & Remove */}
        <div className="flex justify-between items-center w-full sm:w-auto gap-4">
          <p className="font-bold text-gray-900 text-[15px]">
            ${lineTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
          </p>
          <IoMdClose className="text-xl text-gray-400 hover:text-red-600 cursor-pointer transition-colors" onClick={() => onRemove(item.id, item.color)} />
        </div>
      </div>
    </div>
  );
}