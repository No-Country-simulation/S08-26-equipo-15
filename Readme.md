# MeetCore — Resumen

Se desarrolló la estructura principal del frontend con React, TypeScript, Vite y Tailwind. Se implementaron Login, registro dentro de `LoginPage`, recuperación de contraseña, autenticación con `AuthContext`, rutas protegidas, `AppLayout`, Sidebar y Dashboard.

También se crearon `auth-service.ts`, `dashboard-service.ts`, mocks y tipos para separar la interfaz de los datos.

El frontend quedó preparado para conectarse al backend mediante:

```env
VITE_API_URL=http://localhost:8080
```

### Rutas preparadas

```text
POST /api/auth/login
POST /api/auth/register
GET  /api/dashboard
```

Estas rutas se consumen desde:

```text
src/services/auth-service.ts
src/services/dashboard-service.ts
```

El backend deberá recibirlas en sus **Controllers**, pasar la lógica al **Service** y acceder a PostgreSQL mediante **Repository + JPA**:

```text
React → Service → Spring Boot Controller → Service → Repository/JPA → PostgreSQL
```

Actualmente el frontend utiliza mocks; queda preparado para reemplazarlos por el backend real.
