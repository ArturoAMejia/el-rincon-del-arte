import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
} from "@/shared/components";
import { verifyEmailToken } from "@/modules/admin/configuration/actions/settings.actions";

type VerifyEmailPageProps = {
  searchParams: { token?: string };
};

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const { token } = await searchParams;
  const result = token
    ? await verifyEmailToken(token)
    : { success: false, error: "Token inválido" };

  const title = result.success ? "Correo confirmado" : "No se pudo confirmar";
  const description = result.success
    ? "Tu correo fue verificado correctamente."
    : (result.error ?? "Token inválido");

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button asChild>
            <Link href="/admin/configuracion">Ir a configuración</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Ir al inicio</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
