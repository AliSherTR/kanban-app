import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-here"
);

export async function PATCH(req: NextRequest) {
  const { email, password, confirmPassword, token } = await req.json();

  if (!token) {
    return NextResponse.json(
      {
        status: 400,
        message: "No Token Provided",
      },
      { status: 400 }
    );
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (payload.email !== email) {
      return NextResponse.json(
        {
          status: 401,
          message: "The request is invalid",
        },
        { status: 401 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 401,
        message: "Invalid or Expired Token",
        error: error.message,
      },
      { status: 401 }
    );
  }

  if (!password || !confirmPassword) {
    return NextResponse.json(
      {
        status: 400,
        message: "Invalid Request",
      },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      {
        status: 400,
        message: "Passwords do not match",
      },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return NextResponse.json(
      {
        status: 404,
        message: "No user found",
      },
      { status: 404 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { email: existingUser.email },
    data: {
      password: hashedPassword,
      resetPasswordAttempts: 0,
      resetPasswordToken: null,
    },
  });

  return NextResponse.json({
    status: 200,
    message: "Password Reset Successfully",
  });
}
