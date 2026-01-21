"use server";

import { headers } from "next/headers";
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";

import { prisma } from "@/lib/prisma";

type SessionPayload = {
  session: Session;
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  };
};

type ProfilePayload = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  personName: string;
  idRuc: string;
  phone: string;
  address: string;
};

const getBaseUrl = async () => {
  const envBase = process.env.NEXT_PUBLIC_BASE_URL;
  if (envBase) return envBase;

  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  return `${protocol}://${host}`;
};

const getSessionUser = async () => {
  const headersList = await headers();
  const cookie = headersList.get("cookie") ?? "";
  const { data } = await betterFetch<SessionPayload>(
    "/api/auth/get-session",
    {
      baseURL: await getBaseUrl(),
      headers: { cookie },
    }
  );

  return data?.user ?? null;
};

export async function getProfileAction() {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser?.id) {
      return { success: false, error: "No autenticado" };
    }

    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      include: { person: true },
    });

    if (!user) {
      return { success: false, error: "Usuario no encontrado" };
    }

    const profile: ProfilePayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: Boolean(user.emailVerified),
      personName: user.person?.name ?? "",
      idRuc: user.person?.id_ruc ?? "",
      phone: user.person?.phone_number ?? "",
      address: user.person?.address ?? "",
    };

    return { success: true, data: profile };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { success: false, error: "Error al obtener perfil" };
  }
}

export async function updateProfileAction(payload: {
  name: string;
  email: string;
  personName: string;
  idRuc: string;
  phone: string;
  address: string;
}) {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser?.id) {
      return { success: false, error: "No autenticado" };
    }

    if (!payload.name.trim()) {
      return { success: false, error: "El nombre es requerido" };
    }

    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      include: { person: true },
    });

    if (!user) {
      return { success: false, error: "Usuario no encontrado" };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: payload.name.trim(),
        email: payload.email.trim(),
      },
    });

    if (user.personId) {
      await prisma.person.update({
        where: { id: user.personId },
        data: {
          name: payload.personName.trim(),
          id_ruc: payload.idRuc.trim(),
          phone_number: payload.phone.trim(),
          address: payload.address.trim(),
          email: payload.email.trim(),
        },
      });
    }

    return {
      success: true,
      data: {
        id: user.id,
        name: payload.name.trim(),
        email: payload.email.trim(),
        emailVerified: Boolean(user.emailVerified),
        personName: payload.personName.trim(),
        idRuc: payload.idRuc.trim(),
        phone: payload.phone.trim(),
        address: payload.address.trim(),
      },
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Error al actualizar perfil" };
  }
}

export async function confirmEmailAction() {
  try {
    const user = await getSessionUser();
    if (!user?.id) {
      return { success: false, error: "No autenticado" };
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true },
      select: { id: true, emailVerified: true },
    });

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error confirming email:", error);
    return { success: false, error: "Error al confirmar correo" };
  }
}
