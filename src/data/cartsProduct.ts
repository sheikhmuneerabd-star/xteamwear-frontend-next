import type { Product } from "@/types/product";

import blueWhiteFront1 from "@/assets/cartsImg/blueWhiteFront1.avif";
import blueWhiteFront from "@/assets/cartsImg/blueWhiteFront.avif";
import blackWhiteBack1 from "@/assets/cartsImg/blackWhiteBack1.avif";
import purpleSimFront1 from "@/assets/cartsImg/purpleSimFront1.avif";
import red1SimBack from "@/assets/cartsImg/red1SimBack.avif";

import man2 from "@/assets/cartsImg/man2.avif";
import blue2Front from "@/assets/cartsImg/blue2Front.avif";
import blue2Back from "@/assets/cartsImg/blue2Back.avif";
import blue2SimFront from "@/assets/cartsImg/blue2SimFront.avif";
import blue2SimBack from "@/assets/cartsImg/blue2SimBack.avif";

import brown3Front from "@/assets/cartsImg/brown3Front.avif";
import purple3Back from "@/assets/cartsImg/purple3Back.avif";
import black3SimFront from "@/assets/cartsImg/black3SimFront.avif";
import brown3SimBack from "@/assets/cartsImg/brown3SimBack.avif";
import purple3SimSecond from "@/assets/cartsImg/purple3SimSecond.avif";
import blackSim3Third from "@/assets/cartsImg/blackSim3Third.avif";

import yellow4Front from "@/assets/cartsImg/yellow4Front.avif";
import red4Back from "@/assets/cartsImg/red4Back.avif";
import green4SimFront from "@/assets/cartsImg/green4SimFront.avif";
import yellow4SimBack from "@/assets/cartsImg/yellow4SimBack.avif";
import green4SimSecond from "@/assets/cartsImg/green4SimSecond.avif";
import red4SimThird from "@/assets/cartsImg/red4SimThird.avif";

const cartsProduct: Product[] = [
  {
    id: 60,
    name: "Flame - Custom Soccer Jersey For Men Sublimation FT060109S",
    oldPrice: 12068.79,
    newPrice: 8054.48,
    variants: [
      { color: "blueWhite", icon: blueWhiteFront1, images: [blueWhiteFront1, blueWhiteFront, blackWhiteBack1, purpleSimFront1, red1SimBack] },
    ],
  },
  {
    id: 51,
    name: "Map - Custom Soccer Jersey For Men Sublimation FT060110S",
    oldPrice: 10128.79,
    newPrice: 8050.82,
    variants: [
      { color: "blue", icon: man2, images: [man2, blue2Front, blue2Back, blue2SimFront, blue2SimBack] },
    ],
  },
  {
    id: 52,
    name: "Fashion Performance Jersey - Custom Soccer Jersey For Men Sublimation FT062033S",
    oldPrice: 12048.21,
    newPrice: 8044.38,
    variants: [
      { color: "brown", icon: brown3Front, images: [brown3Front, purple3Back, black3SimFront, brown3SimBack, purple3SimSecond, blackSim3Third] },
    ],
  },
  {
    id: 53,
    name: "Aura - Custom Soccer Jersey For Men Sublimation FT030402S",
    oldPrice: 13198.48,
    newPrice: 11054.28,
    variants: [
      { color: "Black", icon: yellow4Front, images: [yellow4Front, red4Back, green4SimFront, yellow4SimBack, green4SimSecond, red4SimThird] },
      { color: "brown", icon: brown3Front, images: [brown3Front, purple3Back, black3SimFront, brown3SimBack, purple3SimSecond, blackSim3Third] },
    ],
  },
  {
    id: 54,
    name: "Flame - Custom Soccer Jersey For Men Sublimation FT060109S",
    oldPrice: 12068.79,
    newPrice: 8054.48,
    variants: [
      { color: "blueWhite", icon: blueWhiteFront1, images: [blueWhiteFront1, blueWhiteFront, blackWhiteBack1, purpleSimFront1, red1SimBack] },
    ],
  },
  {
    id: 55,
    name: "Map - Custom Soccer Jersey For Men Sublimation FT060110S",
    oldPrice: 10128.79,
    newPrice: 8050.82,
    variants: [
      { color: "blue", icon: man2, images: [man2, blue2Front, blue2Back, blue2SimFront, blue2SimBack] },
    ],
  },
  {
    id: 56,
    name: "Fashion Performance Jersey - Custom Soccer Jersey For Men Sublimation FT062033S",
    oldPrice: 12048.21,
    newPrice: 8044.38,
    variants: [
      { color: "brown", icon: brown3Front, images: [brown3Front, purple3Back, black3SimFront, brown3SimBack, purple3SimSecond, blackSim3Third] },
    ],
  },
  {
    id: 57,
    name: "Aura - Custom Soccer Jersey For Men Sublimation FT030402S",
    oldPrice: 13198.48,
    newPrice: 11054.28,
    variants: [
      { color: "Black", icon: yellow4Front, images: [yellow4Front, red4Back, green4SimFront, yellow4SimBack, green4SimSecond, red4SimThird] },
      { color: "brown", icon: brown3Front, images: [brown3Front, purple3Back, black3SimFront, brown3SimBack, purple3SimSecond, blackSim3Third] },
    ],
  },
];

export default cartsProduct;