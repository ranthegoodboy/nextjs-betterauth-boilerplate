import ResendEmailVerificationForm from "@/components/auth/resend-email-verification-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  searchParams: Promise<{ error: string; success: string }>;
}
const VerifyPage = async ({ searchParams }: PageProps) => {
  const sp = await searchParams;

  if (!sp.error && !sp.success) redirect("/user-profile");

  return (
    <div className="container">
      <div className="mt-20">
        <Link href="/auth/login">
          <Button>Back</Button>
        </Link>

        <div className="my-5 text-lg font-bold">Verify Email</div>

        {sp.error ? (
          <>
            <div className="text-destructive">
              {sp.error === "invalid_token" || sp.error === "token_expired"
                ? "The token is invalid or expired. Please request a new one."
                : sp.error === "email_not_verified"
                  ? "Please verify your email or request a new verification below."
                  : "Oops! Something went wrong. Please Try again!"}
            </div>
            <div className="mt-10">
              <ResendEmailVerificationForm />
            </div>
          </>
        ) : null}

        {sp.success ? (
          <div className="text-green-500">
            Success! You have re-send a verification link to your email.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default VerifyPage;
