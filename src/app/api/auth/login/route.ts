import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-here"
);

async function generateJWT(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10d")
    .sign(JWT_SECRET);
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: 401,
          message: "Invalid Email or password",
        },
        { status: 401 }
      );
    }

    if (user.password) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          {
            status: 401,
            message: "Invalid Email or Password",
          },
          { status: 401 }
        );
      }
    }

    const token = await generateJWT({
      id: user.id,
      email: user.email,
    });

    // Create response first
    const response = NextResponse.json({
      status: 200,
      message: "Logged In Successfully",
      data: {
        email: user.email,
        username: user.name,
        id: user.id,
      },
    });

    // Set cookie on the response
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 10, // 10 days to match JWT expiration
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        status: 500,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
