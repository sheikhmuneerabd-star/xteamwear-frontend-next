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
    <div className="border border-gray-200 flex flex-col lg:flex-row items-start lg:items-center mt-2 p-4 gap-4">
      <div className="flex flex-col sm:flex-row items-start gap-3 w-full lg:w-[55%]">
        <div className="relative w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] lg:w-[150px] lg:h-[150px] p-1 shrink-0">
          <Image src={variant.images[0]} alt={variant.color} fill sizes="150px" className="object-cover" />
        </div>

        <div className="text-sm text-gray-600 space-y-2 w-full">
          <p className="cursor-pointer hover:underline text-black">{item.name}</p>
          <p className="flex items-center gap-2">
            {variant.color} / L <FiEdit className="text-[15px]" />
          </p>
          <p>Cikers Sports</p>
          <p>decoration option: Standard</p>

          {sizing && (
            <>
              {sizing.teamName && <p>Team Name: {sizing.teamName}</p>}
              {sizing.playerNumberOption && <p>Player Number Option: {sizing.playerNumberOption}</p>}
              {sizing.sponsorOption && <p>Sponsor Option: {sizing.sponsorOption}</p>}
              {sizing.sponsorLocation && <p>Sponsor Location: {sizing.sponsorLocation}</p>}
              {sizing.note && <p>requirements: {sizing.note}</p>}
              {sizing.players.length > 0 && <p>Number Of Player: {sizing.players.length}</p>}
              {sizing.players.map((player, i) => (
                <div key={i}>
                  <p>Size{i + 1}: {player.size}</p>
                  <p>Player {i + 1} Name: {player.name}</p>
                  <p>Number{i + 1}: {player.number}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full lg:w-[45%] gap-4">
        <div className="text-[14px]">
          <p className="line-through text-gray-500">{formatPrice(item.oldPrice)}</p>
          <p>{formatPrice(item.newPrice)}</p>
        </div>

        <div className="border border-gray-400 rounded-md flex justify-between items-center w-[100px] h-[40px] shrink-0">
          <button
            type="button"
            className="w-full h-full flex items-center justify-center text-2xl hover:bg-gray-300 cursor-pointer"
            onClick={() => item.qty > 1 && onDecrease(item.id, item.color)}
          >
            -
          </button>
          <div className="w-full h-full flex items-center justify-center">{item.qty}</div>
          <button
            type="button"
            className="w-full h-full flex items-center justify-center text-xl hover:bg-gray-300 cursor-pointer"
            onClick={() => onIncrease(item.id, item.color)}
          >
            +
          </button>
        </div>

        <div className="flex justify-between items-center w-full sm:w-auto gap-3">
          <p>${lineTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</p>
          <IoMdClose className="text-xl cursor-pointer" onClick={() => onRemove(item.id, item.color)} />
        </div>
      </div>
    </div>
  );
}