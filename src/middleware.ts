import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-here"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isAuthenticated = async () => {
    if (!token) {
      return { authenticated: false, error: "No token provided" };
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      return { authenticated: true, payload };
    } catch (error: any) {
      if (error.code === "ERR_JWT_EXPIRED") {
        return { authenticated: false, error: "Token expired" };
      }
      return { authenticated: false, error: "Invalid token" };
    }
  };

  const { authenticated, error, payload } = await isAuthenticated();

  if (pathname.startsWith("/dashboard")) {
    if (!authenticated) {
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url)
      );
      response.cookies.delete("token");
      return response;
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/auth") || pathname === "/") {
    if (authenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/api") && !pathname.startsWith("/api/auth")) {
    if (!authenticated) {
      const response = NextResponse.json(
        { status: 401, message: "Unauthorized", error },
        { status: 401 }
      );
      response.cookies.delete("token");
      return response;
    }

    const response = NextResponse.next();
    if (payload && typeof payload === "object" && "id" in payload) {
      response.headers.set("x-user-id", String(payload.id));
      response.headers.set("x-user-email", String(payload.email));
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api/auth (authentication routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
