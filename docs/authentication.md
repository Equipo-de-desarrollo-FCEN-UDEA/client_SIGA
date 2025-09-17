# Sistema de Autenticación y Protección de Rutas - SIGA

Este documento describe la implementación del sistema de middleware y protección de rutas basado en roles para la aplicación SIGA.

## Arquitectura del Sistema

### 1. Middleware de Next.js (`middleware.ts`)

El middleware se ejecuta en el servidor antes de que se procese cualquier página y proporciona:

- **Protección de rutas a nivel de servidor**: Verifica autenticación antes de que se cargue la página
- **Control de acceso basado en roles**: Valida permisos según los roles del usuario
- **Redirección automática**: Redirige usuarios no autorizados o sin permisos

#### Rutas Protegidas:
```typescript
const protectedRoutes = [
  '/admin',      // Solo administradores
  '/applications', // Admin, coordinador, estudiante, evaluador
  '/voting',     // Admin, coordinador, profesor
];
```

### 2. Context de Autenticación (`src/core/contexts/AuthContext.tsx`)

Proporciona estado global de autenticación con:

- **Estado del usuario**: Información completa del usuario autenticado
- **Métodos de autenticación**: Login, logout, verificación de estado
- **Gestión de sesiones**: Integración con cookies del backend

#### Uso:
```typescript
const { user, login, logout, loading } = useAuth();
```

### 3. Componente RouteGuard (`src/core/components/RouteGuard.tsx`)

Protección a nivel de componente con:

- **Validación de roles**: Verifica permisos antes de renderizar contenido
- **Estados de carga**: Muestra indicadores mientras verifica permisos
- **Redirección automática**: Envía a páginas apropiadas según el estado

#### Uso:
```tsx
<RouteGuard requiredRoles={['admin']}>
  <AdminContent />
</RouteGuard>
```

### 4. Utilidades de Autenticación (`src/core/utils/auth.ts`)

Funciones helper para:

- **Verificación de permisos**: `hasRoutePermission(user, route)`
- **Extracción de roles**: `getUserRoles(user)`
- **Validación de roles específicos**: `isAdmin(user)`, `hasRole(user, role)`

## Roles y Permisos

### Tipos de Roles:
- **admin**: Acceso completo a todas las secciones
- **coordinator**: Acceso a aplicaciones y votaciones
- **student**: Acceso solo a aplicaciones
- **professor**: Acceso a votaciones
- **evaluator**: Acceso a aplicaciones

### Matriz de Permisos:
| Ruta | Admin | Coordinator | Student | Professor | Evaluator |
|------|-------|-------------|---------|-----------|-----------|
| `/admin` | ✅ | ❌ | ❌ | ❌ | ❌ |
| `/applications` | ✅ | ✅ | ✅ | ❌ | ✅ |
| `/voting` | ✅ | ✅ | ❌ | ✅ | ❌ |

## API Endpoints

### `/api/auth/login` (POST)
- Autentica usuario con credenciales
- Establece cookies de sesión
- Retorna estado de autenticación

### `/api/protected` (GET)
- Verifica estado de autenticación actual
- Retorna información del usuario si está autenticado
- Usado por middleware y context para validaciones

## Flujo de Autenticación

1. **Usuario accede a ruta protegida**
2. **Middleware verifica autenticación** via `/api/protected`
3. **Si no está autenticado**: Redirección a `/auth`
4. **Si está autenticado**: Verificación de roles
5. **Si no tiene permisos**: Redirección a `/unauthorized`
6. **Si tiene permisos**: Permite acceso a la página

## Layouts Protegidos

### Admin Layout (`src/app/admin/layout.tsx`)
```tsx
<RouteGuard requiredRoles={['admin']}>
  {children}
</RouteGuard>
```

### Applications Layout (`src/app/applications/layout.tsx`)
```tsx
<RouteGuard requiredRoles={['admin', 'coordinator', 'student', 'evaluator']}>
  {children}
</RouteGuard>
```

### Voting Layout (`src/app/voting/layout.tsx`)
```tsx
<RouteGuard requiredRoles={['admin', 'coordinator', 'professor']}>
  {children}
</RouteGuard>
```

## Páginas de Estado

### Página de Autenticación (`/auth`)
- Formulario de login integrado con AuthContext
- Redirección automática después del login exitoso
- Manejo de errores de autenticación

### Página No Autorizado (`/unauthorized`)
- Se muestra cuando el usuario no tiene permisos
- Opciones para regresar al inicio o cerrar sesión
- Información del usuario actual y sus roles

## Configuración y Uso

### 1. Envolver la aplicación con AuthProvider
```tsx
// En layout.tsx
<AuthProvider>
  {children}
</AuthProvider>
```

### 2. Proteger páginas individuales
```tsx
import { RouteGuard } from '@/core/components/RouteGuard';

export default function ProtectedPage() {
  return (
    <RouteGuard requiredRoles={['admin']}>
      <PageContent />
    </RouteGuard>
  );
}
```

### 3. Usar utilidades de autenticación
```tsx
import { useAuth } from '@/core/contexts/AuthContext';
import { isAdmin } from '@/core/utils/auth';

function MyComponent() {
  const { user } = useAuth();
  
  if (isAdmin(user)) {
    return <AdminFeatures />;
  }
  
  return <RegularFeatures />;
}
```

## Seguridad

### Características de Seguridad:
- **Verificación doble**: Middleware + ComponentGuard
- **Autenticación basada en cookies**: Seguras y HTTP-only
- **Validación de roles en tiempo real**: Sin cache de permisos
- **Redirección automática**: Previene acceso no autorizado
- **TypeScript**: Tipado fuerte para prevenir errores

### Consideraciones:
- El middleware se ejecuta en el servidor edge de Vercel
- Las cookies se gestionan automáticamente por el navegador
- La validación de roles siempre consulta el backend actual
- No hay almacenamiento local de tokens o credenciales

## Mantenimiento

### Agregar Nuevos Roles:
1. Actualizar el tipo `UserRole` en `auth.ts`
2. Modificar `ROUTE_PERMISSIONS` según sea necesario
3. Actualizar layouts que requieran el nuevo rol

### Agregar Nuevas Rutas Protegidas:
1. Agregar la ruta a `protectedRoutes` en `middleware.ts`
2. Definir permisos en `ROUTE_PERMISSIONS`
3. Crear layout protegido si es necesario

### Debug y Troubleshooting:
- Verificar logs del middleware en la consola del navegador
- Comprobar respuesta de `/api/protected` en Network tab
- Validar que las cookies se están enviando correctamente
- Revisar que el backend esté devolviendo la estructura de usuario esperada