"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function Home() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <Button variant={"default"}>Login</Button>;
  }

  const href = session ? "/user-profile" : "/auth/login";
  return (
    <div className="flex flex-col justify-center items-center gap-5 h-dvh">
      <div className="font-bold text-2xl">Nextjs + Better Auth</div>
      <Link href={href}>
        <Button variant={"default"} className="cursor-pointer">
          {session ? `Hola, ${session.user.name}` : "Login"}
        </Button>
      </Link>
    </div>
  );
}
