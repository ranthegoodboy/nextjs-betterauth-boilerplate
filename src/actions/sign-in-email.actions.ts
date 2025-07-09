"use server";

import {
  loginFormSchema,
  type LoginFormSchema,
} from "@/form-schemas/login-form-schema";
import { auth } from "@/lib/auth";
import { ActionResponse } from "@/types/action-response";
import { APIError } from "better-auth/api";

export const signInEmail = async (
  formData: LoginFormSchema
): Promise<ActionResponse<null>> => {
  const validationResult = loginFormSchema.safeParse(formData);

  if (!validationResult.success) {
    return {
      data: null,
      success: false,
      error:
        validationResult.error.errors[0]?.message || "Invalid login form data",
    };
  }

  try {
    await auth.api.signInEmail({
      body: {
        email: formData.email,
        password: formData.password,
      },
    });
    return { data: null, success: true, error: null };
  } catch (error) {
    const errorResponse = {
      data: null,
      success: false,
      error: "Something went wrong while signing in. Please try again.",
    };

    if (error instanceof APIError) {
      errorResponse.error = error.message;
    }

    return errorResponse;
  }
};
