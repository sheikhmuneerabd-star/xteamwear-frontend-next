import mongoose, { Schema, type Document, type Model } from "mongoose";

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface IOrderItem {
  productId: string;
  name: string;
  color: string;
  sku: string;
  price: number;
  qty: number;
  image: string;
  sizingDetailData?: {
    teamName?: string;
    playerNumberOption?: string;
    sponsorOption?: string;
    sponsorLocation?: string;
    note?: string;
    players?: { size: string; name: string; number: string }[];
  };
}

export interface IShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IOrder extends Document {
  userId?: string; // guest checkout allow karne ke liye optional
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  subtotal: number;
  total: number;
  status: OrderStatus;
  notes?: string;
  createdAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String, required: true },
    sku: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, min: 1 },
    image: { type: String, required: true },
    sizingDetailData: {
      teamName: String,
      playerNumberOption: String,
      sponsorOption: String,
      sponsorLocation: String,
      note: String,
      players: [{ size: String, name: String, number: String }],
    },
  },
  { _id: false }
);

const ShippingAddressSchema = new Schema<IShippingAddress>(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String },
    items: { type: [OrderItemSchema], required: true },
    shippingAddress: { type: ShippingAddressSchema, required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: ["pending", "processing", "shipped", "delivered", "cancelled"], default: "pending" },
    notes: { type: String },
  },
  { timestamps: true }
);

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;