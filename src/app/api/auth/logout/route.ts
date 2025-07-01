import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json({
      status: 200,
      message: "Logged out successfully",
    });

    // Clear the token cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Expire immediately
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
