"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@/shared/components";

import {
  requestEmailVerificationAction,
  updateProfileAction,
} from "@/modules/admin/configuration/actions/settings.actions";

type ProfileData = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  personName: string;
  idRuc: string;
  phone: string;
  address: string;
};

type SessionUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
};

type ProfileFormValues = {
  name: string;
  email: string;
  personName: string;
  idRuc: string;
  phone: string;
  address: string;
};

const FONT_SIZE_OPTIONS = [
  { label: "Pequeña", value: "14px" },
  { label: "Normal", value: "16px" },
  { label: "Grande", value: "18px" },
];

const FONT_FAMILY_OPTIONS = [
  { label: "Inter", value: "var(--font-inter)" },
  { label: "Playfair Display", value: "var(--font-playfair-display)" },
  { label: "Lora", value: "var(--font-serif)" },
];

export function ConfigurationForm({
  profile,
}: {
  profile: ProfileData | null;
}) {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<SessionUser | null>(
    profile
      ? {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          emailVerified: profile.emailVerified,
        }
      : null
  );
  const [isConfirming, setIsConfirming] = useState(false);
  const [fontSize, setFontSize] = useState("16px");
  const [fontFamily, setFontFamily] = useState("var(--font-inter)");

  const themeValue = useMemo(() => theme ?? "system", [theme]);

  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: profile?.name ?? "",
      email: profile?.email ?? "",
      personName: profile?.personName ?? "",
      idRuc: profile?.idRuc ?? "",
      phone: profile?.phone ?? "",
      address: profile?.address ?? "",
    },
  });

  useEffect(() => {
    const storedFontSize = localStorage.getItem("app-font-size");
    const storedFontFamily = localStorage.getItem("app-font-family");

    if (storedFontSize) setFontSize(storedFontSize);
    if (storedFontFamily) setFontFamily(storedFontFamily);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--app-font-size", fontSize);
    document.documentElement.style.setProperty("--font-sans", fontFamily);
    localStorage.setItem("app-font-size", fontSize);
    localStorage.setItem("app-font-family", fontFamily);
  }, [fontSize, fontFamily]);

  const handleUpdateProfile = async (values: ProfileFormValues) => {
    try {
      const result = await updateProfileAction(values);
      if (result.success && result.data) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                name: result.data.name ?? prev.name,
                email: result.data.email ?? prev.email,
              }
            : prev
        );
        toast.success("Perfil actualizado");
      } else {
        toast.error(result.error || "Error al actualizar");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar");
    }
  };

  const handleConfirmEmail = async () => {
    setIsConfirming(true);
    try {
      const result = await requestEmailVerificationAction();
      if (result.success) {
        if (result.data?.alreadyVerified) {
          toast.success("El correo ya está confirmado");
        } else {
          toast.success("Correo de verificación enviado");
        }
      } else {
        toast.error(result.error || "Error al enviar verificación");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al enviar verificación");
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-sm text-muted-foreground">
          Administra tu perfil y preferencias de la aplicación.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>Actualiza tu información personal.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdateProfile)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="personName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre (persona)</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre legal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="idRuc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RUC / Cédula</FormLabel>
                    <FormControl>
                      <Input placeholder="001-160802-1039X" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="+505 8888 9999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input placeholder="Dirección completa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-2">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Guardando..." : "Guardar"}
                </Button>
                {user?.name && (
                  <span className="text-xs text-muted-foreground">
                    Usuario actual: {user.name}
                  </span>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Correo</CardTitle>
          <CardDescription>
            Verifica tu email para mantener tu cuenta segura.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Correo registrado</p>
              <p className="text-sm text-muted-foreground">
                {user?.email ?? "Sin correo"}
              </p>
            </div>
            <Badge variant={user?.emailVerified ? "default" : "outline"}>
              {user?.emailVerified ? "Confirmado" : "Sin confirmar"}
            </Badge>
          </div>
          <Button
            type="button"
            onClick={handleConfirmEmail}
            disabled={Boolean(user?.emailVerified) || isConfirming}
          >
            {user?.emailVerified
              ? "Correo confirmado"
              : isConfirming
                ? "Enviando..."
                : "Enviar verificación"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Apariencia</CardTitle>
          <CardDescription>Personaliza el estilo de la app.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Modo de color</label>
            <Select value={themeValue} onValueChange={setTheme}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="dark">Oscuro</SelectItem>
                <SelectItem value="system">Sistema</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="grid gap-2">
            <label className="text-sm font-medium">Tamaño de fuente</label>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {FONT_SIZE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Fuente</label>
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {FONT_FAMILY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
