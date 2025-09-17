// Role-based access control utilities

export type UserRole = 'admin' | 'coordinator' | 'student' | 'professor' | 'evaluator';

export interface UserRoleAcademicUnit {
  rol: {
    name: string;
    description?: string;
  };
  academic_unit: {
    name: string;
    id: string;
  };
}

export interface AuthUser {
  id: string;
  name: string;
  last_name: string;
  email: string;
  identification_type: string;
  identification_number: string;
  phone: string;
  is_active: boolean;
  user_roles_academic_units: UserRoleAcademicUnit[];
}

// Route permissions mapping
export const ROUTE_PERMISSIONS: Record<string, UserRole[]> = {
  '/admin': ['admin'],
  '/applications': ['admin', 'coordinator', 'student', 'evaluator'],
  '/voting': ['admin', 'coordinator', 'professor'],
};

/**
 * Check if user has permission to access a route
 */
export function hasRoutePermission(user: AuthUser | null, route: string): boolean {
  if (!user || !user.user_roles_academic_units.length) {
    return false;
  }

  const userRoles = user.user_roles_academic_units.map(roleUnit => 
    roleUnit.rol.name.toLowerCase() as UserRole
  );

  // Find matching route permission
  const routeKey = Object.keys(ROUTE_PERMISSIONS).find(key => route.startsWith(key));
  if (!routeKey) {
    return true; // Allow access to routes without specific permissions
  }

  const requiredRoles = ROUTE_PERMISSIONS[routeKey];
  return userRoles.some(role => requiredRoles.includes(role));
}

/**
 * Get user roles from user data
 */
export function getUserRoles(user: AuthUser | null): UserRole[] {
  if (!user || !user.user_roles_academic_units.length) {
    return [];
  }

  return user.user_roles_academic_units.map(roleUnit => 
    roleUnit.rol.name.toLowerCase() as UserRole
  );
}

/**
 * Check if user has a specific role
 */
export function hasRole(user: AuthUser | null, role: UserRole): boolean {
  const userRoles = getUserRoles(user);
  return userRoles.includes(role);
}

/**
 * Check if user is admin
 */
export function isAdmin(user: AuthUser | null): boolean {
  return hasRole(user, 'admin');
}

/**
 * Get redirect path based on user roles
 */
export function getDefaultRedirectPath(user: AuthUser | null): string {
  const userRoles = getUserRoles(user);
  
  if (userRoles.includes('admin')) {
    return '/admin';
  }
  
  if (userRoles.includes('coordinator')) {
    return '/applications';
  }
  
  if (userRoles.includes('professor')) {
    return '/voting';
  }
  
  if (userRoles.includes('student') || userRoles.includes('evaluator')) {
    return '/applications';
  }
  
  return '/';
}