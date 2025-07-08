"use server";

import { RegisterFormSchema } from "@/form-schemas/register-form-schema";
import { auth } from "@/lib/auth";
import { ActionResponse } from "@/types/action-response";
import { User } from "better-auth";

export const signUpEmailAction = async (
  formData: RegisterFormSchema
): Promise<ActionResponse<User | null>> => {
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

    if (error instanceof Error) {
      console.log(error.message);
      errorResponse.error = error.message;
    }

    return errorResponse;
  }
};
