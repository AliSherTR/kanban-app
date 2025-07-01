import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { renderToStaticMarkup } from "react-dom/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return NextResponse.json({
        status: 404,
        message: "Invalid Email Address",
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Hello World",
      html: "<p>Congrats on sending your <strong>first fucking email</strong>!</p>",
    });

    renderToStaticMarkup;

    if (error) {
      console.log(error);
      return Response.json({ error }, { status: 500 });
    }
    return NextResponse.json({
      status: 200,
      message: "An Email has been sent to the provide email address",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
