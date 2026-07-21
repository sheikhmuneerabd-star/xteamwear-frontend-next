import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ISubcategory {
  name: string;
  items: string[];
}

export interface ICategory extends Document {
  name: string;
  subcategories: ISubcategory[];
  order: number;
  createdAt: Date;
}

const SubcategorySchema = new Schema<ISubcategory>(
  {
    name: { type: String, required: true, trim: true },
    items: { type: [String], default: [] },
  },
  { _id: false }
);

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    subcategories: { type: [SubcategorySchema], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);

export default Category;