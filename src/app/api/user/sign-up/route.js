import { generateToken, hashPassword, setUserAuthCookies } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON" },
        { status: 400 },
      );
    }
    const email = (body.email || "").trim().toLowerCase();
    const password = body.password || "";
    const firstName = body.firstName || "";
    const lastName = body.lastName || "";

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password is required" },
        { status: 400 },
      );
    }

    const existingEmail = await prisma.user.findUnique({ where: { email } });

    if (existingEmail) {
      return NextResponse.json(
        { success: false, message: "email is already exist" },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        password: hashedPassword,
      },
    });

    const token = generateToken(user.id);

    await setUserAuthCookies(token);

    return NextResponse.json(
      {
        success: true,
        message: "user created successfully",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    );
  }
}
