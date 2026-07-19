import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IBespokeRequest extends Document {
  name: string;
  whatsapp: string;
  email: string;
  sports: string[];
  quantity: string;
  customizationType: string;
  teamColors: string[];
  details?: string;
  status: "new" | "contacted" | "quoted" | "closed";
  createdAt: Date;
}

const BespokeRequestSchema = new Schema<IBespokeRequest>(
  {
    name: { type: String, required: true, trim: true },
    whatsapp: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    sports: { type: [String], default: [] },
    quantity: { type: String, required: true },
    customizationType: { type: String, required: true },
    teamColors: { type: [String], default: [] },
    details: { type: String },
    status: { type: String, enum: ["new", "contacted", "quoted", "closed"], default: "new" },
  },
  { timestamps: true }
);

const BespokeRequest: Model<IBespokeRequest> =
  mongoose.models.BespokeRequest || mongoose.model<IBespokeRequest>("BespokeRequest", BespokeRequestSchema);

export default BespokeRequest;