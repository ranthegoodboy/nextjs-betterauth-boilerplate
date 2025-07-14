"use server";

import {
  type ChangePasswordSchema,
  changePasswordSchema,
} from "@/form-schemas/change-password-form-schema";
import { auth } from "@/lib/auth";
import { ActionResponse } from "@/types/server-response";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

export const changePasswordAction = async (
  formData: ChangePasswordSchema
): Promise<ActionResponse<null>> => {
  const validationResult = changePasswordSchema.safeParse(formData);

  if (!validationResult.success) {
    return {
      data: null,
      success: false,
      error:
        validationResult.error.errors[0]?.message ||
        "Invalid change password data",
    };
  }

  try {
    await auth.api.changePassword({
      headers: await headers(),
      body: {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      },
    });
    return { data: null, success: true, error: null };
  } catch (error) {
    const errorResponse = {
      data: null,
      success: false,
      error: "Something went wrong while changing password. Please try again.",
    };

    if (error instanceof APIError) {
      errorResponse.error = error.message;
    }

    return errorResponse;
  }
};
