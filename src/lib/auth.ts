import { prisma } from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// import { APIError, createAuthMiddleware } from "better-auth/api";
import { sendEmailAccountVerification } from "@/actions/email/email-verification.action";
import { UserRole } from "@/generated/prisma";
import { nextCookies } from "better-auth/next-js";
import { hashPassword, verifyPassword } from "./argon2";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "consent",
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
    // ** For custom password hashing - in this case we are using argon2 ** //
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
    requireEmailVerification: true,
  },
  //** Enabled email verification with error handling. **/
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60, // 1hour expiration
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/auth/verify");
      await sendEmailAccountVerification(user.email, String(link));
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN"],
        input: false, // no need to be part of register process since we have a default USER role on our prisma schema
      },
      isActive: {
        type: "boolean",
        input: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
  },
  //** Disabled account linking. Can't use the same email to sign up with different providers. **/
  account: {
    accountLinking: {
      enabled: false,
    },
  },
  plugins: [nextCookies()], //** Automatically set authentication cookies during server-side sign-in. **//

  // ** Use database hooks to automatically set the role of a user based on their email. ** //
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",") ?? [];
          if (ADMIN_EMAILS.includes(user.email)) {
            return { data: { ...user, role: UserRole.ADMIN } };
          }
          return { data: user };
        },
      },
    },
  },

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
