"use client";

import GoogleOauthButton from "@/components/auth/google-oauth-button";
import LoginForm from "@/components/auth/login-form";
import MagicLinkLoginForm from "@/components/auth/magic-link-login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KeyRound, WandSparkles } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const LoginPage = () => {
  const [isMagicLink, setIsMagicLink] = useState(false);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <GoogleOauthButton isSignUp={false} />
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="text-center flex items-center gap-1 justify-center">
                {isMagicLink ? (
                  <KeyRound size={14} />
                ) : (
                  <WandSparkles size={14} />
                )}

                <span
                  className="text-sm cursor-pointer hover:underline"
                  onClick={() => setIsMagicLink(!isMagicLink)}
                >
                  {isMagicLink ? "Credentials" : "Magic Link"}
                </span>
              </div>
              {isMagicLink ? <MagicLinkLoginForm /> : <LoginForm />}

              <div className="text-center text-sm">
                {`Don't have an account? `}
                <a
                  href="/auth/register"
                  className="underline underline-offset-4"
                >
                  Sign up
                </a>
              </div>

              {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          <Link href="/">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
