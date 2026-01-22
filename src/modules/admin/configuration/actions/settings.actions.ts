"use server";

import { headers } from "next/headers";
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";

import { randomBytes, createHash, randomUUID } from "crypto";

import { prisma } from "@/lib/prisma";
import { sendEmailVerificationEmail } from "@/modules/email/services/send-email";

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
  const { data } = await betterFetch<SessionPayload>("/api/auth/get-session", {
    baseURL: await getBaseUrl(),
    headers: { cookie },
  });

  return data?.user ?? null;
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const EMAIL_VERIFICATION_PREFIX = "email-verification:";
const EMAIL_VERIFICATION_TTL_MS = 1000 * 60 * 60 * 24;

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

    const nextEmail = normalizeEmail(payload.email);
    const currentEmail = normalizeEmail(user.email);

    const emailChanged = currentEmail !== nextEmail;
    const nextEmailVerified = emailChanged
      ? false
      : Boolean(user.emailVerified);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: payload.name.trim(),
        email: nextEmail,
        emailVerified: nextEmailVerified,
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
          email: nextEmail,
        },
      });
    }

    if (emailChanged) {
      await prisma.verification.deleteMany({
        where: { identifier: `${EMAIL_VERIFICATION_PREFIX}${currentEmail}` },
      });
    }

    return {
      success: true,
      data: {
        id: user.id,
        name: payload.name.trim(),
        email: nextEmail,
        emailVerified: nextEmailVerified,
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

export async function requestEmailVerificationAction() {
  try {
    const user = await getSessionUser();
    if (!user?.id) {
      return { success: false, error: "No autenticado" };
    }

    const email = user.email ? normalizeEmail(user.email) : "";
    if (!email) {
      return { success: false, error: "Correo inválido" };
    }

    if (user.emailVerified) {
      return { success: true, data: { alreadyVerified: true } };
    }

    const identifier = `${EMAIL_VERIFICATION_PREFIX}${email}`;
    const token = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const expiresAt = new Date(Date.now() + EMAIL_VERIFICATION_TTL_MS);

    await prisma.verification.deleteMany({
      where: { identifier },
    });

    await prisma.verification.create({
      data: {
        id: randomUUID(),
        identifier,
        value: tokenHash,
        expiresAt,
      },
    });

    const baseUrl = await getBaseUrl();
    const verifyUrl = `${baseUrl}/verify-email?token=${token}`;

    await sendEmailVerificationEmail({
      to: email,
      name: user.name ?? "",
      verifyUrl,
    });

    return { success: true, data: { sent: true } };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, error: "Error al enviar correo de verificación" };
  }
}

export async function verifyEmailToken(token: string) {
  try {
    if (!token) {
      return { success: false, error: "Token inválido" };
    }

    const tokenHash = createHash("sha256").update(token).digest("hex");
    const verification = await prisma.verification.findFirst({
      where: {
        value: tokenHash,
        identifier: { startsWith: EMAIL_VERIFICATION_PREFIX },
      },
    });

    if (!verification) {
      return { success: false, error: "Token inválido" };
    }

    if (verification.expiresAt < new Date()) {
      await prisma.verification.deleteMany({
        where: { identifier: verification.identifier },
      });
      return { success: false, error: "El token expiró" };
    }

    const email = verification.identifier.replace(
      EMAIL_VERIFICATION_PREFIX,
      ""
    );
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, emailVerified: true },
    });

    if (!user) {
      await prisma.verification.deleteMany({
        where: { identifier: verification.identifier },
      });
      return { success: false, error: "Usuario no encontrado" };
    }

    if (!user.emailVerified) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true },
      });
    }

    await prisma.verification.deleteMany({
      where: { identifier: verification.identifier },
    });

    return { success: true };
  } catch (error) {
    console.error("Error verifying email:", error);
    return { success: false, error: "Error al verificar correo" };
  }
}
