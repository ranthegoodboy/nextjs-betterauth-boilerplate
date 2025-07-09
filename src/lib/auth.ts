import { prisma } from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { hashPassword, verifyPassword } from "./argon2";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
    // ** For custom password hashing - in this case we are using argon2 ** //
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
  },
  plugins: [nextCookies()], //** Automatically set authentication cookies during server-side sign-in. **//

  // ** Use hooks if you want to modify requests, pre validate data, or return early. ** //
  // hooks: {
  //   before: createAuthMiddleware(async (ctx) => {
  //     if (ctx.path !== "/sign-up/email") {
  //       return;
  //     }
  //     if (!ctx.body?.email.endsWith("@example.com")) {
  //       throw new APIError("BAD_REQUEST", {
  //         message: "Email must end with @example.com",
  //       });
  //     }
  //   }),
  // },

  // ** If you want to customize your id, you can use this function. By default, better-auth will use uuid you can use your own id generator, just make sure you update your schema to auto generate id if you want to implement this ** //
  // advanced: {
  //   database: {
  //     generateId: false,
  //   },
  // },
});
