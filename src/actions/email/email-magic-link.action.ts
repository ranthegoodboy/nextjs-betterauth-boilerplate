"use server";

import MagicLinkEmail from "@/emails/email-magic-link";

import { ActionResponse } from "@/types/server-response";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailMagicLinkAction = async (
  email: string,
  magicLink: string
): Promise<ActionResponse<null>> => {
  try {
    await resend.emails.send({
      from: `${process.env.RESEND_EMAIL_FROM}`,
      to: email,
      subject: "Magic link login.",
      react: MagicLinkEmail({ magicLink }),
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
        "Something went wrong while sending magic link email. Please try again",
    };

    if (error instanceof Error) {
      errorResponse.error = error.message;
    }

    return errorResponse;
  }
};
