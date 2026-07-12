import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IProductVariant {
  color: string;
  icon: string;
  images: string[];
  sku: string;
  stock: number;
}

export interface IProduct extends Document {
  name: string;
  oldPrice: number;
  newPrice: number;
  category: string;
  subCategory?: string;
  available: boolean; // ab auto-calculated hota hai variants ke stock se
  variants: IProductVariant[];
  createdAt: Date;
}

const ProductVariantSchema = new Schema<IProductVariant>(
  {
    color: { type: String, required: true },
    icon: { type: String, required: true },
    images: { type: [String], required: true },
    sku: { type: String, required: true, trim: true, uppercase: true },
    stock: { type: Number, required: true, default: 0, min: 0 },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    oldPrice: { type: Number, required: true },
    newPrice: { type: Number, required: true },
    category: { type: String, required: true, trim: true },
    subCategory: { type: String, trim: true },
    available: { type: Boolean, default: true },
    variants: { type: [ProductVariantSchema], required: true },
  },
  { timestamps: true }
);

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;