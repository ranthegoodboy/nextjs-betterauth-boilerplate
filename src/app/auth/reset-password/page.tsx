import ResetPasswordForm from "@/components/auth/reset-password-form";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  searchParams: Promise<{ token: string }>;
}

const ResetPasswordPage = async ({ searchParams }: PageProps) => {
  const token = (await searchParams).token;

  if (!token) redirect("/auth/login");

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
