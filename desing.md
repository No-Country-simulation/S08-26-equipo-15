DESIGN_SPEC.md — MeetFlow: Plataforma de Reuniones y Colaboración Remota

Propósito de este documento: especificación completa de producto, diseño y arquitectura frontend para construir MeetFlow desde cero en React + TypeScript + Vite + Tailwind CSS. Este documento constituye la fuente de verdad para la implementación del frontend y debe ser suficiente para que un desarrollador o una IA pueda construir la aplicación sin necesitar materiales adicionales.

0. Contexto de negocio

0.1 Problema

MeetFlow es una plataforma de videoconferencias y colaboración remota que centraliza la creación y gestión de reuniones, permitiendo comunicación en tiempo real, control de participantes, compartición de pantalla, chat y seguimiento del estado de conexión.

Una organización necesita una solución propia para reuniones de video, sesiones internas y encuentros con clientes, sin depender de herramientas externas que limiten el control sobre la experiencia, la integración con procesos propios y la evolución futura de la plataforma.

## Cada reunión involucra distintos actores y estados:

Un anfitrión (host) crea la sala y comparte un enlace/código.

Los usuarios pueden solicitar ingresar.

El host puede aprobar o rechazar el acceso cuando la reunión requiere aprobación.

Dentro de la reunión, los participantes utilizan audio, video, compartición de pantalla y chat.

Entidades principales

Usuarios.

Reuniones.

Salas y enlaces de reunión.

Participantes.

Roles de usuario.

Solicitudes de ingreso.

Mensajes de chat.

Estados de conexión.

Estados de micrófono y cámara.

Compartición de pantalla.

Notificaciones.

Calendario.

Historial de reuniones.

Estados relevantes

## Estado de conexión:

good
unstable
disconnected
reconnecting

## Estado de reunión:

upcoming
live
ended

## Rol:

host
participant

0.2 Dolores que resuelve

DolorDescripción

Gestión fragmentada

Crear salas, invitar y controlar accesos depende de múltiples herramientas.

Complejidad del tiempo real

Audio, video, conexiones, permisos y estados deben mantenerse sincronizados.

Problemas de conexión

La aplicación debe representar correctamente estados de inestabilidad, desconexión y reconexión.

Control de acceso

El host necesita administrar solicitudes y permisos.

Falta de trazabilidad

El historial permite consultar reuniones, participantes y duración.

Experiencia no integrada

Creación, acceso, reunión y finalización deben formar un flujo coherente.

0.3 Flujo principal

Creación de reunión
↓
Generación de código/enlace
↓
Solicitud de ingreso
↓
Aprobación
↓
Sala de espera
↓
Reunión
↓
Audio / Video / Chat / Pantalla
↓
Reconexión ante problemas
↓
Finalización
↓
Resumen
↓
Historial

0.4 Criterio de éxito

## El proyecto debe permitir que un usuario:

Cree una reunión.

Obtenga un código y enlace de invitación.

Comparta la reunión.

Solicite o permita el ingreso de participantes.

Apruebe o rechace solicitudes.

Entre a una videollamada.

Controle micrófono y cámara.

Gestione participantes.

Utilice chat.

Comparta pantalla.

Visualice estados de conexión.

Finalice la reunión.

Consulte un resumen.

Consulte posteriormente el historial y calendario.

0.5 Alcance de esta fase

Esta fase corresponde al frontend de MeetFlow.

La aplicación debe construirse desde el principio pensando en una futura integración con un backend real.

Stack frontend

React

TypeScript

Vite

Tailwind CSS v4

React Router

lucide-react

Backend previsto

## El backend se desarrollará posteriormente utilizando:

Java 21

Spring Boot 4.1.1

Spring Web

Spring Data JPA

PostgreSQL 18

PostgreSQL Driver

Lombok

Bean Validation

Flyway

Comunicación futura

La plataforma deberá quedar preparada para integrar posteriormente:

## REST API.

WebSocket.

WebRTC.

Durante el desarrollo inicial del frontend pueden utilizarse datos mock para permitir construir y probar las interfaces antes de que el backend esté disponible.

Los mocks no representan la arquitectura definitiva.

Los componentes de UI no deben acceder directamente a los datos mock.

## La arquitectura debe seguir:

Page / Component
↓
Service
↓
Mock implementation

## y posteriormente:

Page / Component
↓
Service
↓
HTTP / WebSocket
↓
Spring Boot
↓
Spring Data JPA
↓
PostgreSQL

El cambio de mock a API real debe realizarse principalmente dentro de la capa de servicios, sin reescribir las páginas ni los componentes visuales.

1. Resumen ejecutivo

Nombre: MeetFlow

Tipo: SaaS de videoconferencia y colaboración remota.

Idioma: Español neutro LatAm.

Plataformas: Web responsive.

Diseño: mobile-first en navegación y desktop-first en densidad de información.

Módulos

Autenticación.

App Shell.

Dashboard.

Reuniones.

Crear reunión.

Unirse a reunión.

Sala de espera.

Videollamada.

Resumen de reunión.

Historial.

Calendario.

Configuración.

2. Sistema visual

2.1 Paleta

Todos los colores deben definirse mediante tokens CSS/Tailwind.

No utilizar hex directamente dentro de componentes.

TokenValorUso

primary

## #2563EB

Marca y CTAs

primary-hover

## #1D4ED8

Hover

primary-muted

## #DBEAFE

Fondos suaves

primary-subtle

## #EFF6FF

Fondos muy suaves

app-bg

## #F1F5F9

Fondo general

surface

## #FFFFFF

Tarjetas y paneles

sidebar

## #0F172A

Sidebar

sidebar-hover

## #1E293B

Hover sidebar

txt

## #0F172A

Texto principal

txt-secondary

#475569

Texto secundario

txt-muted

## #94A3B8

Texto terciario

divider

## #E2E8F0

Bordes

success

## #16A34A

Estados positivos

success-bg

## #DCFCE7

Fondo success

danger

## #DC2626

Errores

danger-bg

## #FEE2E2

Fondo danger

warning

## #D97706

Advertencias

warning-bg

## #FEF3C7

Fondo warning

info

## #0284C7

Información

info-bg

## #E0F2FE

Fondo info

call-bg

## #080D18

Pantalla de llamada

tile-bg

## #0F1829

Tiles

tile-border

## #1E2D47

Bordes de tiles

2.2 Avatares

Asignación determinística basada en hash del nombre.

## Colores:

blue-500
violet-500
teal-500
emerald-500
amber-500
rose-500
cyan-500
fuchsia-500

La misma persona debe conservar siempre el mismo color.

2.3 Tipografía

## UI

Inter

## Pesos:

400
500
600
700

Display

DM Sans

## Pesos:

400
500
600
700

## Utilizar:

font-sans
font-display

Escala

Hero: text-4xl / text-5xl.

H1: text-2xl / lg:text-3xl.

H2: text-lg / text-xl.

H3: text-sm / text-base.

Body: text-sm.

Caption: text-xs.

Valores arbitrarios únicamente cuando estén realmente justificados.

2.4 Espaciado

Utilizar la escala estándar de Tailwind.

Página: p-5 lg:p-7.

Formularios: p-6.

Secciones: space-y-5 / space-y-6.

Grid: gap-3 / gap-4 / gap-5.

## Contenedores:

dashboard       max-w-7xl
meetings        max-w-6xl
calendar        max-w-6xl
history         max-w-5xl
settings        max-w-4xl
create meeting  max-w-2xl
summary         max-w-2xl
join meeting    max-w-lg

2.5 Radios

Tarjetas: rounded-2xl.

Inputs: rounded-lg / rounded-xl.

Botones: rounded-lg / rounded-xl.

Badges: rounded-full.

2.6 Sombras

Cards: shadow-sm o sin sombra.

Hover: hover:shadow-md.

Modales: shadow-2xl.

Botones principales: shadow-sm.

Finalizar llamada: sombra roja.

2.7 Animaciones

## Definir mediante CSS global:

reaction-float
hand-bounce
speaking-ring
slide-in-right
slide-up
fade-in
rec-blink
notif-slide
stat-in

Las animaciones deben utilizarse de forma moderada y coherente.

## También utilizar:

transition-colors
transition-all
duration-150
duration-200
duration-300
active:scale-95

2.8 Breakpoints

## Utilizar los breakpoints estándar:

sm: 640px
md: 768px
lg: 1024px
xl: 1280px

## lg será el breakpoint principal para:

Sidebar desktop.

Bottom navigation mobile.

Mayor densidad de información.

Layouts de múltiples columnas.

3. Arquitectura de información

3.1 Rutas

/login
/register
/forgot-password

/dashboard
/meetings
/meetings/new
/meetings/join
/calendar
/history
/settings

/waiting-room/:meetingId
/call/:meetingId
/call/:meetingId/summary

Las rutas autenticadas deben estar protegidas mediante un mecanismo de autorización del frontend.

3.2 Grupos

Auth

/login
/register
/forgot-password

App

/dashboard
/meetings
/meetings/new
/meetings/join
/calendar
/history
/settings

## Utilizan:

AppLayout

Call

/waiting-room/:meetingId
/call/:meetingId
/call/:meetingId/summary

## Utilizan:

CallLayout

No tienen sidebar ni header del App Shell.

3.3 Navegación responsive

Desktop

Sidebar fijo.

Mobile

Sidebar como drawer con overlay.

## Bottom navigation:

Dashboard
Reuniones
Calendario
Historial
Configuración

## Reuniones debe aparecer activa también en:

/meetings/new
/meetings/join

4. Pantallas

4.1 Autenticación

Layout

Split screen.

Desktop

## Panel izquierdo:

Fondo sidebar.

Logo.

Headline.

Features.

Estadísticas.

Badge de seguridad.

## Panel derecho:

Formulario.

Fondo app-bg.

max-w-[420px].

Mobile

Ocultar panel izquierdo.

Mostrar logo compacto.

Login

## Campos:

Email.

Password.

Recordar sesión.

## Acciones:

Recuperar contraseña.

Login.

Google.

Microsoft.

Registro.

## Estados:

Loading.

Error.

Validación.

Register

## Campos:

Nombre.

Email.

Password.

Confirmar password.

Aceptación de términos.

## Indicador de fuerza:

Débil
Regular
Buena
Excelente

## Evaluar:

longitud ≥ 8

mayúscula

número

carácter especial

Forgot Password

## Campo:

Email.

## Después de enviar:

Confirmación.

Email utilizado.

Botón volver al login.

4.2 AppLayout

Sidebar

## Ancho:

w-60

## Contenido:

Logo.

Nueva reunión.

Unirse.

Navegación.

Almacenamiento.

Usuario.

## Navegación:

Dashboard
Reuniones
Calendario
Historial
Configuración

Header

## Incluye:

Menú mobile.

Buscador.

Notificaciones.

Avatar.

Nombre.

## Notificaciones:

Dropdown.

Badge.

Estado leído/no leído.

Marcar todas como leídas.

4.3 Dashboard

Header

## Mostrar:

Buenos días/tardes/noches, {nombre}

Fecha actual en español.

## Acciones:

Unirse.

Nueva reunión.

Estadísticas

## Cuatro tarjetas:

Reuniones realizadas
Próximas reuniones
Horas en reuniones
Participantes únicos

## Cada una:

Icono.

Valor.

Label.

Tendencia.

Próxima reunión

Hero card.

## Debe mostrar:

Nombre.

Fecha.

Hora.

Duración.

Participantes.

Código.

Estado de aprobación.

Countdown.

## Botón:

Entrar a la reunión

Reuniones programadas

Filas clicables.

## Mostrar:

Nombre.

Fecha.

Hora.

Duración.

Participantes.

Estado.

## Click:

Waiting Room

Reuniones recientes

Mostrar últimas reuniones finalizadas.

Sidebar dashboard

Acciones rápidas

Nueva reunión.

Unirse.

Actividad

Eventos recientes.

Equipo

Lista de compañeros.

4.4 Meetings

## Header:

Título.

Contador.

Nueva reunión.

Unirse.

## Tabs:

Próximas
Mis reuniones
Invitaciones

Buscador.

## Grid:

md: 2 columnas
xl: 3 columnas

MeetingCard

## Debe mostrar:

Estado.

Nombre.

Descripción.

Fecha.

Hora.

Duración.

Participantes.

Código.

Acción principal.

## Acciones según estado:

Entrar
Aceptar e ir
Ver resumen

## Código:

Copiar
→ Copiado

4.5 Crear reunión

Formulario.

Información

Nombre.

Fecha.

Hora.

Duración.

Descripción.

## Duraciones:

15 min
30 min
60 min
90 min

Opciones

Requerir aprobación.

Permitir cámara.

Permitir chat.

Resultado

## Después de crear:

## ID.

Código.

Link.

Copiar código.

Copiar link.

Entrar.

Crear otra.

4.6 Unirse

## Formulario:

Código o enlace

Validación.

Mostrar códigos recientes.

## Submit:

Entrar

4.7 Waiting Room

## Pantalla:

bg-call-bg

Header mínimo.

Preview

## Mostrar:

Avatar.

Nombre.

Estado de cámara.

Estado del micrófono.

Nivel de audio.

Fondo/desenfoque.

Estado "EN VIVO".

Dispositivos

## Controles:

Micrófono
Cámara
Altavoz

Selectors para dispositivo.

Acción

## Si requiere aprobación:

Solicitar acceso a la reunión

## Si no:

Entrar ahora

El flujo debe estar preparado para posteriormente conectarse con el backend.

4.8 VideoCall

## La pantalla debe ser:

fixed inset-0
bg-call-bg
z-50

Top Bar

## Mostrar:

Logo.

Nombre.

Código.

Duración.

Grabación.

Participantes.

Solicitudes.

Connection Banner

## Mostrar cuando exista un participante:

unstable

## Mensaje:

Conexión inestable

Debe poder cerrarse.

4.8.1 Grid View

## Adaptación:

1 participante → 1 columna
2 → 2 columnas
3-4 → 2 columnas
5-9 → 3 columnas
10+ → 4 columnas

4.8.2 VideoTile

## Cada tile debe mostrar:

Avatar.

Nombre.

Mic.

Cámara.

Estado de conexión.

Host.

Speaking.

Hand raised.

Pin.

## Estados visuales:

good
unstable
disconnected
reconnecting

## Si está desconectado:

Mostrar overlay.

## Si está reconectando:

Mostrar estado de reconexión.

4.8.3 Speaker View

## Layout:

Participante principal
+
Miniaturas

## Seleccionar miniatura:

pin participant

4.8.4 Screen Share View

## Mostrar:

Contenido compartido.

Participantes secundarios.

La implementación inicial puede representar visualmente el estado de pantalla compartida, pero la API del componente debe quedar preparada para recibir posteriormente un MediaStream.

4.8.5 Panel lateral

## Ancho:

w-72
lg:w-80

## Tabs:

Chat
Participantes
Solicitudes

Chat

## Mostrar:

Avatar.

Mensaje.

Timestamp.

Mensajes propios alineados a la derecha.

Mensajes externos alineados a la izquierda.

## Enviar:

Enter

## Nueva línea:

Shift + Enter

Participantes

## Agrupar:

Anfitrión
Participantes (n)

## Mostrar:

Avatar.

Nombre.

Host.

Mic.

Cámara.

Conexión.

Mano levantada.

## Si el usuario actual es host:

Silenciar
Fijar
Expulsar
Convertir en anfitrión

Solicitudes

## Cada solicitud:

Avatar.

Nombre.

Hora.

Aprobar.

Rechazar.

## Estados:

pending
approved
rejected

4.8.6 Reacciones

## Selector:

👍
❤️
😂
👏
🎉
😮

Las reacciones deben aparecer temporalmente en pantalla.

4.8.7 Mano levantada

Mostrar toast superior.

## Animación:

hand-bounce

4.8.8 Controles

Izquierda

Micrófono.

Cámara.

Compartir pantalla.

Centro

Chat.

Participantes.

Solicitudes.

Levantar mano.

Reacciones.

Más.

Derecha

Finalizar

4.8.9 Más opciones

## Mostrar:

Iniciar/detener grabación.

Silenciar todos.

Solo anfitrión.

Copiar enlace.

Cambiar vista.

4.8.10 Finalizar reunión

## Modal:

Todos los participantes serán desconectados.

## Si hay grabación:

La grabación se guardará automáticamente.

## Acciones:

Cancelar
Finalizar para todos

## Después:

/call/:meetingId/summary

4.9 Meeting Summary

## Mostrar:

Reunión finalizada

## Stats:

Inicio.

Fin.

Duración.

Participantes.

## Calidad:

Audio.

Video.

Red.

Participación.

Participantes.

## Rating:

1-5 estrellas

## Acciones:

Descargar resumen.

Compartir resumen.

Nueva reunión.

Dashboard.

4.10 History

## Filtros:

Buscador.

Fecha.

Estado.

## Mostrar:

Reunión
Fecha
Duración
Participantes
Estado

Responsive.

## Siempre conservar:

Reunión
Estado

4.11 Calendar

## Vista principal:

Mes

## Preparar UI para:

Día
Semana

pero no es obligatorio implementarlas funcionalmente en esta fase.

## Calendario:

Navegación mensual.

Días.

Reuniones.

Eventos.

Día actual.

Día seleccionado.

## Panel lateral:

Reuniones del día.

Próximas reuniones.

4.12 Settings

## Tabs:

Perfil
Audio y video
Notificaciones
Seguridad

Perfil

Avatar.

Nombre.

Email.

Cargo.

Zona horaria.

Audio y video

Micrófono.

Altavoz.

Cámara.

Prueba de micrófono.

Mutear al entrar.

Cámara apagada al entrar.

Cancelación de ruido.

Notificaciones

## Toggles:

Email.

Push.

Recordatorios.

Nuevos participantes.

Chat.

Grabaciones.

Seguridad

Cambio de contraseña.

Verificación en dos pasos.

QR simulado para configuración inicial.

Zona de peligro.

5. Componentes reutilizables

## 5.1 UI

Cada componente debe estar en su propio archivo.

Button
Input
Textarea
Select
Avatar
Badge
Modal
Toast
ConnectionStatus
LoadingState
EmptyState
Toggle
Tabs

Button

## Props principales:

variant
size
loading
leftIcon
rightIcon
fullWidth

## Variantes:

primary
secondary
ghost
danger
success
outline

Input

## Props:

label
error
hint
leftIcon
rightElement

Avatar

## Props:

name
size
className

Debe calcular el color de manera determinística.

Badge

## Variantes:

success
danger
warning
info
neutral
primary

Modal

## Debe:

Cerrar con Escape.

Tener focus management básico.

Permitir diferentes anchos.

Toggle

Debe ser accesible mediante teclado.

Tabs

## Debe soportar:

Navegación por teclado.

Estado activo.

Responsive.

5.2 Componentes de dominio

Meeting

MeetingCard
MeetingStatusBadge

Call

VideoTile
SpeakerView
ScreenShareView
ChatPanel
ParticipantsPanel
RequestsPanel
CallControlButton
PanelToggleButton
CallControls

Layout

Sidebar
Header
MobileBottomNav
NotificationsDropdown

Dashboard

StatCard
NextMeetingHero
ActivityFeedItem
TeamMemberRow

Settings

SettingsTabs
ToggleRow
SectionHeader

Calendar

MonthGrid
DayDetailPanel
CalendarEventChip

5.3 Regla de extracción

## Extraer un componente cuando:

Se reutiliza en dos o más lugares.

Tiene lógica propia relevante.

Su separación mejora claramente la legibilidad.

Representa una unidad funcional independiente.

Evitar crear componentes innecesarios únicamente para reducir líneas de código.

6. Modelo de dominio TypeScript

## Los tipos representan el contrato entre:

## UI
Estado
Servicios
API futura

User

export interface User {
id: string
name: string
email: string
role: 'host' | 'participant'
avatarUrl?: string
}

Meeting

export type MeetingStatus = 'upcoming' | 'live' | 'ended'

export interface Meeting {
id: string
name: string
date: string
time: string
duration: number
description?: string
participants: number
status: MeetingStatus
requireApproval: boolean
allowCamera: boolean
allowChat: boolean
link: string
code: string
}

Participant

export type ConnectionState =
| 'good'
| 'unstable'
| 'disconnected'
| 'reconnecting'

export interface Participant {
id: string
user: User
isHost: boolean
micEnabled: boolean
cameraEnabled: boolean
connection: ConnectionState
isSpeaking: boolean
handRaised: boolean
isPinned: boolean
}

No duplicar name, email o avatar dentro de Participant.

Message

export interface Message {
id: string
sender: User
text: string
timestamp: string
}

## No almacenar:

isOwn

## La UI debe derivarlo:

message.sender.id === currentUser.id

JoinRequest

export interface JoinRequest {
id: string
user: User
requestedAt: string
status: 'pending' | 'approved' | 'rejected'
}

Notification

export type NotificationType =
| 'reminder'
| 'join'
| 'recording'
| 'message'
| 'request'

export interface AppNotification {
id: string
type: NotificationType
title: string
desc: string
time: string
read: boolean
}

7. Arquitectura de carpetas

src/
├── assets/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── meeting/
│   ├── call/
│   ├── dashboard/
│   ├── settings/
│   └── calendar/
│
├── layouts/
│   ├── AuthLayout.tsx
│   ├── AppLayout.tsx
│   └── CallLayout.tsx
│
├── pages/
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── ForgotPasswordPage.tsx
│   │
│   ├── DashboardPage.tsx
│   ├── MeetingsPage.tsx
│   ├── CreateMeetingPage.tsx
│   ├── JoinMeetingPage.tsx
│   ├── CalendarPage.tsx
│   ├── HistoryPage.tsx
│   ├── SettingsPage.tsx
│   ├── WaitingRoomPage.tsx
│   ├── VideoCallPage.tsx
│   └── MeetingSummaryPage.tsx
│
├── hooks/
│   ├── useCountdown.ts
│   ├── useOutsideClick.ts
│   ├── useMicLevel.ts
│   ├── useCallTimer.ts
│   └── useMediaQuery.ts
│
├── services/
│   ├── auth.service.ts
│   ├── meetings.service.ts
│   ├── participants.service.ts
│   ├── chat.service.ts
│   ├── notifications.service.ts
│   │
│   └── mock/
│       ├── users.mock.ts
│       ├── meetings.mock.ts
│       ├── participants.mock.ts
│       ├── chat.mock.ts
│       └── notifications.mock.ts
│
├── context/
│   ├── AuthContext.tsx
│   └── CallContext.tsx
│
├── types/
│   ├── user.ts
│   ├── meeting.ts
│   ├── participant.ts
│   ├── chat.ts
│   ├── access.ts
│   └── notification.ts
│
├── utils/
│   ├── date.ts
│   ├── color.ts
│   └── format.ts
│
├── router/
│   └── routes.tsx
│
├── styles/
│   └── index.css
│
├── App.tsx
└── main.tsx

## No crear:

src/app/App.tsx

## si ya existe:

src/App.tsx

Debe existir un único punto de entrada de App.

8. Arquitectura de datos e integración

8.1 Regla principal

## Las páginas y componentes no deben consumir directamente:

mock data
localStorage
fetch
axios
WebSocket
WebRTC

La comunicación debe pasar por servicios.

## Ejemplo:

MeetingsPage
↓
meetingsService
↓
Mock implementation

## Posteriormente:

MeetingsPage
↓
meetingsService
↓
## REST API
↓
Spring Boot

8.2 Servicios

auth.service.ts

## Responsabilidades futuras:

login
register
logout
getCurrentUser
forgotPassword

meetings.service.ts

## Responsabilidades:

getMeetings
getMeetingById
createMeeting
updateMeeting
deleteMeeting
joinMeeting

participants.service.ts

## Responsabilidades:

getParticipants
updateParticipant
removeParticipant
approveParticipant
rejectParticipant

chat.service.ts

## Responsabilidades:

getMessages
sendMessage

Posteriormente podrá integrar WebSocket.

notifications.service.ts

## Responsabilidades:

getNotifications
markAsRead
markAllAsRead

8.3 Backend futuro

## La API posterior estará desarrollada con:

Java 21
Spring Boot 4.1.1
Spring Web
Spring Data JPA
PostgreSQL 18
PostgreSQL Driver
Lombok
Bean Validation
Flyway

La estructura del backend se definirá posteriormente y no debe inventarse dentro del frontend.

## 8.4 REST

El frontend debe estar preparado para consumir endpoints REST.

## Conceptualmente:

GET    /api/meetings
GET    /api/meetings/{id}
POST   /api/meetings
PUT    /api/meetings/{id}
DELETE /api/meetings/{id}

Estos endpoints son ejemplos conceptuales y no deben considerarse contratos definitivos hasta que definamos el backend.

9. Tiempo real

La plataforma necesitará posteriormente comunicación en tiempo real.

WebSocket

## Se utilizará posteriormente para eventos como:

Participante conectado.

Participante desconectado.

Cambio de micrófono.

Cambio de cámara.

Solicitud de ingreso.

Aprobación.

Rechazo.

Mensaje de chat.

Mano levantada.

Estado de conexión.

WebRTC

## Se utilizará posteriormente para:

Audio.

Video.

Compartir pantalla.

Comunicación peer/media.

Los componentes deben permitir posteriormente recibir MediaStream.

## Ejemplo conceptual:

interface VideoTileProps {
participant: Participant
stream?: MediaStream
isMe: boolean
isPinned: boolean
onPin: () => void
}

La interfaz pública del componente debe permanecer estable cuando se incorpore WebRTC.

10. Gestión del estado

Estado local

## Utilizar useState para:

Formularios.

Dropdowns.

Modales.

Tabs.

Estados exclusivamente locales.

AuthContext

## Utilizar para:

Usuario autenticado.

Login.

Logout.

Sesión.

Persistencia inicial mediante localStorage únicamente para la experiencia frontend.

Cuando exista autenticación real, será reemplazada por el mecanismo correspondiente del backend.

CallContext

## Utilizar para el estado compartido de una llamada:

Participantes.

Usuario actual.

Micrófono.

Cámara.

Panel activo.

Solicitudes.

Chat.

Vista actual.

Participante fijado.

No introducir Redux o Zustand inicialmente.

Si durante el desarrollo aparece una necesidad real que lo justifique, documentar la razón antes de introducir una nueva solución.

11. Assets e iconografía

## La interfaz debe utilizar:

Iconos

lucide-react

Avatares

Iniciales + color determinístico.

Video

## Placeholder visual mediante:

Gradientes.

Iniciales.

Estados de cámara.

## Posteriormente podrá reemplazarse por:

MediaStream

sin cambiar la estructura visual del componente.

Logo

## Utilizar:

Video icon + MeetFlow

El logo debe ser implementado como UI/SVG, no depender de una imagen externa.

Fuentes

Inter
DM Sans

12. Tailwind CSS

## Utilizar:

Tailwind CSS v4
@tailwindcss/vite

## Definir tokens en:

src/styles/index.css

## mediante:

@theme {
...
}

No crear un tailwind.config.js tradicional salvo que una necesidad técnica concreta lo requiera.

Convenciones

## Nunca:

<div className="bg-[#2563EB]">

## Preferir:

<div className="bg-primary">

No introducir colores arbitrarios cuando exista un token equivalente.

13. Interacciones y estados

Loading

## Debe existir en:

Login.

Register.

Forgot password.

Crear reunión.

Unirse.

Entrar a reunión.

Acciones importantes.

Copiado

## Mostrar:

Copiar

## y después:

Copiado

durante aproximadamente 2 segundos.

Empty states

## Implementar en:

Meetings.

History.

Calendar.

Requests.

Chat cuando corresponda.

Connection states

## Cada participante debe poder representar:

good
unstable
disconnected
reconnecting

14. Accesibilidad

## Implementar:

HTML semántico.

Focus visible.

Navegación por teclado.

aria-label.

aria-expanded.

aria-selected.

Roles apropiados.

Escape para modales y dropdowns.

Focus management básico en modales.

Estados disabled correctamente comunicados.

Los elementos interactivos no deben depender exclusivamente de hover.

15. Principios de implementación

## La implementación debe seguir estas reglas:

15.1 TypeScript

Utilizar TypeScript estricto.

## Evitar:

any

salvo que exista una razón técnica documentada.

15.2 Componentes

## Preferir componentes:

Pequeños.

Reutilizables.

Legibles.

Con responsabilidad única.

Evitar componentes gigantes.

15.3 Separación

## Mantener separadas:

## UI
Estado
Lógica
Servicios
Datos
Tipos

15.4 Evitar sobrearquitectura

## No introducir:

Redux.

Zustand.

React Query.

Axios.

Librerías adicionales.

simplemente porque existen.

Una dependencia debe tener una razón clara.

15.5 Servicios

Las páginas no deben contener directamente la lógica de acceso a datos.

## Incorrecto:

fetch(...)

dentro de una página.

## Preferir:

meetingsService.getMeetings()

15.6 Mock

Los mocks son únicamente una fuente temporal de datos mientras desarrollamos el frontend.

No deben contaminar la UI.

## Incorrecto:

import meetings from './meetings.mock'

desde una página.

## Preferir:

meetingsService.getMeetings()

15.7 Futuro backend

## La arquitectura debe permitir:

Mock
↓
## REST
↓
WebSocket
↓
WebRTC

sin reescribir la interfaz.

16. Orden recomendado de implementación

La aplicación debe construirse progresivamente.

No generar todo el proyecto de una sola vez.

Fase 1 — Fundaciones

Configurar Vite.

React.

TypeScript.

Tailwind v4.

Tokens.

Fuentes.

Utils.

Types.

Componentes UI.

## Validar:

npm run build

y el type-check correspondiente.

Fase 2 — Autenticación

## Construir:

AuthLayout
LoginPage
RegisterPage
ForgotPasswordPage

Validar responsive y estados.

Fase 3 — App Shell

## Construir:

AppLayout
Sidebar
Header
MobileBottomNav
NotificationsDropdown

## Configurar:

React Router

Fase 4 — Aplicación principal

## Construir en este orden:

Dashboard
Meetings
CreateMeeting
JoinMeeting
Calendar
History
Settings

Utilizar servicios mock.

Fase 5 — Waiting Room

## Construir:

CallLayout
WaitingRoom

Preparar la API para futuras capacidades multimedia.

Fase 6 — Video Call

## Orden:

6.1

Estructura fullscreen.

6.2

Top bar.

6.3

Bottom controls.

6.4

VideoTile.

6.5

Grid view.

6.6

Speaker view.

6.7

Screen share view.

6.8

Chat.

6.9

Participants.

6.10

Requests.

6.11

Reacciones.

6.12

Hand raise.

6.13

Recording UI.

6.14

Finalizar reunión.

Fase 7 — Summary

## Construir:

MeetingSummaryPage

Fase 8 — Pulido frontend

## Revisar:

Responsive.

Accesibilidad.

Animaciones.

Loading.

Empty states.

Error states.

Navegación.

Consistencia visual.

TypeScript.

Build.

Fase 9 — Integración con backend

## Una vez terminado el frontend base:

React
↓
## REST API
↓
Spring Boot 4.1.1
↓
Spring Data JPA
↓
PostgreSQL 18

En esta etapa se reemplazarán progresivamente los servicios mock por servicios HTTP reales.

Fase 10 — Tiempo real

## Posteriormente:

React
↓
WebSocket
↓
Spring Boot

para eventos en tiempo real.

Fase 11 — WebRTC

## Finalmente:

React
↓
WebRTC
↓
Signaling
↓
Backend

para audio, video y pantalla compartida.

La arquitectura debe permitir introducir esta capa progresivamente.

17. Checklist de fidelidad visual

## Antes de considerar terminada una pantalla:

Colores utilizan tokens.

No existen hex innecesarios en componentes.

Tipografía correcta.

Radios consistentes.

Hover implementado.

Focus implementado.

Disabled implementado.

Loading implementado.

Empty state implementado.

Error state implementado cuando corresponda.

Responsive mobile.

Responsive tablet.

Responsive desktop.

Animaciones correspondientes.

Textos en español.

Iconografía consistente.

Componentes reutilizables.

No existe lógica de datos directamente en componentes visuales.

Los servicios están separados de la UI.

TypeScript correctamente tipado.

No existen dependencias innecesarias.

18. Criterios de calidad del código

## El código final debe ser:

Legible.

Mantenible.

Modular.

Tipado.

Reutilizable.

Responsive.

Accesible.

Preparado para API REST.

Preparado para WebSocket.

Preparado para WebRTC.

## La prioridad debe ser:

Claridad
↓
Mantenibilidad
↓
Reutilización
↓
Escalabilidad

No sacrificar legibilidad por abstracciones innecesarias.

19. Regla fundamental del proyecto

MeetFlow no debe construirse como una colección de pantallas independientes.

## Debe construirse como una aplicación coherente:

Usuario
↓
Autenticación
↓
Dashboard
↓
Reuniones
↓
Crear / Unirse
↓
Waiting Room
↓
Call
↓
Summary
↓
History

El estado y los contratos de datos deben mantenerse consistentes durante todo el flujo.

20. Evolución hacia el producto completo

## La implementación debe considerar tres grandes etapas:

Etapa 1 — Frontend

React
TypeScript
Vite
Tailwind
React Router

Etapa 2 — Backend

Java 21
Spring Boot 4.1.1
Spring Web
Spring Data JPA
PostgreSQL 18
Flyway
Bean Validation
Lombok

Etapa 3 — Tiempo real

WebSocket
WebRTC

Cada etapa debe poder desarrollarse sin destruir la arquitectura de la anterior.

Fin de la especificación

Este documento constituye la fuente de verdad para la construcción del frontend de MeetFlow.

Las nuevas decisiones importantes de producto, diseño, arquitectura o modelo de datos deben reflejarse en este documento para mantenerlo sincronizado con la implementación.
