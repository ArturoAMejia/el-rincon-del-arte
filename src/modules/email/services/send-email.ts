import { getResend } from "@/lib/resend";

type SendUserCredentialsParams = {
  to: string;
  name: string;
  password: string;
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
