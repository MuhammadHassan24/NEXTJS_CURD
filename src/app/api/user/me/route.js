import { getUserIdFromCookie, removeUserAuthCookies } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = await getUserIdFromCookie();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "UnAuthorized" },
        { status: 401 },
      );
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        posts: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error("During Get usre error:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req) {
  try {
    const userId = await getUserIdFromCookie();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "UnAuthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { email, firstName, lastName } = body;

    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: { email, firstName, lastName },
    });

    return NextResponse.json(
      { success: true, data: updateUser },
      { status: 200 },
    );
  } catch (error) {
    console.error("PATCH user error:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    const userId = await getUserIdFromCookie();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    // Check if user exists before deleting
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // Delete user (posts cascade-delete automatically)
    await prisma.user.delete({
      where: { id: userId },
    });

    // Clear authentication cookie
    await removeUserAuthCookies();

    return NextResponse.json(
      { success: true, message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE user error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete user account" },
      { status: 500 },
    );
  }
}
