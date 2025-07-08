"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const SignOutButton = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    await signOut({
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setIsPending(false);
        },
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onSuccess: () => {
          toast.success("You've logged out. See you soon!");
          setIsPending(false);
          router.push("/auth/login");
        },
      },
    });
  };
  return (
    <Button
      onClick={handleClick}
      variant={"destructive"}
      className="cursor-pointer"
      disabled={isPending}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
