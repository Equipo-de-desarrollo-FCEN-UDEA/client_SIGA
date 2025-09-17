"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../utils/auth';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  fallbackPath?: string;
  showLoading?: boolean;
}

export function RouteGuard({ 
  children, 
  requiredRoles, 
  fallbackPath = '/auth',
  showLoading = true 
}: RouteGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Check if user is authenticated
      if (!user) {
        router.push(fallbackPath);
        return;
      }

      // Check role-based permissions if specified
      if (requiredRoles && requiredRoles.length > 0) {
        const userRoles = user.user_roles_academic_units.map(roleUnit => 
          roleUnit.rol.name.toLowerCase() as UserRole
        );

        const hasPermission = requiredRoles.some(role => userRoles.includes(role));
        
        if (!hasPermission) {
          router.push('/unauthorized'); // Redirect to unauthorized page if no permission
          return;
        }
      }
    }
  }, [user, loading, router, requiredRoles, fallbackPath]);

  if (loading && showLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  if (!loading && (!user || (requiredRoles && requiredRoles.length > 0))) {
    const userRoles = user?.user_roles_academic_units.map(roleUnit => 
      roleUnit.rol.name.toLowerCase() as UserRole
    ) || [];

    if (requiredRoles && !requiredRoles.some(role => userRoles.includes(role))) {
      return null; // Will redirect via useEffect
    }
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
}

// Higher-order component version
export function withRouteGuard<P extends object>(
  Component: React.ComponentType<P>,
  requiredRoles?: UserRole[],
  fallbackPath?: string
) {
  return function GuardedComponent(props: P) {
    return (
      <RouteGuard requiredRoles={requiredRoles} fallbackPath={fallbackPath}>
        <Component {...props} />
      </RouteGuard>
    );
  };
}