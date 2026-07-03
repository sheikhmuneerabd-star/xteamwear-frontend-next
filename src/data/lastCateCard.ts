import type { RecentProduct } from "@/types/recentProduct";

import whiteBlueFront1 from "@/assets/baseball/whiteBlueFront1.avif";
import whiteBlueBack1 from "@/assets/baseball/whiteBlueBack1.avif";
import whiteBlueFront1Sim from "@/assets/baseball/whiteBlueFront1Sim.avif";
import whiteBlueBack1Sim from "@/assets/baseball/whiteBlueBack1Sim.avif";

import yellowFront1 from "@/assets/baseball/yellowFront1.avif";
import yellowBack1 from "@/assets/baseball/yellowBack1.avif";
import yellowFront1Sim from "@/assets/baseball/yellowFront1Sim.avif";
import yellowBack1Sim from "@/assets/baseball/yellowBack1Sim.avif";

import whiteBlackFront1 from "@/assets/baseball/whiteBlackFront1.avif";
import whiteBlackBack1 from "@/assets/baseball/whiteBlackBack1.avif";
import whiteBlackFront1Sim from "@/assets/baseball/whiteBlackFront1Sim.avif";
import whiteBlackBack1Sim from "@/assets/baseball/whiteBlackBack1Sim.avif";

const lastCateCard: RecentProduct[] = [
  {
    id: 31,
    name: "Dark Clouds - Custom Soccer Jersey For Men Sublimation FT060109S",
    oldPrice: 3068.79,
    newPrice: 2054.48,
    category: "Baseball",
    variants: [
      { color: "whiteBlue1", icon: "bg-white border", images: [whiteBlueFront1, whiteBlueBack1, whiteBlueFront1Sim, whiteBlueBack1Sim] },
    ],
  },
  {
    id: 32,
    name: "Premium Sports Shirt - Custom Soccer Jersey For Men Sublimation",
    oldPrice: 4068.79,
    newPrice: 3054.48,
    category: "Baseball",
    variants: [
      { color: "whiteBlack4", icon: "bg-black", images: [whiteBlackFront1, whiteBlackBack1, whiteBlackFront1Sim, whiteBlackBack1Sim] },
    ],
  },
  {
    id: 33,
    name: "Elite Performance Jersey - Custom Soccer Jersey For Men Sublimation FT062033S",
    oldPrice: 17068.79,
    newPrice: 13054.48,
    category: "Baseball",
    variants: [
      { color: "yellow2", icon: "bg-yellow-400", images: [yellowFront1, yellowBack1, yellowFront1Sim, yellowBack1Sim] },
    ],
  },
];

export default lastCateCard;