import { NextRequest, NextResponse } from 'next/server';

// Define route patterns that require authentication
const protectedRoutes = [
  '/admin',
  '/applications', 
  '/voting',
];

// Define role-based route permissions
const roleRoutes = {
  admin: ['/admin'],
  coordinator: ['/applications', '/voting'],
  student: ['/applications'],
  professor: ['/voting'],
  evaluator: ['/applications'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/auth' ||
    pathname === '/unauthorized' ||
    pathname === '/'
  ) {
    return NextResponse.next();
  }

  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  try {
    // Check authentication status by calling the protected endpoint
    const response = await fetch(`${request.nextUrl.origin}/api/protected`, {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    });

    if (!response.ok) {
      // Redirect to auth page if not authenticated
      const authUrl = new URL('/auth', request.url);
      authUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(authUrl);
    }

    const userData = await response.json();
    
    // Check role-based permissions
    if (userData.user_roles_academic_units && userData.user_roles_academic_units.length > 0) {
      const userRoles = userData.user_roles_academic_units.map((roleUnit: any) => 
        roleUnit.rol.name.toLowerCase()
      );

      // Check if user has permission for this route
      const hasPermission = Object.entries(roleRoutes).some(([role, routes]) => {
        if (userRoles.includes(role)) {
          return routes.some(route => pathname.startsWith(route));
        }
        return false;
      });

      if (!hasPermission) {
        // Redirect to unauthorized page
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }

    // Add user data to headers for use in components
    const nextResponse = NextResponse.next();
    nextResponse.headers.set('x-user-data', JSON.stringify(userData));
    return nextResponse;

  } catch (error) {
    console.error('Middleware error:', error);
    // Redirect to auth page on error
    const authUrl = new URL('/auth', request.url);
    authUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(authUrl);
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
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};