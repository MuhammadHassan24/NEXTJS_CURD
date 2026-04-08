import { NextResponse } from "next/server";
import { ENV, USER_COOKIES } from "@/constant/misc";

export async function POST() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set(USER_COOKIES, "", {
    sameSite: "lax",
    secure: ENV.NODE_ENV === "production" ? true : false,
    path: "/",
    maxAge: 0,
  });

  return res;
}
