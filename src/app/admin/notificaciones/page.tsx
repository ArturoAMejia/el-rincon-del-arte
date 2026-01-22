"use client";

import { useState } from "react";

import { Button } from "@/shared/components/button";
import { Checkbox } from "@/shared/components/checkbox";

type NotifyOption = "all" | "mentions" | "none";

const emailOptions = [
  {
    id: "communication",
    title: "Correos de comunicación",
    description: "Recibe emails sobre la actividad de tu cuenta.",
  },
  {
    id: "marketing",
    title: "Correos de marketing",
    description: "Recibe emails sobre nuevos productos y promociones.",
  },
  {
    id: "social",
    title: "Correos sociales",
    description: "Recibe emails sobre solicitudes y novedades sociales.",
  },
  {
    id: "security",
    title: "Correos de seguridad",
    description: "Recibe emails sobre actividad y seguridad de tu cuenta.",
  },
] as const;

export default function NotificationsPage() {
  const [notifyOption, setNotifyOption] = useState<NotifyOption>("all");
  const [emailPrefs, setEmailPrefs] = useState<Record<string, boolean>>({
    communication: true,
    marketing: false,
    social: true,
    security: true,
  });
  const [useMobileSettings, setUseMobileSettings] = useState(false);

  return (
    <section className="max-w-3xl space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Notificaciones</h1>
        <p className="text-sm text-muted-foreground">
          Configura cómo quieres recibir notificaciones.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold">Notificarme sobre...</h2>
        <div className="space-y-3">
          {[
            {
              id: "all",
              label: "Todos los mensajes nuevos",
            },
            {
              id: "mentions",
              label: "Mensajes directos y menciones",
            },
            {
              id: "none",
              label: "Nada",
            },
          ].map((option) => (
            <label key={option.id} className="flex items-center gap-3 text-sm">
              <input
                type="radio"
                name="notify"
                value={option.id}
                checked={notifyOption === option.id}
                onChange={() => setNotifyOption(option.id as NotifyOption)}
                className="h-4 w-4 accent-primary"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Notificaciones por email</h2>
        <div className="space-y-3">
          {emailOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-center justify-between rounded-xl border px-4 py-4 gap-4"
            >
              <div>
                <p className="text-sm font-medium">{option.title}</p>
                <p className="text-xs text-muted-foreground">
                  {option.description}
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={emailPrefs[option.id]}
                  onChange={(event) =>
                    setEmailPrefs((prev) => ({
                      ...prev,
                      [option.id]: event.target.checked,
                    }))
                  }
                />
                <span className="h-6 w-11 rounded-full bg-muted transition peer-checked:bg-primary" />
                <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-background transition peer-checked:translate-x-5" />
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          checked={useMobileSettings}
          onCheckedChange={(checked) => setUseMobileSettings(Boolean(checked))}
        />
        <div>
          <p className="text-sm font-medium">
            Usar configuraciones distintas para el móvil
          </p>
          <p className="text-xs text-muted-foreground">
            Puedes administrar notificaciones móviles en la app.
          </p>
        </div>
      </div>

      <Button type="button">Actualizar notificaciones</Button>
    </section>
  );
}
