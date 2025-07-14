"use server";

import { getUserSession } from "@/actions/auth/get-user-session.actions";
import { db } from "@/lib/db";
import { ActionResponse } from "@/types/server-response";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface UpdateUserData {
  isActive: boolean;
}

export const toggleUserActiveStatus = async (
  id: string,
  data: UpdateUserData
): Promise<ActionResponse<null>> => {
  const { userRole, isAuthenticated } = await getUserSession();

  if (!isAuthenticated || userRole !== UserRole.ADMIN) {
    return {
      data: null,
      success: false,
      error: "You are not authorized to update this user.",
    };
  }

  try {
    await db.user.update({
      where: {
        id: id,
      },
      data: {
        isActive: data.isActive,
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
      error: "Something went wrong while updating user. Please try again.",
    };

    if (error instanceof Error) {
      errorResponse.error = error.message;
    }

    return errorResponse;
  }
};
