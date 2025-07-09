import SignOutButton from "@/components/auth/sign-out-button";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

const UserProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h2 className="text-2xl font-bold">User Session</h2>
      <pre className="text-sm overflow-clip w-[400px] border border-gray-200 p-5 rounded-lg">
        {JSON.stringify(session, null, 2)}
      </pre>
      <div className="flex gap-5">
        <Link href="/">
          <Button>Home</Button>
        </Link>
        <SignOutButton />
      </div>
    </div>
  );
};

export default UserProfilePage;
