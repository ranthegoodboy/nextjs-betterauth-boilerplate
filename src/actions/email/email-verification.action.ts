"use server";

import VerificationEmail from "@/emails/email-verification";
import { ActionResponse } from "@/types/server-response";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailAccountVerification = async (
  email: string,
  confirmationLink: string
): Promise<ActionResponse<null>> => {
  try {
    await resend.emails.send({
      from: `${process.env.RESEND_EMAIL_FROM}`,
      to: email,
      subject: "Please verify your email.",
      react: VerificationEmail({ confirmationLink }),
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
        "Something went wrong while sending email verification. Please try again",
    };

    if (error instanceof Error) {
      errorResponse.error = error.message;
    }

    return errorResponse;
  }
};
