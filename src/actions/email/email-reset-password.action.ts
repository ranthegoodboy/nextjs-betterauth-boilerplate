"use server";

import ResetPasswordEmail from "@/emails/email-reset-password";
import { ActionResponse } from "@/types/server-response";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailPasswordReset = async (
  email: string,
  passwordResetLink: string
): Promise<ActionResponse<null>> => {
  try {
    await resend.emails.send({
      from: `${process.env.RESEND_EMAIL_FROM}`,
      to: email,
      subject: "Password reset request.",
      react: ResetPasswordEmail({ passwordResetLink }),
    });

    return {
      data: null,
      success: true,
      error: null,
    };
  } catch (error) {
    const errorResponse = {
      data: null,
      success: false,
      error:
        "Something went wrong while sending reset password email. Please try again",
    };

    if (error instanceof Error) {
      errorResponse.error = error.message;
    }

    return errorResponse;
  }
};
