import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return <div className="text-lg">Unauthorized</div>;

  return <div>{children}</div>;
}
