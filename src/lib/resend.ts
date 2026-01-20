import { Resend } from "resend";

let instance: Resend | null = null;

export const getResend = (): Resend => {
  if (instance) return instance;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not set");
  instance = new Resend(key);
  return instance;
};
