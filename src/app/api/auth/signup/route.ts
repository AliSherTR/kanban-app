import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json({
        status: 409,
        message: "An account already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name: username,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      status: 201,
      message: "Your account has been created successfully now you can login",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ status: error.status, message: error.message });
  }
}
