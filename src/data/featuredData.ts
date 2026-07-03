import type { Product } from "@/types/product";

import blackBag1 from "@/assets/categoryPageSlideImg/blackBag1.avif";
import blackBagFront1 from "@/assets/categoryPageSlideImg/blackBagFront1.avif";
import blackBagBack1 from "@/assets/categoryPageSlideImg/blackBagBack1.avif";
import blackBagFrontSim1 from "@/assets/categoryPageSlideImg/blackBagFrontSim1.avif";

import blackBag2Front from "@/assets/categoryPageSlideImg/blackBag2Front.avif";
import blackBag2Front2 from "@/assets/categoryPageSlideImg/blackBag2Front2.webp";
import blackBag2Front3 from "@/assets/categoryPageSlideImg/blackBag2Front3.avif";
import blackBag2FrontLogo from "@/assets/categoryPageSlideImg/blackBag2FrontLogo.avif";

import whitefront1 from "@/assets/categoryPageSlideImg/whitefront1.avif";
import whiteback1 from "@/assets/categoryPageSlideImg/whiteback1.avif";
import whiteSim from "@/assets/categoryPageSlideImg/whiteSim.avif";
import whiteBackSim from "@/assets/categoryPageSlideImg/whiteBackSim.avif";

import blackBag3Front from "@/assets/categoryPageSlideImg/blackBag3Front.avif";
import blackBag3Front2 from "@/assets/categoryPageSlideImg/blackBag3Front2.avif";
import blackBag3Sim from "@/assets/categoryPageSlideImg/blackBag3Sim.avif";

const cateSlideData: Product[] = [
  {
    id: 13,
    name: "Boot Bag",
    oldPrice: 3068.79,
    newPrice: 2054.48,
    variants: [
      { color: "Black1", icon: blackBagFront1, images: [blackBagFront1, blackBagBack1, blackBag1, blackBagFrontSim1] },
    ],
  },
  {
    id: 14,
    name: "Recluse Drawstring Backpack",
    oldPrice: 4068.79,
    newPrice: 3054.48,
    variants: [
      { color: "BLACK2", icon: blackBag2Front, images: [blackBag2Front, blackBag2Front2, blackBag2Front3, blackBag2FrontLogo] },
      { color: "White", icon: whitefront1, images: [whitefront1, whiteback1, whiteSim, whiteBackSim] },
    ],
  },
  {
    id: 15,
    name: "Falcon - Adult Backpack",
    oldPrice: 17068.79,
    newPrice: 13054.48,
    variants: [
      { color: "Black3", icon: blackBag3Front, images: [blackBag3Front, blackBag3Front2, blackBag3Sim] },
    ],
  },
];

export default cateSlideData;