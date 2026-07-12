

import imageFront from "@/assets/shirtsImages/front-shirt.jpg";
import imageBack from "@/assets/shirtsImages/back-shirt.jpg";
import blueFront from "@/assets/shirtsImages/blueFront.webp";
import blueBack from "@/assets/shirtsImages/blueBack.webp";
import blueFrontTo from "@/assets/shirtsImages/blueToFront.webp";
import blueBackTo from "@/assets/shirtsImages/blueToBack.webp";
import redFront from "@/assets/shirtsImages/redFront.webp";
import redBack from "@/assets/shirtsImages/redBack.webp";

import blueSimpleFront from "@/assets/clickCardImgSld/simpleFront.avif";
import blueSimpleBack from "@/assets/clickCardImgSld/simpleBack.avif";

import whiteFrontSim from "@/assets/clickCardImgSld/whiteFrontSim.avif";
import whiteBackSim from "@/assets/clickCardImgSld/whiteBackSim.avif";

import redFrontSim from "@/assets/clickCardImgSld/redFrontSim.avif";
import redBackSim from "@/assets/clickCardImgSld/redBackSim.avif";

import BlueFrontSim from "@/assets/clickCardImgSld/BlueFrontSim.avif";
import BlueBackSim from "@/assets/clickCardImgSld/blueBackSim.avif";
import { Product } from "../types/product";

const baseProducts: Product[] = [
  {
    id: 1,
    name: "Dark Clouds - Custom Soccer Jersey For Men Sublimation FT060109S",
    oldPrice: 10068.79,
    newPrice: 8054.48,
    variants: [
      {
        color: "GREEN & BLACK",
        icon: imageFront,
        images: [imageFront, imageBack, whiteFrontSim, whiteBackSim],
      },
      {
        color: "Grey-Blue",
        icon: blueFront,
        images: [blueFront, blueBack, blueSimpleFront, blueSimpleBack],
      },
      {
        color: "Red",
        icon: redFront,
        images: [redFront, redBack, redFrontSim, redBackSim],
      },
    ],
  },
  {
    id: 2,
    name: "Premium Sports Shirt - Custom Soccer Jersey For Men Sublimation",
    oldPrice: 10128.79,
    newPrice: 8050.82,
    variants: [
      {
        color: "Red",
        icon: redFront,
        images: [redFront, redBack, redFrontSim, redBackSim],
      },
      {
        color: "Blue",
        icon: blueFrontTo,
        images: [blueFrontTo, blueBackTo, BlueFrontSim, BlueBackSim],
      },
    ],
  },
  {
    id: 3,
    name: "Elite Performance Jersey - Custom Soccer Jersey For Men Sublimation FT062033S",
    oldPrice: 9048.21,
    newPrice: 7044.38,
    variants: [
      {
        color: "Grey-Blue",
        icon: blueFront,
        images: [blueFront, blueBack, blueSimpleFront, blueSimpleBack],
      },
      {
        color: "Red",
        icon: redFront,
        images: [redFront, redBack, redFrontSim, redBackSim],
      },
      {
        color: "GREEN & BLACK",
        icon: imageFront,
        images: [imageFront, imageBack, whiteFrontSim, whiteBackSim],
      },
      {
        color: "Blue",
        icon: blueFrontTo,
        images: [blueFrontTo, blueBackTo, BlueFrontSim, BlueBackSim],
      },
    ],
  },
  {
    id: 4,
    name: "Classic Sports Kit - Custom Soccer Jersey For Men Sublimation FT030402S",
    oldPrice: 13198.48,
    newPrice: 11054.28,
    variants: [
      {
        color: "Blue",
        icon: blueFrontTo,
        images: [blueFrontTo, blueBackTo, BlueFrontSim, BlueBackSim],
      },
      {
        color: "GREEN & BLACK",
        icon: imageFront,
        images: [imageFront, imageBack, whiteFrontSim, whiteBackSim],
      },
    ],
  },
];

/**
 * Original ShirtData.js mein same 4 products 3 baar duplicate the
 * (ids 1-4, 100-103, 104-107) sirf "Show More" list bharne ke liye.
 * Abhi same behavior rakha hai taake UI match ho. Backend banate
 * waqt ye real MongoDB documents ban jayenge, duplicate fake data nahi.
 */
const shirtData: Product[] = [
  ...baseProducts,
  ...baseProducts.map((p) => ({ ...p, id: (p.id as number) + 99 })),
  ...baseProducts.map((p) => ({ ...p, id: (p.id as number) + 103 })),
];

export default shirtData;