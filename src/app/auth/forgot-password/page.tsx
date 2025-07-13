"use client";

import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ForgotPasswordPage = () => {
  return (
    <div className="container">
      <div className="mt-20">
        <Link href="/auth/login">
          <Button>Back</Button>
        </Link>
        <div className="my-5 text-lg font-bold">Reset Password</div>
        <div>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
