import { useState } from "react";
import { Eye, EyeOff, ShieldAlert } from "lucide-react";
import { SettingsToggle } from "./settings-toggle";

export function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [twoFactor, setTwoFactor] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    console.log("Contraseña actualizada");
  };

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Seguridad</h2>

        <p className="mt-1 text-sm text-slate-500">
          Protege tu cuenta y administra tus opciones de seguridad.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900">Cambiar contraseña</h3>

        <div className="mt-4 space-y-4">
          <PasswordField
            label="Contraseña actual"
            value={currentPassword}
            onChange={setCurrentPassword}
            visible={showCurrentPassword}
            onToggle={() => setShowCurrentPassword(!showCurrentPassword)}
          />

          <PasswordField
            label="Nueva contraseña"
            value={newPassword}
            onChange={setNewPassword}
            visible={showNewPassword}
            onToggle={() => setShowNewPassword(!showNewPassword)}
          />

          <PasswordField
            label="Confirmar contraseña"
            value={confirmPassword}
            onChange={setConfirmPassword}
            visible={showConfirmPassword}
            onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>

        <button
          type="button"
          onClick={handlePasswordChange}
          className="mt-4 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          Cambiar contraseña
        </button>
      </div>

      <div className="border-t border-slate-100 pt-6">
        <SettingsToggle
          label="Autenticación de dos factores"
          description="Añade una capa adicional de seguridad a tu cuenta."
          checked={twoFactor}
          onChange={setTwoFactor}
        />

        {twoFactor && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-900">
              Configurar autenticación de dos factores
            </p>

            <div className="mt-4 flex h-32 w-32 items-center justify-center border border-slate-300 bg-white text-xs text-slate-400">
              QR
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Escanea este código con tu aplicación de autenticación.
            </p>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-red-200 bg-red-50 p-5">
        <div className="flex gap-3">
          <ShieldAlert className="mt-0.5 text-red-500" size={20} />

          <div>
            <h3 className="text-sm font-semibold text-red-700">Zona peligrosa</h3>

            <p className="mt-1 text-sm text-red-600">
              Estas acciones pueden afectar permanentemente tu cuenta.
            </p>

            <button
              type="button"
              className="mt-4 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
            >
              Eliminar cuenta
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggle: () => void;
}

function PasswordField({ label, value, onChange, visible, onToggle }: PasswordFieldProps) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>

      <div className="relative mt-2">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 pr-11 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-slate-400 hover:text-slate-700"
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
