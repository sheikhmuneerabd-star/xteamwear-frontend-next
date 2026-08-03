import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Prevent memory wiped during Next.js Hot Reloads
const globalForOtp = global as unknown as { otpStore?: Map<string, { code: string; expires: number }> };
export const otpStore = globalForOtp.otpStore || new Map<string, { code: string; expires: number }>();
if (process.env.NODE_ENV !== "production") globalForOtp.otpStore = otpStore;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store with 5 minute expiry
    otpStore.set(cleanEmail, {
      code: otpCode,
      expires: Date.now() + 5 * 60 * 1000,
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"XTeamWear Auth" <${process.env.SMTP_USER}>`,
      to: cleanEmail,
      subject: `${otpCode} is your XTeamWear Verification Code`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #111;">
          <h2>Verification Code</h2>
          <p>Your one-time login code for XTeamWear is:</p>
          <h1 style="font-size: 32px; letter-spacing: 5px; color: #f59e0b;">${otpCode}</h1>
          <p>This code will expire in 5 minutes.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("OTP Send Error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}