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

// Registro usando usuarios mock mientras no existe backend.
async function registerWithMock(name: string, email: string, password: string): Promise<User> {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = mockUsers.find(
    (mockUser) => mockUser.email.toLowerCase() === normalizedEmail,
  );

  if (existingUser) {
    throw new Error("Ya existe una cuenta con este correo");
  }

  const newUser = {
    id: `user-${mockUsers.length + 1}`,
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: "participant" as const,
  };

  mockUsers.push(newUser);

  // Nunca devolvemos la contraseña a la aplicación.
  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };
}

// Registro usando el backend de Spring Boot.
// El backend deberá implementar POST /api/auth/register.
async function registerWithBackend(name: string, email: string, password: string): Promise<User> {
  if (!apiUrl) {
    throw new Error("La URL del backend no está configurada");
  }

  const response = await fetch(`${apiUrl}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim(),
      password,
    }),
  });

  if (response.status === 409) {
    throw new Error("Ya existe una cuenta con este correo");
  }

  if (response.status === 400) {
    throw new Error("Los datos enviados no son válidos");
  }

  if (!response.ok) {
    throw new Error("No fue posible crear la cuenta");
  }

  const user = (await response.json()) as User;

  return user;
}

// Recuperación de contraseña usando mock mientras no existe backend.
async function forgotPasswordWithMock(email: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();

  const userExists = mockUsers.some((mockUser) => mockUser.email.toLowerCase() === normalizedEmail);

  // Simulamos el envío aunque el correo no exista.
  // Esto evita revelar si una cuenta está registrada.
  if (!userExists) {
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 800));
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

  // Registro usando mock o backend dependiendo de la configuración.
  async register(name: string, email: string, password: string): Promise<User> {
    if (!apiUrl) {
      return registerWithMock(name, email, password);
    }

    return registerWithBackend(name, email, password);
  },

  // Recuperación de contraseña.
  async forgotPassword(email: string): Promise<void> {
    if (!apiUrl) {
      return forgotPasswordWithMock(email);
    }

    throw new Error("La recuperación de contraseña aún no está configurada en el backend");
  },
};
