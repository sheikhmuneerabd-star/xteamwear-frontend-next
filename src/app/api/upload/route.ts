import { NextResponse } from "next/server";
import { auth } from "@/auth";

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// Cloudinary "signed upload" ke liye zaroori signature banata hai
async function generateSignature(params: Record<string, string>): Promise<string> {
  const crypto = await import("crypto");
  const sortedKeys = Object.keys(params).sort();
  const paramString = sortedKeys.map((key) => `${key}=${params[key]}`).join("&");
  const toSign = `${paramString}${CLOUDINARY_API_SECRET}`;
  return crypto.createHash("sha1").update(toSign).digest("hex");
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      return NextResponse.json({ error: "Cloudinary is not configured" }, { status: 500 });
    }

    const incomingFormData = await request.formData();
    const file = incomingFormData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = "xteamwear/products";

    const signature = await generateSignature({ folder, timestamp });

    const cloudinaryForm = new FormData();
    cloudinaryForm.append("file", file);
    cloudinaryForm.append("api_key", CLOUDINARY_API_KEY);
    cloudinaryForm.append("timestamp", timestamp);
    cloudinaryForm.append("folder", folder);
    cloudinaryForm.append("signature", signature);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: cloudinaryForm,
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Cloudinary error:", data);
      return NextResponse.json({ error: data.error?.message || "Upload failed" }, { status: 500 });
    }

    return NextResponse.json({ url: data.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}