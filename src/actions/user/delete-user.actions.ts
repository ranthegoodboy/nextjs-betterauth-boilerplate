"use server";

import { getUserSession } from "@/actions/auth/get-user-session.actions";
import { db } from "@/lib/db";
import { ActionResponse } from "@/types/server-response";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const deleteUserAction = async (
  id: string
): Promise<ActionResponse<null>> => {
  const { user, userRole, isAuthenticated } = await getUserSession();

  if (userRole !== UserRole.ADMIN || !isAuthenticated) {
    return {
      data: null,
      success: false,
      error: "You are not authorized to delete users.",
    };
  }

  if (user?.id === id) {
    return {
      data: null,
      success: false,
      error: "You can't delete you're own account.",
    };
  }

  try {
    await db.user.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin-dashboard");

    return {
      data: null,
      success: true,
      error: null,
    };
  } catch (error) {
    const errorResponse = {
      data: null,
      success: false,
      error: "Something went wrong while deleting user. Please try again.",
    };

    if (error instanceof Error) {
      errorResponse.error = error.message;
    }

    return errorResponse;
  }
};
