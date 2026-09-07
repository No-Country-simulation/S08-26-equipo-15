import type { DashboardData } from "../types/dashboard";

import { dashboardMock } from "./mock/dashboard-mock";

const apiUrl = import.meta.env.VITE_API_URL?.trim();

async function getDashboardFromBackend(): Promise<DashboardData> {
  if (!apiUrl) {
    throw new Error("La URL del backend no está configurada");
  }

  const response = await fetch(`${apiUrl}/api/dashboard`);

  if (!response.ok) {
    throw new Error("No fue posible obtener los datos del Dashboard");
  }

  return (await response.json()) as DashboardData;
}

export const dashboardService = {
  async getDashboard(): Promise<DashboardData> {
    if (!apiUrl) {
      return dashboardMock;
    }

    return getDashboardFromBackend();
  },
};
