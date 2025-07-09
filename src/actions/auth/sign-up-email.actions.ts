"use server";

import {
  registerFormSchema,
  type RegisterFormSchema,
} from "@/form-schemas/register-form-schema";
import { auth } from "@/lib/auth";
import { ActionResponse } from "@/types/server-response";
import { User } from "better-auth";
import { APIError } from "better-auth/api";

export const signUpEmailAction = async (
  formData: RegisterFormSchema
): Promise<ActionResponse<User | null>> => {
  const validationResult = registerFormSchema.safeParse(formData);

  if (!validationResult.success) {
    return {
      data: null,
      success: false,
      error:
        validationResult.error.errors[0]?.message ||
        "Invalid register form data",
    };
  }

  try {
    const result = await auth.api.signUpEmail({
      body: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
    });
    return { data: result.user, success: true, error: null };
  } catch (error) {
    const errorResponse = {
      data: null,
      success: false,
      error:
        "Something went wrong while creating your account. Please try again.",
    };

    if (error instanceof APIError) {
      errorResponse.error = error.message;
    }

    return errorResponse;
  }
};
