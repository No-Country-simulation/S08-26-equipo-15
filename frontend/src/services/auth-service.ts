import type { User } from "../types/user";
import { mockUsers } from "./mock/users-mock";

const apiUrl = import.meta.env.VITE_API_URL?.trim();

// Login usando usuarios mock cuando el backend no está configurado.
async function loginWithMock(email: string, password: string): Promise<User> {
  const user = mockUsers.find(
    (mockUser) =>
      mockUser.email.toLowerCase() === email.trim().toLowerCase() && mockUser.password === password,
  );

  if (!user) {
    throw new Error("Correo o contraseña incorrectos");
  }

  // Nunca devolvemos la contraseña a la aplicación.
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl,
  };
}

// Login usando el backend de Spring Boot.
// El backend debe implementar POST /api/auth/login.
async function loginWithBackend(email: string, password: string): Promise<User> {
  if (!apiUrl) {
    throw new Error("La URL del backend no está configurada");
  }

  const response = await fetch(`${apiUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim(),
      password,
    }),
  });

  if (response.status === 401) {
    throw new Error("Correo o contraseña incorrectos");
  }

  if (!response.ok) {
    throw new Error("No fue posible iniciar sesión");
  }

  const user = (await response.json()) as User;

  return user;
}

export const authService = {
  // Sin VITE_API_URL: mock.
  // Con VITE_API_URL: backend.
  // Si el backend falla, no hacemos fallback al mock.
  async login(email: string, password: string): Promise<User> {
    if (!apiUrl) {
      return loginWithMock(email, password);
    }

    return loginWithBackend(email, password);
  },
};
