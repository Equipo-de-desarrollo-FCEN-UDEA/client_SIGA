import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Este código es un middleware que se ejecuta antes de cada petición.
export async function middleware(request: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cookies: { get: (arg0: string) => any };
  nextUrl: { pathname: string | string[] };
  url: string | URL | undefined;
}) {
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
  matcher: ["/admin/:path*"],
};
