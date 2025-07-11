"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    user: session?.user,
    session: session?.session,
    userRole: session?.user.role,
    isAuthenticated: !!session,
  };
};
