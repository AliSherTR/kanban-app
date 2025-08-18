import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json(
      {
        status: 400,
        message: "Session Expired. Please login again",
      },
      {
        status: 400,
      }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
    include: {
      boards: true,
    },
  });

  if (!existingUser) {
    return NextResponse.json(
      {
        status: 400,
        message: "Session Expired. Please login again",
      },
      {
        status: 400,
      }
    );
  }

  const boards = existingUser.boards;

  return NextResponse.json({
    status: 200,
    message: "boards fetched succesfully",
    data: boards,
  });
}
