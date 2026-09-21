import type { User } from "../types/user";

const apiUrl = import.meta.env.VITE_API_URL?.trim();

export interface UpdateProfileData {
  name: string;
  avatarUrl?: string;
  jobTitle?: string;
  timezone?: string;
}

export interface AudioVideoSettings {
  microphone: string;
  speaker: string;
  camera: string;
  noiseCancellation: boolean;
  mirrorVideo: boolean;
  autoJoinAudio: boolean;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  meetingReminders: boolean;
  meetingStarted: boolean;
  participantJoined: boolean;
  recording: boolean;
  updates: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  if (!apiUrl) {
    throw new Error("La URL del backend no está configurada");
  }

  const response = await fetch(`${apiUrl}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    let message = "Error al comunicarse con el servidor";

    try {
      const error = (await response.json()) as {
        message?: string;
      };

      if (error.message) {
        message = error.message;
      }
    } catch {
      // Respuesta sin JSON.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const settingsService = {
  async getProfile(userId: string): Promise<User> {
    return request<User>(`/api/settings/${userId}/profile`, {
      method: "GET",
    });
  },

  async updateProfile(userId: string, data: UpdateProfileData): Promise<User> {
    return request<User>(`/api/settings/${userId}/profile`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async getAudioVideo(userId: string): Promise<AudioVideoSettings> {
    return request<AudioVideoSettings>(`/api/settings/${userId}/audio-video`, {
      method: "GET",
    });
  },

  async updateAudioVideo(userId: string, data: AudioVideoSettings): Promise<void> {
    return request<void>(`/api/settings/${userId}/audio-video`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async getNotifications(userId: string): Promise<NotificationSettings> {
    return request<NotificationSettings>(`/api/settings/${userId}/notifications`, {
      method: "GET",
    });
  },

  async updateNotifications(userId: string, data: NotificationSettings): Promise<void> {
    return request<void>(`/api/settings/${userId}/notifications`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async getSecurity(userId: string): Promise<SecuritySettings> {
    return request<SecuritySettings>(`/api/settings/${userId}/security`, {
      method: "GET",
    });
  },

  async updateSecurity(userId: string, data: SecuritySettings): Promise<void> {
    return request<void>(`/api/settings/${userId}/security`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async changePassword(userId: string, data: ChangePasswordData): Promise<void> {
    return request<void>(`/api/settings/${userId}/password`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};
