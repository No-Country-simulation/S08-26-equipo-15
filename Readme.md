# MeetCore

Plataforma web de reuniones y colaboración remota, construida con React, TypeScript y Spring Boot.
MeetCore es una plataforma diseñada para centralizar la creación, gestión y participación en reuniones virtuales desde un mismo lugar.
El proyecto está siendo desarrollado de forma incremental, comenzando por la arquitectura y experiencia frontend para posteriormente integrar autenticación, persistencia, comunicación en tiempo real y funcionalidades avanzadas de reuniones.

### ¿Qué problema busca resolver?

Las reuniones virtuales suelen depender de diferentes herramientas para gestionar invitaciones, accesos, participantes, comunicación y seguimiento.
MeetCore busca centralizar este flujo en una sola plataforma:
Crear reunión → Generar enlace / código → Invitar participantes → Gestionar acceso → Sala de espera → Videollamada → Chat / Audio / Video / Pantalla → Finalizar reunión → Resumen → Historial

## Funcionalidades

### Autenticación

- Registro de usuarios.
- Inicio de sesión.
- Recuperación de contraseña.
- Manejo de autenticación mediante contexto.
- Rutas protegidas.

### Dashboard

- Resumen de actividad.
- Próximas reuniones.
- Reuniones realizadas.
- Participantes.
- Acciones rápidas.

### Reuniones

- Creación de reuniones.
- Programación.
- Código o enlace de acceso.
- Gestión de participantes.
- Solicitudes de ingreso.
- Sala de espera.

### Comunicación en Tiempo Real

- Audio.
- Video.
- Chat.
- Compartir pantalla.
- Estado de conexión.
- Reconexión.

### Historial

- Registro de reuniones realizadas.
- Información de las reuniones.
- Resúmenes posteriores.

## Arquitectura

El proyecto está organizado buscando mantener una separación clara entre interfaz, lógica de negocio y acceso a datos.

### Frontend

Page / Component → Service → Mock / API
Esta estructura permite desarrollar inicialmente con datos mock y posteriormente reemplazarlos por servicios reales sin tener que rehacer la interfaz.

### Arquitectura Objetivo

React → Services → REST API / WebSocket → Spring Boot → Services → Repositories → PostgreSQL
La comunicación en tiempo real se contempla mediante WebSocket y WebRTC.

## Tecnologías

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React

## Backend

- Java 21
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Flyway
- Bean Validation

## Comunicación

- REST API
- WebSocket
- WebRTC

## Herramientas

- Git
- GitHub
- VS Code
- Maven
- pnpm

## Roles y Permisos

### HOST (Responsable de administrar una reunión)

- Crear reuniones.
- Iniciar reuniones.
- Gestionar participantes.
- Controlar el acceso.
- Administrar opciones de la reunión.

### PARTICIPANT (Usuario que participa en una reunión)

- Unirse mediante código o enlace.
- Participar mediante audio y video.
- Utilizar las funciones habilitadas por el host.
  \*Consultar sus reuniones.
  Los permisos importantes deberán validarse desde el backend para evitar depender únicamente de las restricciones de la interfaz.

## Estado del Proyecto

### Etapa 1 — Diseño y Arquitectura(Completado)

- Definición del problema.
- Flujo principal de la aplicación.
- Definición de módulos.
- Definición de roles.
- Arquitectura frontend.
- Selección de tecnologías.

### Etapa 2 — Frontend(Completado)

- Configuración React + TypeScript.
- Sistema visual.
- Layout de autenticación.
- Login, Registro y Recuperación de contraseña.
- AuthContext y Rutas protegidas.
- AppLayout, Sidebar y Dashboard.
- Servicios y mocks.

### Etapa 3 — Backend (Completado)

- Proyecto Spring Boot.
- Modelo de usuario, Repository y DTOs.
- Login y Registro.
- Endpoint inicial del Dashboard.
- Configuración PostgreSQL, JPA y Flyway.

### Etapa 4 — Integración y Seguridad (Pendiente)

- Mejorar la capa de servicios del backend.
- Hash de contraseñas.
- Implementar autenticación segura (sesión/JWT).
- Integrar frontend con API real y conectar datos al Dashboard.
- Implementar autorización por roles.

### Etapa 5 — Gestión de Reuniones(Pendiente)

- Crear reunión y unirse mediante código o enlace.
- Gestión de participantes y Sala de espera.
- Calendario e Historial.

### Etapa 6 — Tiempo Real (Pendiente)

- Videollamada (Audio y video).
- Chat y Compartir pantalla.
- Estados de conexión y reconexión.
- Gestión de participantes en vivo.

### Etapa 7 — Cierre(Pendiente)

- Resumen de reuniones.
- Pruebas de integración, validación responsive y accesibilidad.
- Corrección de errores y preparación para despliegue.

### Decisiones Técnicas

Uno de los objetivos principales del proyecto es evitar que la interfaz dependa directamente de los datos. Por esta razón, los componentes consumen servicios en lugar de acceder directamente a los mocks.
Esto permite evolucionar de:

- Frontend → Mock
- a:
  Frontend → Service → API → Backend → Database
  sin tener que cambiar la lógica de cada página. También se busca mantener una arquitectura preparada para incorporar funcionalidades de tiempo real sin mezclar esa lógica con los componentes visuales.

### Estructura Principal

text

- frontend/
  └── src/
  ├── components/
  ├── context/
  ├── hooks/
  ├── layouts/
  ├── pages/
  ├── router/
  ├── services/
  │ └── mock/
  ├── styles/
  └── types/

- backend/
  └── src/
  └── main/
  ├── java/
  │ └── com/nocountry/meetcore/
  │ ├── controller/
  │ ├── dto/
  │ ├── model/
  │ └── repository/
  └── resources/

### Objetivos Técnicos

Durante el desarrollo de MeetCore buscamos aplicar buenas prácticas de desarrollo:

- Separación de responsabilidades.
- Componentes reutilizables.
- Tipado estático con TypeScript.
- Validación de datos.
- Arquitectura preparada para crecimiento.
- Integración frontend/backend.
- Persistencia con PostgreSQL.
- Seguridad y autorización.
- Comunicación en tiempo real.
- Diseño responsive.
- Accesibilidad.
- Control de versiones con Git.

### Proyecto y Enlaces

MeetCore forma parte de un desarrollo colaborativo realizado dentro del programa No Country, donde se trabaja sobre un producto desde su definición inicial hasta una solución funcional.

_Repositorio:_ https://github.com/No-Country-simulation/S08-26-equipo-15

### Próximo Objetivo:Avanzar desde el prototipo funcional hacia una aplicación integrada, conectando el frontend con el backend real y sustituyendo progresivamente los datos mock por persistencia y servicios reales.

## Sobre el Proyecto:

MeetCore no busca ser únicamente una interfaz de videollamadas. El objetivo es construir una aplicación completa donde arquitectura, experiencia de usuario, backend, persistencia y comunicación en tiempo real formen parte de una misma solución
