import { ac, admin, artist, client } from "./permissions";
import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        client,
        artist,
      },
    }),
  ],
});
