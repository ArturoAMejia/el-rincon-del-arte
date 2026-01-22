import { getResend } from "@/lib/resend";

type SendUserCredentialsParams = {
  to: string;
  name: string;
  password: string;
};

type SendVerificationEmailParams = {
  to: string;
  name: string;
  verifyUrl: string;
};

export const sendUserCredentialsEmail = async ({
  to,
  name,
  password,
}: SendUserCredentialsParams) => {
  const resend = getResend();
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "no-reply@tallerartexolotl.com",
    to,
    subject: "Tus credenciales — El Rincón del Arte",
    html: `
      <p>Hola ${name},</p>
      <p>Se ha creado tu usuario en El Rincón del Arte.</p>
      <p><strong>Usuario:</strong> ${to}</p>
      <p><strong>Contraseña:</strong> ${password}</p>
      <p>Por favor, cambia tu contraseña después de iniciar sesión.</p>
    `,
  });
};

export const sendEmailVerificationEmail = async ({
  to,
  name,
  verifyUrl,
}: SendVerificationEmailParams) => {
  const resend = getResend();
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "no-reply@tallerartexolotl.com",
    to,
    subject: "Verifica tu correo — El Rincón del Arte",
    html: `
      <p>Hola ${name || ""},</p>
      <p>Haz click en el siguiente enlace para confirmar tu correo:</p>
      <p><a href="${verifyUrl}">Confirmar correo</a></p>
      <p>Si no solicitaste esta acción, puedes ignorar este correo.</p>
    `,
  });
};
