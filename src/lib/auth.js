import "server-only";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { ENV, USER_COOKIES } from "@/constant/misc"; // set JWT_SECRET & JWT_EXPIRES_IN in ENV

// Hash password
export function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

// Verify password
export function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// Generate JWT
export function generateToken(userId) {
  if (!ENV.JWT_SECRET) throw new Error("JWT_SECRET is not set");
  return jwt.sign({ sub: userId, role: "user" }, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN || "7d",
  });
}

// Verify JWT
export function verifyToken(token) {
  if (!ENV.JWT_SECRET) throw new Error("JWT_SECRET is not set");
  return jwt.verify(token, ENV.JWT_SECRET);
}

// Set JWT in cookie
export async function setUserAuthCookies(token) {
  const cookieStore = await cookies();

  // Decode token to get expiration time
  let maxAge = 7 * 24 * 60 * 60; // default 7 days in seconds
  try {
    const decoded = jwt.decode(token);
    if (decoded?.exp) {
      // Calculate maxAge from token expiration
      maxAge = Math.floor(decoded.exp - Date.now() / 1000);
    }
  } catch (error) {
    console.warn("Could not decode token for maxAge", error);
  }

  cookieStore.set(USER_COOKIES, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: maxAge > 0 ? maxAge : 7 * 24 * 60 * 60,
  });
}

// Remove cookie
export async function removeUserAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(USER_COOKIES);
}

export async function getUserIdFromCookie() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(USER_COOKIES)?.value;

    if (!token) return null;

    const decoded = verifyToken(token);

    return decoded?.sub;
  } catch (error) {
    return null;
  }
}
