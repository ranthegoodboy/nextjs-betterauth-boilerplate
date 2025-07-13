import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}
const AuthErrorPage = async ({ searchParams }: PageProps) => {
  const sp = await searchParams;

  return (
    <div>
      <Link href="/auth/login">
        <Button>Back</Button>
      </Link>
      <div className="my-5 text-xl font-bold">Login</div>
      <div className="text-destructive">
        {sp.error === "account_not_linked"
          ? "This account is already linked to another sign-in method."
          : "Oops! Something went wrong. Please Try again!"}
      </div>
    </div>
  );
};

export default AuthErrorPage;
