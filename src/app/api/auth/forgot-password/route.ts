import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";
import { PasswordReset } from "@/emails/reset-password";
import { SignJWT } from "jose";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-here"
);

async function generateJWT(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(JWT_SECRET);
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { status: 400, message: "Invalid email address" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { status: 404, message: "Invalid email address" },
        { status: 404 }
      );
    }

    if (existingUser.resetPasswordAttempts >= 3) {
      return NextResponse.json({
        status: 401,
        message:
          "You have already applied to reset your password. Please wait 24 hours before applying again",
      });
    }

    const token = await generateJWT({
      email: existingUser.email,
      id: existingUser.id,
    });

    const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`;

    const emailHtml = await render(PasswordReset({ resetLink: resetUrl }));

    const mailOptions = {
      from: `"Kanban Board" <support@kanbanboard.dev>`,
      to: email,
      subject: "Password Reset Requested",
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);
    await prisma.user.update({
      where: {
        email: existingUser.email,
      },
      data: {
        resetPasswordAttempts: existingUser.resetPasswordAttempts + 1,
        resetPasswordToken: token,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "An email has been sent to the provided email address",
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
