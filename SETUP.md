# Guía de Instalación y Ejecución (MeetCore)

Este documento explica paso a paso cómo cualquier desarrollador del equipo puede configurar su entorno local para correr el proyecto completo (Base de Datos, Backend y Frontend).

## 1. Requisitos Previos

Asegúrate de tener instalado en tu computadora:
- **PostgreSQL** (versión 14 o superior recomendada).
- **Java 21** (JDK 21).
- **Node.js** (versión 18 o superior).
- **pnpm** (Gestor de paquetes de Node. Puedes instalarlo con `npm install -g pnpm`).

---

## 2. Configuración de la Base de Datos

1. Abre tu gestor de base de datos favorito (pgAdmin, DBeaver, o la consola `psql`).
2. Crea una base de datos vacía llamada `meetcore_db`:
   ```sql
   CREATE DATABASE meetcore_db;
   ```
3. Ve al archivo de configuración del backend ubicado en:
   `backend/src/main/resources/application.yaml`
4. Revisa la propiedad `password` y cámbiala por la contraseña que le pusiste a tu usuario `postgres` cuando instalaste PostgreSQL localmente.
   ```yaml
   datasource:
     url: ${DATABASE_URL:jdbc:postgresql://localhost:5432/meetcore_db}
     username: ${POSTGRES_USER:postgres}
     password: ${POSTGRES_PASSWORD:tu_contraseña_aqui}
   ```

---

## 3. Levantar el Backend (Spring Boot)

El backend utiliza **Flyway**. Esto significa que al iniciarlo por primera vez, él mismo se encargará de conectarse a PostgreSQL, crear las tablas necesarias e insertar datos de prueba automáticamente.

1. Abre una terminal y navega hasta la carpeta del backend:
   ```bash
   cd backend
   ```
2. Ejecuta el proyecto utilizando el wrapper de Maven incluido:
   - En Windows (Powershell o CMD):
     ```bash
     .\mvnw spring-boot:run
     ```
   - En Mac/Linux:
     ```bash
     ./mvnw spring-boot:run
     ```
3. Espera a ver el mensaje de que la aplicación arrancó exitosamente en el puerto `8080`. **¡No cierres esta terminal!**

---

## 4. Levantar el Frontend (React + Vite)

Con el backend corriendo, ahora debes iniciar el frontend para interactuar con la aplicación.

1. Abre una **nueva** terminal (manteniendo abierta la del backend).
2. Navega hasta la carpeta del frontend:
   ```bash
   cd frontend
   ```
3. Instala las dependencias del proyecto:
   ```bash
   pnpm install
   ```
4. Levanta el servidor de desarrollo:
   ```bash
   pnpm dev
   ```
5. La terminal te indicará que el proyecto está corriendo, usualmente en la dirección `http://localhost:5173`. Abre esa URL en tu navegador.

---

## 5. Probar el Funcionamiento

Para probar que todo funciona (la conexión entre Frontend -> Backend -> Base de datos), puedes iniciar sesión con los usuarios de prueba que se insertaron automáticamente en tu base de datos local:

### Credenciales de prueba:
**Usuario 1 (Host)**
- **Email:** `admin@meetcore.com`
- **Contraseña:** `admin123`

**Usuario 2 (Participante)**
- **Email:** `john@meetcore.com`
- **Contraseña:** `password123`

Ingresa estos datos en el formulario de inicio de sesión y dale a "Iniciar sesión". Si te redirige al dashboard, ¡has configurado el proyecto exitosamente!
