"use server";

import {
  loginFormSchema,
  type LoginFormSchema,
} from "@/form-schemas/login-form-schema";
import { auth } from "@/lib/auth";
import { ActionResponse } from "@/types/server-response";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";

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
      const errCode = error.body ? error.body.code : "UNKNOWN";
      switch (errCode) {
        case "EMAIL_NOT_VERIFIED":
          redirect("/auth/verify?error=email_not_verified");

        default:
          errorResponse.error =
            error.body?.message ||
            "Something went wrong while signing in. Please try again.";
          break;
      }
    }

    return errorResponse;
  }
};
