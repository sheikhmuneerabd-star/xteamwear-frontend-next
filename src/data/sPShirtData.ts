import type { Product } from "@/types/product";

import redFront from "@/assets/SizePageShirtImg/redFront.avif";
import redBack from "@/assets/SizePageShirtImg/redBack.avif";
import redFrontSim from "@/assets/SizePageShirtImg/redFrontSim.avif";
import redBackSim from "@/assets/SizePageShirtImg/redBackSim.avif";

import PinkGrayFront from "@/assets/SizePageShirtImg/PinkGrayFront.avif";
import PinkGrayBack from "@/assets/SizePageShirtImg/PinkGrayBack.avif";
import PinkGrayFrontSim from "@/assets/SizePageShirtImg/PinkGrayFrontSim.avif";
import PinkGrayBackSim from "@/assets/SizePageShirtImg/PinkGrayBackSim.avif";

import blackBlueFront from "@/assets/SizePageShirtImg/blackBlueFront.avif";
import blackBlueBack from "@/assets/SizePageShirtImg/blackBlueBack.avif";
import blackBlueFrontSim from "@/assets/SizePageShirtImg/blackBlueFrontSim.avif";
import blackBlueBackSim from "@/assets/SizePageShirtImg/blackBlueBackSim.avif";

import manBlackFront from "@/assets/SizePageShirtImg/manBlackFront.avif";
import blackFront from "@/assets/SizePageShirtImg/blackFront.avif";
import blackBack from "@/assets/SizePageShirtImg/blackBack.avif";
import blackFrontSim from "@/assets/SizePageShirtImg/blackFrontSim.avif";
import blackBackSim from "@/assets/SizePageShirtImg/blackBackSim.avif";

import manRedFront from "@/assets/SizePageShirtImg/manRedFront.avif";
import redFrontS from "@/assets/SizePageShirtImg/redFrontS.avif";
import RedBackS from "@/assets/SizePageShirtImg/RedBackS.avif";
import redFrontSSim from "@/assets/SizePageShirtImg/redFrontSSim.avif";
import redBackSSim from "@/assets/SizePageShirtImg/redBackSSim.avif";

const baseSPProducts: Product[] = [
  {
    id: 5,
    name: "Flame - Custom Soccer Jersey For Men Sublimation FT060109S",
    oldPrice: 12068.79,
    newPrice: 8054.48,
    variants: [
      { color: "Red", icon: redFront, images: [redFront, redBack, redFrontSim, redBackSim] },
    ],
  },
  {
    id: 6,
    name: "Map - Custom Soccer Jersey For Men Sublimation FT060110S",
    oldPrice: 10128.79,
    newPrice: 8050.82,
    variants: [
      {
        color: "Deeppink",
        icon: PinkGrayFront,
        images: [PinkGrayFront, PinkGrayBack, PinkGrayFrontSim, PinkGrayBackSim],
      },
    ],
  },
  {
    id: 7,
    name: "Fashion Performance Jersey - Custom Soccer Jersey For Men Sublimation FT062033S",
    oldPrice: 12048.21,
    newPrice: 8044.38,
    variants: [
      {
        color: "Black",
        icon: blackBlueFront,
        images: [blackBlueFront, blackBlueBack, blackBlueFrontSim, blackBlueBackSim],
      },
    ],
  },
  {
    id: 8,
    name: "Aura - Custom Soccer Jersey For Men Sublimation FT030402S",
    oldPrice: 13198.48,
    newPrice: 11054.28,
    variants: [
      {
        color: "Black",
        icon: blackFront,
        images: [manBlackFront, blackFront, blackBack, blackFrontSim, blackBackSim],
      },
      {
        color: "Red",
        icon: redFrontS,
        images: [manRedFront, redFrontS, RedBackS, redFrontSSim, redBackSSim],
      },
    ],
  },
];

// Original repeated ids 5-8 as 9-12 to pad the related-products slider.
// Same note as shirtData.ts: real backend won't need this duplication.
const sPShirtData: Product[] = [
  ...baseSPProducts,
  ...baseSPProducts.map((p) => ({ ...p, id: (p.id as number) + 4 })),
];

export default sPShirtData;