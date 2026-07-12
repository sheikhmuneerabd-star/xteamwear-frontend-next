import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // File ko base64 mein convert karein taake Cloudinary SDK ko bhej sakein
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "xteamwear/products",
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload error (full):", JSON.stringify(error, null, 2));
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}