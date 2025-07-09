import { getUserSession } from "@/actions/auth/get-user-session";
import { db } from "@/lib/db";
import { ApiResponse } from "@/types/server-response";
import { User } from "better-auth";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<ApiResponse<User[]>>> {
  try {
    const { isAuthenticated } = await getUserSession();
    if (!isAuthenticated) {
      return NextResponse.json({
        data: null,
        error: "Not authenticated",
        success: false,
        status: 401,
      });
    }

    const users = await db.user.findMany();

    return NextResponse.json({
      data: users,
      error: null,
      success: true,
      status: 200,
    });
  } catch (error) {
    const errorResponse = {
      data: null,
      error: "Error fetching users",
      success: false,
      status: 500,
    };
    if (error instanceof Error) {
      console.error("Error fetching users:", error.message);
      errorResponse.error = error.message;
    }
    return NextResponse.json(errorResponse);
  }
}
