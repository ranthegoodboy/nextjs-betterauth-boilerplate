"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const SignOutButton = () => {
  const router = useRouter();
  const handleClick = async () => {
    await signOut({
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
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
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
