import { useState } from "react";
import { Camera } from "lucide-react";
import { useAuth } from "../../hooks/use-auth";
import { settingsService } from "../../services/settings-service";

export function ProfileSettings() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [jobTitle, setJobTitle] = useState("");
  const [timezone, setTimezone] = useState("America/Bogota");

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    if (!user) return;

    const trimmedName = name.trim();

    if (!trimmedName) {
      setMessage("El nombre es obligatorio");
      return;
    }

    setIsSaving(true);
    setMessage("");

    try {
      const updatedUser = await settingsService.updateProfile(user.id, {
        name: trimmedName,
        jobTitle: jobTitle.trim(),
        timezone,
      });

      setName(updatedUser.name);
      setMessage("Perfil actualizado correctamente");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No fue posible actualizar el perfil");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Perfil</h2>

        <p className="mt-1 text-sm text-slate-500">Administra la información de tu perfil.</p>
      </div>

      {/* Foto de perfil */}
      <div className="flex items-center gap-5">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-white">
          {user.name.charAt(0).toUpperCase()}

          <button
            type="button"
            className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-white shadow-sm"
            aria-label="Cambiar foto"
          >
            <Camera size={14} />
          </button>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-900">Foto de perfil</p>

          <p className="mt-1 text-sm text-slate-500">JPG o PNG. Máximo 2 MB.</p>
        </div>
      </div>

      {/* Información del perfil */}
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="profile-name" className="text-sm font-medium text-slate-700">
            Nombre
          </label>

          <input
            id="profile-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        <div>
          <label htmlFor="profile-email" className="text-sm font-medium text-slate-700">
            Correo electrónico
          </label>

          <input
            id="profile-email"
            type="email"
            value={user.email}
            disabled
            className="mt-2 h-11 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 outline-none"
          />
        </div>

        <div>
          <label htmlFor="profile-job-title" className="text-sm font-medium text-slate-700">
            Cargo
          </label>

          <input
            id="profile-job-title"
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
            placeholder="Ej. Administrador"
            className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        <div>
          <label htmlFor="profile-timezone" className="text-sm font-medium text-slate-700">
            Zona horaria
          </label>

          <select
            id="profile-timezone"
            value={timezone}
            onChange={(event) => setTimezone(event.target.value)}
            className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            <option value="America/Bogota">Bogotá (GMT-5)</option>

            <option value="America/New_York">Nueva York (GMT-5)</option>

            <option value="America/Los_Angeles">Los Ángeles (GMT-8)</option>
          </select>
        </div>
      </div>

      {message && <p className="text-sm text-slate-600">{message}</p>}

      {/* Guardar */}
      <div className="flex justify-end border-t border-slate-100 pt-6">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </section>
  );
}
