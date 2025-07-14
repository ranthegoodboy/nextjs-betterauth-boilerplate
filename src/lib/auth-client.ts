import type { auth } from "@/lib/auth";
import {
  inferAdditionalFields,
  magicLinkClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [inferAdditionalFields<typeof auth>(), magicLinkClient()], // add our custom user field {role} to the client
});

export const {
  signUp,
  signIn,
  signOut,
  useSession,
  sendVerificationEmail,
  forgetPassword,
  resetPassword,
  updateUser,
} = authClient;
