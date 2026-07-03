import type { Product } from "@/types/product";

// Football
import lightBlue1Front from "@/assets/categoryCardImg/lightBlue1Front.avif";
import blackYellow1Back from "@/assets/categoryCardImg/blackYellow1Back.avif";
import lightBlue1Sim from "@/assets/categoryCardImg/lightBlue1Sim.avif";
import whiteBlack1Sim from "@/assets/categoryCardImg/whiteBlack1Sim.avif";

import blackWhite2Front from "@/assets/categoryCardImg/blackWhite2Front.avif";
import purpleWhite2Back from "@/assets/categoryCardImg/purpleWhite2Back.avif";
import blueWhite2Sim from "@/assets/categoryCardImg/blueWhite2Sim.avif";
import BlackWhite2ThreeSim from "@/assets/categoryCardImg/BlackWhite2ThreeSim.avif";
import blueWhiteThree2Sim from "@/assets/categoryCardImg/blueWhiteThree2Sim.avif";
import purpleWhiteThree2Sim from "@/assets/categoryCardImg/purpleWhiteThree2Sim.avif";

import purpleYellow3Front from "@/assets/categoryCardImg/purpleYellow3Front.avif";
import lightGray3Back from "@/assets/categoryCardImg/lightGray3Back.avif";
import GreenThree3Sim from "@/assets/categoryCardImg/GreenThree3Sim.avif";
import lightGrayThree3Sim from "@/assets/categoryCardImg/lightGrayThree3Sim.avif";
import greenWhite3Sim from "@/assets/categoryCardImg/greenWhite3Sim.avif";
import purpleThree3Sim from "@/assets/categoryCardImg/purpleThree3Sim.avif";

// Basketball
import purpleFront1 from "@/assets/basketball/purpleFront1.avif";
import purpleBack1 from "@/assets/basketball/purpleBack1.avif";
import purpleFront1Sim from "@/assets/basketball/purpleFront1Sim.avif";
import purpleBack1Sim from "@/assets/basketball/purpleBack1Sim.avif";

import blueFront2 from "@/assets/basketball/blueFront2.avif";
import blueBack2 from "@/assets/basketball/blueBack2.avif";
import blueFront2Sim from "@/assets/basketball/blueFront2Sim.avif";
import blueBack2Sim from "@/assets/basketball/blueBack2Sim.avif";

import comandoFront3 from "@/assets/basketball/comandoFront3.avif";
import comandoBack3 from "@/assets/basketball/comandoBack3.avif";
import comandoFront3Sim from "@/assets/basketball/comandoFront3Sim.avif";
import comandoBack3Sim from "@/assets/basketball/comandoBack3Sim.avif";

// Baseball
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

const categoryCardImg: Product[] = [
  // Football
  {
    id: 17,
    name: "Dark Clouds - Custom Soccer Jersey For Men Sublimation FT060109S",
    oldPrice: 3068.79,
    newPrice: 2054.48,
    category: "Football",
    available: true,
    variants: [
      { color: "lightBlue", icon: lightBlue1Front, images: [lightBlue1Front, blackYellow1Back, lightBlue1Sim, whiteBlack1Sim] },
      { color: "blackWhiteIcon", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 18,
    name: "Premium Sports Shirt - Custom Soccer Jersey For Men Sublimation",
    oldPrice: 4068.79,
    newPrice: 3054.48,
    category: "Football",
    available: false,
    variants: [
      { color: "blackWhite", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 19,
    name: "Elite Performance Jersey - Custom Soccer Jersey For Men Sublimation FT062033S",
    oldPrice: 17068.79,
    newPrice: 13054.48,
    category: "Football",
    available: true,
    variants: [
      { color: "purpleYellow", icon: purpleYellow3Front, images: [purpleYellow3Front, lightGray3Back, GreenThree3Sim, lightGrayThree3Sim, greenWhite3Sim, purpleThree3Sim] },
      { color: "lightBlue", icon: lightBlue1Front, images: [lightBlue1Front, blackYellow1Back, lightBlue1Sim, whiteBlack1Sim] },
      { color: "blackWhiteIcon3", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 20,
    name: "Dark Clouds - Custom Soccer Jersey For Men Sublimation FT060109S",
    oldPrice: 3068.79,
    newPrice: 2054.48,
    category: "Football",
    available: true,
    variants: [
      { color: "lightBlue", icon: lightBlue1Front, images: [lightBlue1Front, blackYellow1Back, lightBlue1Sim, whiteBlack1Sim] },
      { color: "blackWhiteIcon", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 21,
    name: "Premium Sports Shirt - Custom Soccer Jersey For Men Sublimation",
    oldPrice: 4068.79,
    newPrice: 3054.48,
    category: "Football",
    available: false,
    variants: [
      { color: "blackWhite", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 22,
    name: "Elite Performance Jersey - Custom Soccer Jersey For Men Sublimation FT062033S",
    oldPrice: 17068.79,
    newPrice: 13054.48,
    category: "Football",
    available: true,
    variants: [
      { color: "purpleYellow", icon: purpleYellow3Front, images: [purpleYellow3Front, lightGray3Back, GreenThree3Sim, lightGrayThree3Sim, greenWhite3Sim, purpleThree3Sim] },
      { color: "lightBlue", icon: lightBlue1Front, images: [lightBlue1Front, blackYellow1Back, lightBlue1Sim, whiteBlack1Sim] },
      { color: "blackWhiteIcon3", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 23,
    name: "Dark Clouds - Custom Soccer Jersey For Men Sublimation FT060109S",
    oldPrice: 3068.79,
    newPrice: 2054.48,
    category: "Football",
    available: true,
    variants: [
      { color: "lightBlue", icon: lightBlue1Front, images: [lightBlue1Front, blackYellow1Back, lightBlue1Sim, whiteBlack1Sim] },
      { color: "blackWhiteIcon", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 24,
    name: "Premium Sports Shirt - Custom Soccer Jersey For Men Sublimation",
    oldPrice: 4068.79,
    newPrice: 3054.48,
    category: "Football",
    available: true,
    variants: [
      { color: "blackWhite", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 25,
    name: "Elite Performance Jersey - Custom Soccer Jersey For Men Sublimation FT062033S",
    oldPrice: 17068.79,
    newPrice: 13054.48,
    category: "Football",
    available: false,
    variants: [
      { color: "purpleYellow", icon: purpleYellow3Front, images: [purpleYellow3Front, lightGray3Back, GreenThree3Sim, lightGrayThree3Sim, greenWhite3Sim, purpleThree3Sim] },
      { color: "lightBlue", icon: lightBlue1Front, images: [lightBlue1Front, blackYellow1Back, lightBlue1Sim, whiteBlack1Sim] },
      { color: "blackWhiteIcon3", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 26,
    name: "Dark Clouds - Custom Soccer Jersey For Men Sublimation FT060109S",
    oldPrice: 3068.79,
    newPrice: 2054.48,
    category: "Football",
    available: true,
    variants: [
      { color: "lightBlue", icon: lightBlue1Front, images: [lightBlue1Front, blackYellow1Back, lightBlue1Sim, whiteBlack1Sim] },
      { color: "blackWhiteIcon", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 27,
    name: "Premium Sports Shirt - Custom Soccer Jersey For Men Sublimation",
    oldPrice: 4068.79,
    newPrice: 3054.48,
    category: "Football",
    available: false,
    variants: [
      { color: "blackWhite", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },

  // Basketball
  {
    id: 28,
    name: "Dark Clouds - Custom Soccer Jersey For Men Sublimation FT060109S",
    oldPrice: 3068.79,
    newPrice: 2054.48,
    category: "Basketball",
    variants: [
      { color: "bPurple", icon: purpleFront1, images: [purpleFront1, purpleBack1, purpleFront1Sim, purpleBack1Sim] },
      { color: "basketBlue", icon: blueFront2, images: [blueFront2, blueBack2, blueFront2Sim, blueBack2Sim] },
    ],
  },
  {
    id: 29,
    name: "Premium Sports Shirt - Custom Soccer Jersey For Men Sublimation",
    oldPrice: 4068.79,
    newPrice: 3054.48,
    category: "Basketball",
    variants: [
      { color: "comando", icon: comandoFront3, images: [comandoFront3, comandoBack3, comandoFront3Sim, comandoBack3Sim] },
    ],
  },
  {
    id: 30,
    name: "Elite Performance Jersey - Custom Soccer Jersey For Men Sublimation FT062033S",
    oldPrice: 17068.79,
    newPrice: 13054.48,
    category: "Basketball",
    variants: [
      { color: "Basketblue2", icon: blueFront2, images: [blueFront2, blueBack2, blueFront2Sim, blueBack2Sim] },
      { color: "purple2", icon: purpleFront1, images: [purpleFront1, purpleBack1, purpleFront1Sim, purpleBack1Sim] },
      { color: "commando", icon: comandoFront3, images: [comandoFront3, comandoBack3, comandoFront3Sim, comandoBack3Sim] },
    ],
  },

  // Baseball
  {
    id: 31,
    name: "Dark Clouds - Custom Soccer Jersey For Men Sublimation FT060109S",
    oldPrice: 3068.79,
    newPrice: 2054.48,
    category: "Baseball",
    variants: [
      { color: "whiteBlue1", icon: whiteBlueFront1, images: [whiteBlueFront1, whiteBlueBack1, whiteBlueFront1Sim, whiteBlueBack1Sim] },
      { color: "yellow1", icon: yellowFront1, images: [yellowFront1, yellowBack1, yellowFront1Sim, yellowBack1Sim] },
    ],
  },
  {
    id: 32,
    name: "Premium Sports Shirt - Custom Soccer Jersey For Men Sublimation",
    oldPrice: 4068.79,
    newPrice: 3054.48,
    category: "Baseball",
    variants: [
      { color: "whiteBlack4", icon: whiteBlackFront1, images: [whiteBlackFront1, whiteBlackBack1, whiteBlackFront1Sim, whiteBlackBack1Sim] },
    ],
  },
  {
    id: 33,
    name: "Elite Performance Jersey - Custom Soccer Jersey For Men Sublimation FT062033S",
    oldPrice: 17068.79,
    newPrice: 13054.48,
    category: "Baseball",
    variants: [
      { color: "yellow2", icon: yellowFront1, images: [yellowFront1, yellowBack1, yellowFront1Sim, yellowBack1Sim] },
      { color: "whiteBlue4", icon: whiteBlueFront1, images: [whiteBlueFront1, whiteBlueBack1, whiteBlueFront1Sim, whiteBlueBack1Sim] },
      { color: "whiteBlack3", icon: whiteBlackFront1, images: [whiteBlackFront1, whiteBlackBack1, whiteBlackFront1Sim, whiteBlackBack1Sim] },
    ],
  },

  // Uncategorized (ids 34-50) — no category field in original
  {
    id: 34,
    name: "Dark Clouds - Custom Soccer Jersey For Men Sublimation FT060109S",
    oldPrice: 3068.79,
    newPrice: 2054.48,
    variants: [
      { color: "lightBlue", icon: lightBlue1Front, images: [lightBlue1Front, blackYellow1Back, lightBlue1Sim, whiteBlack1Sim] },
      { color: "blackWhiteIcon", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 35,
    name: "Premium Sports Shirt - Custom Soccer Jersey For Men Sublimation",
    oldPrice: 4068.79,
    newPrice: 3054.48,
    variants: [
      { color: "blackWhite", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 36,
    name: "Elite Performance Jersey - Custom Soccer Jersey For Men Sublimation FT062033S",
    oldPrice: 17068.79,
    newPrice: 13054.48,
    variants: [
      { color: "purpleYellow", icon: purpleYellow3Front, images: [purpleYellow3Front, lightGray3Back, GreenThree3Sim, lightGrayThree3Sim, greenWhite3Sim, purpleThree3Sim] },
      { color: "lightBlue", icon: lightBlue1Front, images: [lightBlue1Front, blackYellow1Back, lightBlue1Sim, whiteBlack1Sim] },
      { color: "blackWhiteIcon3", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 37,
    name: "Dark Clouds - Custom Soccer Jersey For Men Sublimation FT060109S",
    oldPrice: 3068.79,
    newPrice: 2054.48,
    variants: [
      { color: "lightBlue", icon: lightBlue1Front, images: [lightBlue1Front, blackYellow1Back, lightBlue1Sim, whiteBlack1Sim] },
      { color: "blackWhiteIcon", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 38,
    name: "Premium Sports Shirt - Custom Soccer Jersey For Men Sublimation",
    oldPrice: 4068.79,
    newPrice: 3054.48,
    variants: [
      { color: "blackWhite", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 39,
    name: "Elite Performance Jersey - Custom Soccer Jersey For Men Sublimation FT062033S",
    oldPrice: 17068.79,
    newPrice: 13054.48,
    variants: [
      { color: "purpleYellow", icon: purpleYellow3Front, images: [purpleYellow3Front, lightGray3Back, GreenThree3Sim, lightGrayThree3Sim, greenWhite3Sim, purpleThree3Sim] },
      { color: "lightBlue", icon: lightBlue1Front, images: [lightBlue1Front, blackYellow1Back, lightBlue1Sim, whiteBlack1Sim] },
      { color: "blackWhiteIcon3", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 40,
    name: "Dark Clouds - Custom Soccer Jersey For Men Sublimation FT060109S",
    oldPrice: 3068.79,
    newPrice: 2054.48,
    variants: [
      { color: "lightBlue", icon: lightBlue1Front, images: [lightBlue1Front, blackYellow1Back, lightBlue1Sim, whiteBlack1Sim] },
      { color: "blackWhiteIcon", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 41,
    name: "Premium Sports Shirt - Custom Soccer Jersey For Men Sublimation",
    oldPrice: 4068.79,
    newPrice: 3054.48,
    variants: [
      { color: "blackWhite", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 42,
    name: "Elite Performance Jersey - Custom Soccer Jersey For Men Sublimation FT062033S",
    oldPrice: 17068.79,
    newPrice: 13054.48,
    variants: [
      { color: "purpleYellow", icon: purpleYellow3Front, images: [purpleYellow3Front, lightGray3Back, GreenThree3Sim, lightGrayThree3Sim, greenWhite3Sim, purpleThree3Sim] },
      { color: "lightBlue", icon: lightBlue1Front, images: [lightBlue1Front, blackYellow1Back, lightBlue1Sim, whiteBlack1Sim] },
      { color: "blackWhiteIcon3", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 43,
    name: "Dark Clouds - Custom Soccer Jersey For Men Sublimation FT060109S",
    oldPrice: 3068.79,
    newPrice: 2054.48,
    variants: [
      { color: "lightBlue", icon: lightBlue1Front, images: [lightBlue1Front, blackYellow1Back, lightBlue1Sim, whiteBlack1Sim] },
      { color: "blackWhiteIcon", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 44,
    name: "Premium Sports Shirt - Custom Soccer Jersey For Men Sublimation",
    oldPrice: 4068.79,
    newPrice: 3054.48,
    variants: [
      { color: "blackWhite", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 45,
    name: "Elite Performance Jersey - Custom Soccer Jersey For Men Sublimation FT062033S",
    oldPrice: 17068.79,
    newPrice: 13054.48,
    variants: [
      { color: "purpleYellow", icon: purpleYellow3Front, images: [purpleYellow3Front, lightGray3Back, GreenThree3Sim, lightGrayThree3Sim, greenWhite3Sim, purpleThree3Sim] },
      { color: "lightBlue", icon: lightBlue1Front, images: [lightBlue1Front, blackYellow1Back, lightBlue1Sim, whiteBlack1Sim] },
      { color: "blackWhiteIcon3", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 46,
    name: "Dark Clouds - Custom Soccer Jersey For Men Sublimation FT060109S",
    oldPrice: 3068.79,
    newPrice: 2054.48,
    variants: [
      { color: "lightBlue", icon: lightBlue1Front, images: [lightBlue1Front, blackYellow1Back, lightBlue1Sim, whiteBlack1Sim] },
      { color: "blackWhiteIcon", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 47,
    name: "Premium Sports Shirt - Custom Soccer Jersey For Men Sublimation",
    oldPrice: 4068.79,
    newPrice: 3054.48,
    variants: [
      { color: "blackWhite", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 48,
    name: "Elite Performance Jersey - Custom Soccer Jersey For Men Sublimation FT062033S",
    oldPrice: 17068.79,
    newPrice: 13054.48,
    variants: [
      { color: "purpleYellow", icon: purpleYellow3Front, images: [purpleYellow3Front, lightGray3Back, GreenThree3Sim, lightGrayThree3Sim, greenWhite3Sim, purpleThree3Sim] },
      { color: "lightBlue", icon: lightBlue1Front, images: [lightBlue1Front, blackYellow1Back, lightBlue1Sim, whiteBlack1Sim] },
      { color: "blackWhiteIcon3", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 49,
    name: "Dark Clouds - Custom Soccer Jersey For Men Sublimation FT060109S",
    oldPrice: 3068.79,
    newPrice: 2054.48,
    variants: [
      { color: "lightBlue", icon: lightBlue1Front, images: [lightBlue1Front, blackYellow1Back, lightBlue1Sim, whiteBlack1Sim] },
      { color: "blackWhiteIcon", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
  {
    id: 50,
    name: "Premium Sports Shirt - Custom Soccer Jersey For Men Sublimation",
    oldPrice: 4068.79,
    newPrice: 3054.48,
    variants: [
      { color: "blackWhite", icon: blackWhite2Front, images: [blackWhite2Front, purpleWhite2Back, blueWhite2Sim, BlackWhite2ThreeSim, blueWhiteThree2Sim, purpleWhiteThree2Sim] },
    ],
  },
];

export default categoryCardImg;