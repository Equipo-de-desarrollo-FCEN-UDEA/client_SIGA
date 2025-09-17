
"use client";

import Link from 'next/link';
import { useAuth } from '../core/context/AuthContext';
import LoadingSpinner from '../components/molecules/LoadingSpinner';

export default function Home() {
  const { user, loading, isAdmin, logout } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Sistema SIGA
          </h1>
          
          {user ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                <h2 className="text-xl font-semibold mb-2">
                  Bienvenido, {user.name} {user.last_name}
                </h2>
                <p className="text-sm">Email: {user.email}</p>
                <div className="mt-2">
                  <span className="text-sm font-medium">Roles:</span>
                  <ul className="text-sm mt-1">
                    {user.user_roles_academic_units?.map((roleUnit, index) => (
                      <li key={index} className="ml-4">
                        • {roleUnit.rol.name} - {roleUnit.academic_unit.name}
                      </li>
                    )) || <li className="ml-4">Sin roles asignados</li>}
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {isAdmin() && (
                  <Link 
                    href="/admin/user" 
                    className="block p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    <h3 className="text-lg font-semibold mb-2">Administración</h3>
                    <p className="text-sm">Gestionar usuarios y roles</p>
                  </Link>
                )}
                
                <Link 
                  href="/applications/mobility" 
                  className="block p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  <h3 className="text-lg font-semibold mb-2">Aplicaciones</h3>
                  <p className="text-sm">Movilidad y aplicaciones</p>
                </Link>
                
                <Link 
                  href="/voting" 
                  className="block p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center"
                >
                  <h3 className="text-lg font-semibold mb-2">Votaciones</h3>
                  <p className="text-sm">Sistema de votaciones</p>
                </Link>
              </div>

              <div className="text-center">
                <button
                  onClick={logout}
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Acceso al Sistema
              </h2>
              <p className="text-gray-600 mb-6">
                Inicia sesión para acceder a las funcionalidades del sistema
              </p>
              <Link
                href="/auth/login"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Iniciar Sesión
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
