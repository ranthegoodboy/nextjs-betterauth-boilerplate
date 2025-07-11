import { getUserSession } from "@/actions/auth/get-user-session.actions";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { isAuthenticated } = await getUserSession();

    if (!isAuthenticated) {
      return NextResponse.json(
        {
          error: "Not authenticated",
        },
        { status: 401 }
      );
    }

    const users = await db.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
