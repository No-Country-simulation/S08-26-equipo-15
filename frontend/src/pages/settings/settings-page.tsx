import { useState } from "react";
import { Bell, Lock, Settings, User, Video } from "lucide-react";

import { ProfileSettings } from "../../components/settings/profile-settings";
import { AudioVideoSettings } from "../../components/settings/audio-video-settings";
import { NotificationSettings } from "../../components/settings/notification-settings";
import { SecuritySettings } from "../../components/settings/security-settings";
type SettingsTab = "profile" | "audio" | "notifications" | "security";

const tabs: {
  id: SettingsTab;
  label: string;
  icon: typeof User;
}[] = [
  {
    id: "profile",
    label: "Perfil",
    icon: User,
  },
  {
    id: "audio",
    label: "Audio y video",
    icon: Video,
  },
  {
    id: "notifications",
    label: "Notificaciones",
    icon: Bell,
  },
  {
    id: "security",
    label: "Seguridad",
    icon: Lock,
  },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Settings size={20} />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Configuración</h1>

            <p className="mt-1 text-sm text-slate-500">Personaliza tu experiencia en MeetCore.</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <nav className="border-b border-slate-200 px-4 sm:px-6">
          <div className="flex gap-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex min-h-14 shrink-0 items-center gap-2 border-b-2 px-1 text-sm font-medium transition ${
                    active
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Icon size={17} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="p-5 sm:p-8">
          {activeTab === "profile" && <ProfileSettings />}

          {activeTab === "audio" && <AudioVideoSettings />}

          {activeTab === "notifications" && <NotificationSettings />}

          {activeTab === "security" && <SecuritySettings />}
        </div>
      </div>
    </main>
  );
}
