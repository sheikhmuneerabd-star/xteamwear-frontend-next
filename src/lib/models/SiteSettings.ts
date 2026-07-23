import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IHeroSlide {
  imageDesktop: string;
  imageMobile: string;
}

export interface IAdvantage {
  image: string;
  title: string;
}

export interface ICard {
  badge?: string;
  category: string;
  title: string;
  image: string;
  link: string;
}

export interface IBespokeBanner {
  badge: string;
  heading: string;
  description: string;
  mainImage: string;
  buttonText: string;
  buttonLink: string;
  cards: ICard[];
}

export interface ICategoryShowcaseItem {
  id: string;
  title: string;
  itemCount: string;
  image: string;
  link: string;
  tag?: string;
}

export interface ISiteSettings extends Document {
  logo: string;
  heroSlides: IHeroSlide[];
  squadImages: string[];
  advantages: IAdvantage[];
  bespokeBanner?: IBespokeBanner;
  categoriesShowcase?: ICategoryShowcaseItem[];
}

// Schemas
const HeroSlideSchema = new Schema<IHeroSlide>(
  {
    imageDesktop: { type: String, default: "" },
    imageMobile: { type: String, default: "" },
  },
  { _id: false }
);

const AdvantageSchema = new Schema<IAdvantage>(
  {
    image: { type: String, default: "" },
    title: { type: String, default: "" },
  },
  { _id: false }
);

const CardSchema = new Schema<ICard>(
  {
    badge: { type: String, default: "" },
    category: { type: String, default: "" },
    title: { type: String, default: "" },
    image: { type: String, default: "" },
    link: { type: String, default: "/category/all" },
  },
  { _id: false }
);

const BespokeBannerSchema = new Schema<IBespokeBanner>(
  {
    badge: { type: String, default: "BESPOKE WEAR • 2026 RELEASE" },
    heading: { type: String, default: "" },
    description: { type: String, default: "" },
    mainImage: { type: String, default: "" },
    buttonText: { type: String, default: "EXPLORE FULL COLLECTION" },
    buttonLink: { type: String, default: "/category/all" },
    cards: { type: [CardSchema], default: [] },
  },
  { _id: false }
);

// FIX IS HERE: required: true hata kar default: "" kar diya hai taaki optional image fields save ho sakein
const CategoryShowcaseItemSchema = new Schema<ICategoryShowcaseItem>(
  {
    id: { type: String, default: "" },
    title: { type: String, default: "" },
    itemCount: { type: String, default: "0+ Products" },
    image: { type: String, default: "" }, // <-- REQUIRED REMOVED
    link: { type: String, default: "/category/all" },
    tag: { type: String, default: "" },
  },
  { _id: false }
);

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    logo: { type: String, default: "" },
    heroSlides: { type: [HeroSlideSchema], default: [] },
    squadImages: { type: [String], default: [] },
    advantages: { type: [AdvantageSchema], default: [] },
    bespokeBanner: { type: BespokeBannerSchema },
    categoriesShowcase: { type: [CategoryShowcaseItemSchema], default: [] },
  },
  { timestamps: true }
);

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;