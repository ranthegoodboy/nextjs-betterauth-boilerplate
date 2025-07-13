import ResendEmailVerificationForm from "@/components/auth/resend-email-verification-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface PageProps {
  searchParams: Promise<{ error: string; success: string }>;
}
const VerifyPage = async ({ searchParams }: PageProps) => {
  const sp = await searchParams;

  return (
    <div>
      <Link href="/auth/login">
        <Button>Back</Button>
      </Link>
      <div className="my-5 text-xl font-bold">Verify Email</div>

      {sp.error ? (
        <>
          <div className="text-destructive">
            {sp.error === "invalid_token" || sp.error === "token_expired"
              ? "The token is invalid or expired. Please request a new one."
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
  );
};

export default VerifyPage;
