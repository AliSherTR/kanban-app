import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-here"
);

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        {
          status: 400,
          message: "No Token Provided",
        },
        { status: 400 }
      );
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);

    return NextResponse.json(
      {
        status: 200,
        message: "Valid Token",
        payload,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 401,
        message:
          "Your password reset token has expired please request to reset password again",
        error: error.message,
      },
      { status: 401 }
    );
  }
}
