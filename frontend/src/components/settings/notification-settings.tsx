import { useState } from "react";
import { SettingsToggle } from "./settings-toggle";

export function NotificationSettings() {
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(true);
  const [meetingReminders, setMeetingReminders] = useState(true);
  const [meetingStarted, setMeetingStarted] = useState(true);
  const [participantJoined, setParticipantJoined] = useState(true);
  const [recording, setRecording] = useState(false);
  const [updates, setUpdates] = useState(true);

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Notificaciones
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Elige qué notificaciones quieres recibir.
        </p>
      </div>

      <div className="divide-y divide-slate-100 border-t border-slate-100">
        <SettingsToggle
          label="Notificaciones por correo"
          description="Recibe información importante en tu correo."
          checked={email}
          onChange={setEmail}
        />

        <SettingsToggle
          label="Notificaciones push"
          description="Recibe alertas directamente en el navegador."
          checked={push}
          onChange={setPush}
        />

        <SettingsToggle
          label="Recordatorios de reuniones"
          checked={meetingReminders}
          onChange={setMeetingReminders}
        />

        <SettingsToggle
          label="Reunión iniciada"
          checked={meetingStarted}
          onChange={setMeetingStarted}
        />

        <SettingsToggle
          label="Participante conectado"
          checked={participantJoined}
          onChange={setParticipantJoined}
        />

        <SettingsToggle
          label="Grabaciones"
          description="Recibe avisos relacionados con grabaciones."
          checked={recording}
          onChange={setRecording}
        />

        <SettingsToggle
          label="Novedades de MeetCore"
          description="Información sobre nuevas funciones y mejoras."
          checked={updates}
          onChange={setUpdates}
        />
      </div>
    </section>
  );
}