import SignOutButton from "@/components/auth/sign-out-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const UserProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("session", session);
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h2 className="text-2xl font-bold">User Session</h2>
      <pre className="text-sm overflow-clip w-[300px]">
        {JSON.stringify(session, null, 2)}
      </pre>
      <div>
        <SignOutButton />
      </div>
    </div>
  );
};

export default UserProfilePage;
