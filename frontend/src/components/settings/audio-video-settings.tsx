import { useState } from "react";
import { SettingsToggle } from "./settings-toggle";

export function AudioVideoSettings() {
  const [micTest, setMicTest] = useState(false);
  const [noiseCancellation, setNoiseCancellation] = useState(true);
  const [mirrorVideo, setMirrorVideo] = useState(true);
  const [autoJoinAudio, setAutoJoinAudio] = useState(true);

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Audio y video</h2>

        <p className="mt-1 text-sm text-slate-500">
          Configura tus dispositivos para las reuniones.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-700">Micrófono</label>

          <select className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
            <option>Micrófono predeterminado</option>
            <option>Micrófono integrado</option>
          </select>

          <button
            type="button"
            onClick={() => setMicTest(!micTest)}
            className="mt-2 text-sm font-medium text-primary hover:underline"
          >
            {micTest ? "Detener prueba" : "Probar micrófono"}
          </button>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Altavoz</label>

          <select className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
            <option>Altavoz predeterminado</option>
            <option>Altavoces del sistema</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Cámara</label>

          <select className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
            <option>Cámara integrada</option>
            <option>Cámara predeterminada</option>
          </select>
        </div>
      </div>

      <div className="divide-y divide-slate-100 border-t border-slate-100">
        <SettingsToggle
          label="Cancelación de ruido"
          description="Reduce el ruido de fondo durante las reuniones."
          checked={noiseCancellation}
          onChange={setNoiseCancellation}
        />

        <SettingsToggle
          label="Reflejar mi video"
          description="Invierte horizontalmente la imagen de tu cámara."
          checked={mirrorVideo}
          onChange={setMirrorVideo}
        />

        <SettingsToggle
          label="Unirse automáticamente al audio"
          description="Conecta tu micrófono al entrar a una reunión."
          checked={autoJoinAudio}
          onChange={setAutoJoinAudio}
        />
      </div>
    </section>
  );
}
