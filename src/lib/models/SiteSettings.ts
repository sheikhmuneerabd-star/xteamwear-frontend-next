import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IHeroSlide {
  imageDesktop: string;
  imageMobile: string;
}

export interface IAdvantage {
  image: string;
  title: string;
}

export interface ISiteSettings extends Document {
  logo: string;
  heroSlides: IHeroSlide[];
  squadImages: string[];
  advantages: IAdvantage[];
}

const HeroSlideSchema = new Schema<IHeroSlide>(
  {
    imageDesktop: { type: String, required: true },
    imageMobile: { type: String, required: true },
  },
  { _id: false }
);

const AdvantageSchema = new Schema<IAdvantage>(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
  },
  { _id: false }
);

export interface ISocialPost {
  image: string;
  caption: string;
  link?: string;
}

const SiteSettingsSchema = new Schema<ISiteSettings>({
  logo: { type: String, default: "" },
  heroSlides: { type: [HeroSlideSchema], default: [] },
  squadImages: { type: [String], default: [] },
  advantages: { type: [AdvantageSchema], default: [] },
});

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings || mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;