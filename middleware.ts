import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define protected routes
  const adminRoutes = ['/admin'];
  const protectedRoutes = ['/admin', '/applications', '/voting'];
  
  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  try {
    // Check authentication by calling the backend
    const response = await fetch('http://localhost:8003/api/v1/auth/protected', {
      headers: {
        Cookie: request.headers.get('cookie') || '',
      },
    });

    if (!response.ok) {
      // User is not authenticated, redirect to login
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    const userData = await response.json();
    
    // For admin routes, check if user has admin role
    if (isAdminRoute) {
      const hasAdminRole = userData.user_roles_academic_units?.some(
        (roleUnit: { rol: { name: string } }) => roleUnit.rol.name.toLowerCase().includes('admin')
      );
      
      if (!hasAdminRole) {
        // User doesn't have admin privileges, redirect to unauthorized page
        const unauthorizedUrl = new URL('/auth/unauthorized', request.url);
        return NextResponse.redirect(unauthorizedUrl);
      }
    }
    
    // User is authenticated and authorized, continue
    return NextResponse.next();
    
  } catch (error) {
    // Error checking authentication, redirect to login
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/login (login page)
     * - auth/register (register page)
     * - / (home page)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|auth/login|auth/register|$).*)',
  ],
};