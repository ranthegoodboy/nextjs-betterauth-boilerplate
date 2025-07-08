"use server";

import { LoginFormSchema } from "@/form-schemas/login-form-schema";
import { auth } from "@/lib/auth";
import { ActionResponse } from "@/types/action-response";

export const signInEmail = async (
  formData: LoginFormSchema
): Promise<ActionResponse<null>> => {
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

    if (error instanceof Error) {
      console.log(error.message);
      errorResponse.error = error.message;
    }

    return errorResponse;
  }
};
