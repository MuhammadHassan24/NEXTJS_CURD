import { getUserIdFromCookie } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const userId = await getUserIdFromCookie();
    if (!userId) {
      NextResponse.json(
        { success: false, message: "UnAuthorized" },
        { status: 401 },
      );
    }

    
  } catch (error) {
    console.error("Post create error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
