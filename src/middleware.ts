import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Este código es un middleware que se ejecuta antes de cada petición.
export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("access_token");

  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  try {
    await jwtVerify(
      jwt.value,
      new TextEncoder().encode(process.env.SECRET_KEY)
    );

    return NextResponse.next();
  } catch  {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

// Protección de rutas con respecto a un rol
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|auth).*)',],
};
