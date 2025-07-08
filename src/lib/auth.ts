import { prisma } from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { hashPassword, verifyPassword } from "./argon2";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
    // ** For custom password hashing ** //
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
  },
  plugins: [nextCookies()], //** Automatically set authentication cookies during server-side sign-in. **//

  // ** if you want to customize your id, you can use this function. By default, better-auth will use uuid you can use your own id generator, just make sure you update your schema to auto generate id if you want to implement this ** //
  // advanced: {
  //   database: {
  //     generateId: false,
  //   },
  // },
});
