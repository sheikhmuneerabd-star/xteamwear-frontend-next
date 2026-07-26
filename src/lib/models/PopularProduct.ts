import mongoose, { Schema } from "mongoose";

const PopularProductSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product", // Apne main Product model ka naam
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PopularProduct ||
  mongoose.model("PopularProduct", PopularProductSchema);