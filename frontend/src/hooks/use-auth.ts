import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

// Permite acceder al estado de autenticación desde cualquier componente.
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return context;
}
