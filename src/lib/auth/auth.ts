import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { Prisma } from "@/generated/prisma"

// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: prismaAdapter(Prisma, {
    provider: "postgresql",
  }),
})
