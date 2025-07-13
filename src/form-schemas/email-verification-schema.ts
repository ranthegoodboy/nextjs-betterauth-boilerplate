import * as z from "zod";

export const emailVerificationSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export type EmailVerificationSchema = z.infer<typeof emailVerificationSchema>;
