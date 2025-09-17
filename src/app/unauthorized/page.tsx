"use client";

import Link from 'next/link';
import { useAuth } from '@/core/contexts/AuthContext';

export default function UnauthorizedPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Acceso no autorizado
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            No tienes permisos para acceder a esta página.
          </p>
          {user && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                Conectado como: <strong>{user.name} {user.last_name}</strong>
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Roles: {user.user_roles_academic_units.map(roleUnit => roleUnit.rol.name).join(', ')}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col space-y-4">
          <Link
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Ir al inicio
          </Link>
          
          <button
            onClick={logout}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}