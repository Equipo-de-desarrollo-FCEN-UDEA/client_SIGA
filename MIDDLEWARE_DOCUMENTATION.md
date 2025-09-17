# Middleware y Protección de Rutas - Sistema SIGA

## Descripción

Este documento describe la implementación del middleware de protección de rutas basado en roles de usuario en el sistema SIGA.

## Funcionalidades Implementadas

### 1. Middleware de Autenticación (`middleware.ts`)

El middleware intercepta todas las solicitudes y verifica:

- **Rutas protegidas**: `/admin`, `/applications`, `/voting`
- **Rutas de administrador**: `/admin` (requiere rol de admin)
- **Autenticación**: Verifica con el backend si el usuario está autenticado
- **Autorización**: Verifica roles específicos para rutas de administrador

#### Flujo de Protección:
1. Usuario accede a una ruta protegida
2. Middleware verifica autenticación con el backend
3. Si no está autenticado → redirección a `/auth/login`
4. Si está autenticado pero no tiene permisos de admin → redirección a `/auth/unauthorized`
5. Si tiene permisos → acceso permitido

### 2. Contexto de Autenticación (`AuthContext`)

Proporciona estado global de autenticación con:

- **Estado del usuario**: Información completa del usuario y roles
- **Funciones de autenticación**:
  - `login()`: Autenticación con credenciales
  - `logout()`: Cierre de sesión
  - `checkAuth()`: Verificación del estado de autenticación
  - `hasRole()`: Verificación de roles específicos
  - `isAdmin()`: Verificación de permisos de administrador

### 3. Páginas Actualizadas

#### Homepage (`/`)
- Muestra información del usuario autenticado
- Navegación basada en roles
- Botón de cierre de sesión
- Redirección a login si no está autenticado

#### Página de Login (`/auth/login`)
- Formulario de autenticación
- Redirección automática después del login exitoso
- Manejo de errores de autenticación

#### Página de Acceso Denegado (`/auth/unauthorized`)
- Mostrada cuando el usuario no tiene permisos suficientes
- Opciones para volver o ir al inicio

#### Páginas Protegidas
- `/admin/user`: Requiere rol de administrador
- `/applications/mobility`: Requiere autenticación
- Todas muestran información del usuario autenticado

## Configuración del Middleware

### Rutas Protegidas
```typescript
const adminRoutes = ['/admin'];
const protectedRoutes = ['/admin', '/applications', '/voting'];
```

### Rutas Excluidas
El middleware excluye automáticamente:
- `/api/*` - Rutas de API
- `/_next/*` - Archivos estáticos de Next.js
- `/favicon.ico` - Favicon
- `/auth/login` - Página de login
- `/auth/register` - Página de registro
- `/` - Homepage (acceso público)

## Verificación de Roles

El sistema verifica roles usando la estructura de datos del usuario:

```typescript
user.user_roles_academic_units?: Array<{
  rol: { name: string },
  academic_unit: { id: string, name: string }
}>
```

### Funciones de Verificación:
- `hasRole(roleName, academicUnitId?)`: Verifica si el usuario tiene un rol específico
- `isAdmin()`: Verifica si el usuario tiene permisos de administrador

## Integración con Backend

El sistema se integra con los siguientes endpoints del backend:

- `POST /api/v1/auth/access-token`: Login de usuario
- `GET /api/v1/auth/protected`: Verificación de autenticación
- `GET /api/v1/user/{id}`: Obtención de datos completos del usuario
- `POST /api/v1/auth/logout`: Cierre de sesión (opcional)

## Flujo de Usuario

### 1. Usuario No Autenticado
1. Accede a cualquier ruta protegida
2. Middleware lo redirige a `/auth/login`
3. Después del login exitoso, es redirigido a `/admin/user`

### 2. Usuario Autenticado (No Admin)
1. Puede acceder a `/applications` y `/voting`
2. Si intenta acceder a `/admin`, es redirigido a `/auth/unauthorized`

### 3. Usuario Administrador
1. Tiene acceso completo a todas las rutas protegidas
2. Ve opciones de administración en el homepage

## Características de Seguridad

- **Verificación del lado del servidor**: El middleware verifica autenticación en cada solicitud
- **Protección basada en roles**: Diferentes niveles de acceso según roles de BD
- **Manejo de errores**: Redirecciones apropiadas para diferentes escenarios
- **Estado de carga**: Indicadores visuales durante verificaciones de autenticación
- **Limpieza de estado**: Logout apropiado con limpieza de estado local

## Uso

### En Componentes
```typescript
import { useAuth } from '@/core/context/AuthContext';

function MyComponent() {
  const { user, isAdmin, hasRole, logout } = useAuth();
  
  if (isAdmin()) {
    // Mostrar funcionalidades de admin
  }
  
  if (hasRole('profesor', 'facultad-ciencias')) {
    // Mostrar funcionalidades específicas
  }
}
```

### Verificación Manual
```typescript
// Verificar si el usuario tiene un rol específico
const canEdit = hasRole('editor');

// Verificar rol en unidad académica específica
const canManageFaculty = hasRole('admin', 'facultad-id');
```

## Mantenimiento

Para agregar nuevas rutas protegidas:

1. Actualizar el array `protectedRoutes` en `middleware.ts`
2. Para rutas de admin, actualizar `adminRoutes`
3. Configurar verificaciones de roles específicas si es necesario

Para nuevos roles:

1. Actualizar la función `hasRole()` si se requiere lógica específica
2. Agregar funciones de verificación específicas en `AuthContext`