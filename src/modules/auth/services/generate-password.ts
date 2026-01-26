import crypto from "crypto";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";

export const generatePassword = (length = 12): string => {
  const bytes = crypto.randomBytes(length);
  let pwd = "";
  for (let i = 0; i < length; i++) {
    pwd += CHARS[bytes[i] % CHARS.length];
  }
  return pwd;
};
