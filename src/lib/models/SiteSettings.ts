import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IHeroSlide {
  imageDesktop: string;
  imageTablet: string;
  imageMobile: string;
}

export interface IAdvantage {
  image: string;
  title: string;
}

export interface ICategoryShowcaseItem {
  id: string;
  title: string;
  itemCount: string;
  image: string;
  link: string;
  tag?: string;
}

export interface IShippingConfig {
  freeShippingThreshold: number;
  standardShippingFee: number;
}

export interface ISiteSettings extends Document {
  logo: string;
  heroSlides: IHeroSlide[];
  squadImages: string[];
  advantages: IAdvantage[];
  trendingTags?: string[];
  categoriesShowcase?: ICategoryShowcaseItem[];
  shippingConfig?: IShippingConfig;
  packageBanners?: IPackageBanner[];
  promoBanners?: IPromoBanners;
}

export interface IPackageBanner {
  title: string;
  imageDesktop: string;
  imageTablet: string;
  imageMobile: string;
}

export interface IPromoMainBanner {
  title: string;
  highlight: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  imageMobile: string; // sirf mobile ke liye
}

export interface IPromoBottomBanner {
  badge: string;
  title: string;
  tags: string[];
  imageMobile: string; // sirf mobile ke liye
}

export interface IPromoBanners {
  mainBanner: IPromoMainBanner;
  bottomBanner: IPromoBottomBanner;
}

const PackageBannerSchema = new Schema<IPackageBanner>(
  {
    title: { type: String, default: "" },
    imageDesktop: { type: String, default: "" },
    imageTablet: { type: String, default: "" },
    imageMobile: { type: String, default: "" },
  },
  { _id: false }
);

const PromoMainBannerSchema = new Schema<IPromoMainBanner>(
  {
    title: { type: String, default: "ORDER ONLINE" },
    highlight: { type: String, default: "EASILY." },
    features: {
      type: [String],
      default: [
        "Instant Quote Tool",
        "Automated Ordering",
        "Create Your Package",
        "Free Custom Designs",
        "Add Team Rosters",
        "Run Your Fan Shop",
      ],
    },
    buttonText: { type: String, default: "START CUSTOM ORDER" },
    buttonLink: { type: String, default: "/custom-order" },
    imageMobile: { type: String, default: "" },
  },
  { _id: false }
);

const PromoBottomBannerSchema = new Schema<IPromoBottomBanner>(
  {
    badge: { type: String, default: "EXCLUSIVE FOR" },
    title: { type: String, default: "Schools & Non-Profits Discount" },
    tags: {
      type: [String],
      default: ["Schools", "Colleges", "High Schools", "Non-Profit Organizations"],
    },
    imageMobile: { type: String, default: "" },
  },
  { _id: false }
);

const PromoBannersSchema = new Schema<IPromoBanners>(
  {
    mainBanner: { type: PromoMainBannerSchema, default: () => ({}) },
    bottomBanner: { type: PromoBottomBannerSchema, default: () => ({}) },
  },
  { _id: false }
);

// Schemas
const HeroSlideSchema = new Schema<IHeroSlide>(
  {
    imageDesktop: { type: String, default: "" },
    imageTablet: { type: String, default: "" },
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

const CategoryShowcaseItemSchema = new Schema<ICategoryShowcaseItem>(
  {
    id: { type: String, default: "" },
    title: { type: String, default: "" },
    itemCount: { type: String, default: "0+ Products" },
    image: { type: String, default: "" },
    link: { type: String, default: "/category/all" },
    tag: { type: String, default: "" },
  },
  { _id: false }
);

const ShippingConfigSchema = new Schema<IShippingConfig>(
  {
    freeShippingThreshold: { type: Number, default: 150 },
    standardShippingFee: { type: Number, default: 15 },
  },
  { _id: false }
);

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    logo: { type: String, default: "" },
    heroSlides: { type: [HeroSlideSchema], default: [] },
    squadImages: { type: [String], default: [] },
    advantages: { type: [AdvantageSchema], default: [] },
    trendingTags: { type: [String], default: [] },
    categoriesShowcase: { type: [CategoryShowcaseItemSchema], default: [] },
    shippingConfig: {
      type: ShippingConfigSchema,
      default: { freeShippingThreshold: 150, standardShippingFee: 15 },
    },
    packageBanners: { type: [PackageBannerSchema], default: [] },
    promoBanners: { type: PromoBannersSchema, default: () => ({}) },
  },
  { timestamps: true }
);

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;