import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { UserRole } from "@/lib/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable in .env.local");
}

export interface TokenPayload {
  userId: string;
  role: UserRole;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET as string) as TokenPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(plain: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

export async function comparePassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}