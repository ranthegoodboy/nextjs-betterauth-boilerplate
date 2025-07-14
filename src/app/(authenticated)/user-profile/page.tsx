import SignOutButton from "@/components/auth/sign-out-button";
import { ChangePasswordForm } from "@/components/change-password-form";
import { Button } from "@/components/ui/button";
import UserProfileForm from "@/components/user-profile-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

const UserProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  const user = session.user;

  return (
    <div className="container">
      <div className="mt-20 flex flex-col justify-center items-center gap-10">
        <div className="flex justify-between w-full">
          <div className="flex gap-5">
            <Link href="/">
              <Button>Home</Button>
            </Link>
            <div>
              {user.role === "ADMIN" && (
                <Link href="/admin-dashboard">
                  <Button>Admin Dashboard</Button>
                </Link>
              )}
            </div>
          </div>
          <SignOutButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <UserProfileForm user={user} session={session.session} />
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
