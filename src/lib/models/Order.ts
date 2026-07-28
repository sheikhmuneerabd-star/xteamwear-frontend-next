import mongoose, { Schema, Document } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        color: { type: String, required: true },
        sku: { type: String, default: "N/A" },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        sizingDetailData: { type: Schema.Types.Mixed, default: null },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentMethod: { type: String, default: "cod" },
    paymentStatus: { type: String, default: "pending" },
    paymentId: { type: String, default: null },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);